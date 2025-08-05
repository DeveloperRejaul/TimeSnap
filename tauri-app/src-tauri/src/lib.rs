use xcap::Monitor;
use tauri::{AppHandle, Emitter};
use rdev::{listen,Event, EventType};
use base64::{engine::general_purpose, Engine as _};
use image::ImageFormat;
use std::io::Cursor;
use std::{thread };


#[tauri::command]
async fn get_screenshot () -> Result<Vec<String>, String>{
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
        image.write_to(&mut buf, ImageFormat::Png)
            .map_err(|e| e.to_string())?;

        // Encode to base64
        let encoded = general_purpose::STANDARD.encode(buf.get_ref());
        base64_images.push(format!("data:image/png;base64,{}", encoded));
    }

    Ok(base64_images)
}


#[tauri::command]
fn monitor_activity(app:AppHandle) -> Result<String, String> {
    let app_handle = app.clone();
   thread::spawn(move || {
        let callback = move |event: Event| {

             let event_payload = match event.event_type {
                EventType::KeyPress(key) => {
                    Some(format!("Keyboard: {:?}", key))
                },
                EventType::KeyRelease(key) => {
                    Some(format!("Keyboard: {:?} released", key))
                },
                EventType::ButtonPress(button) => {
                    Some(format!("Mouse: {:?} pressed", button))
                },
                EventType::ButtonRelease(button) => {
                    Some(format!("Mouse: {:?} released", button))
                },
                EventType::MouseMove { x, y } => {
                    Some(format!("Mouse: moved to ({}, {})", x, y))
                },
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
   });


    Ok("call done".to_string())

}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![monitor_activity,get_screenshot])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

