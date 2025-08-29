use base64::{engine::general_purpose, Engine as _};
use image::ImageFormat;
use rdev::{listen, Event, EventType};
use std::io::Cursor;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::OnceLock;
use tauri::{AppHandle, Emitter};

static IS_ALREADY_CALL: OnceLock<AtomicBool> = OnceLock::new();

#[cfg(any(target_os = "macos", target_os = "windows"))]
async fn get_screenshot_impl() -> Result<Vec<String>, String> {
    use xcap::Monitor;
    // Get all monitors
    let monitors = Monitor::all().map_err(|e| e.to_string())?;
    if monitors.is_empty() {
        return Err("No monitors found".into());
    }

    let mut base64_images = Vec::new();

    for monitor in monitors {
        // Capture full monitor image
        let image = monitor.capture_image().map_err(|e| e.to_string())?;

        // Convert image to PNG bytes in memory
        let mut buf = Cursor::new(Vec::new());
        image
            .write_to(&mut buf, ImageFormat::Png)
            .map_err(|e| e.to_string())?;

        // Encode to base64
        let encoded = general_purpose::STANDARD.encode(buf.get_ref());
        base64_images.push(format!("data:image/png;base64,{}", encoded));
    }

    Ok(base64_images)
}

#[cfg(target_os = "linux")]
async fn get_screenshot_impl() -> Result<Vec<String>, String> {
    use scrap::{Capturer, Display};
    let displays = Display::all().map_err(|e| e.to_string())?;
    if displays.is_empty() {
        return Err("No displays found".into());
    }

    let mut base64_images = Vec::new();

    for (_i, display) in displays.into_iter().enumerate() {
        let mut capturer = Capturer::new(display).map_err(|e| e.to_string())?;

        // Wait until we can get a frame
        let frame = loop {
            match capturer.frame() {
                Ok(buf) => break buf.to_vec(),
                Err(ref e) if e.kind() == std::io::ErrorKind::WouldBlock => continue,
                Err(e) => return Err(e.to_string()),
            }
        };

        let width = capturer.width();
        let height = capturer.height();

        let mut img = image::ImageBuffer::new(width as u32, height as u32);

        for (j, pixel) in img.pixels_mut().enumerate() {
            let idx = j * 4;
            *pixel = image::Rgba([
                frame[idx + 2], // B
                frame[idx + 1], // G
                frame[idx],     // R
                255,
            ]);
        }

        let mut buf = Cursor::new(Vec::new());
        img.write_to(&mut buf, ImageFormat::Png)
            .map_err(|e| e.to_string())?;

        let encoded = general_purpose::STANDARD.encode(buf.get_ref());
        base64_images.push(format!("data:image/png;base64,{}", encoded));
    }

    Ok(base64_images)
}

#[tauri::command]
async fn get_screenshot() -> Result<Vec<String>, String> {
    get_screenshot_impl().await
}

#[tauri::command]
fn monitor_activity(app: AppHandle) -> Result<String, String> {
    // Initialize the flag if it's not yet initialized
    let flag = IS_ALREADY_CALL.get_or_init(|| AtomicBool::new(false));

    // If already true, exit early
    if flag.swap(true, Ordering::SeqCst) {
        return Ok("Already running".to_string());
    }

    let app_handle = app.clone();
    let callback = move |event: Event| {
        let event_payload = match event.event_type {
            EventType::KeyPress(key) => Some(format!("Keyboard: {:?}", key)),
            EventType::KeyRelease(key) => Some(format!("Keyboard: {:?} released", key)),
            EventType::ButtonPress(button) => Some(format!("Mouse: {:?} pressed", button)),
            EventType::ButtonRelease(button) => Some(format!("Mouse: {:?} released", button)),
            EventType::MouseMove { x, y } => Some(format!("Mouse: moved to ({}, {})", x, y)),
            _ => None, // Ignore other event types
        };

        // If we have a valid payload, emit it as an event to the frontend.
        if let Some(payload) = event_payload {
            app_handle.emit("MY_EVENT", payload).unwrap();
        }
    };

    if let Err(error) = listen(callback) {
        println!("Error listening for events: {:?}", error);
    };

    Ok("call done".to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_screenshot, monitor_activity])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
