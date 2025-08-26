use base64::{engine::general_purpose, Engine as _};
use image::ImageFormat;
use rdev::{listen, Event, EventType, simulate, Key};
use std::io::Cursor;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::OnceLock;
use tauri::{AppHandle, Emitter};
use xcap::Monitor;
use enigo::{Enigo, Keyboard, Settings};


static IS_ALREADY_CALL: OnceLock<AtomicBool> = OnceLock::new();

#[tauri::command]
async fn get_screenshot() -> Result<Vec<String>, String> {
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

#[tauri::command] 
fn press_key(text: &str) -> Result<(), String> {
    let key = match text {
       // Letters
        "a" => Key::KeyA,
        "b" => Key::KeyB,
        "c" => Key::KeyC,
        "d" => Key::KeyD,
        "e" => Key::KeyE,
        "f" => Key::KeyF,
        "g" => Key::KeyG,
        "h" => Key::KeyH,
        "i" => Key::KeyI,
        "j" => Key::KeyJ,
        "k" => Key::KeyK,
        "l" => Key::KeyL,
        "m" => Key::KeyM,
        "n" => Key::KeyN,
        "o" => Key::KeyO,
        "p" => Key::KeyP,
        "q" => Key::KeyQ,
        "r" => Key::KeyR,
        "s" => Key::KeyS,
        "t" => Key::KeyT,
        "u" => Key::KeyU,
        "v" => Key::KeyV,
        "w" => Key::KeyW,
        "x" => Key::KeyX,
        "y" => Key::KeyY,
        "z" => Key::KeyZ,

        // Numbers
        "0" => Key::Num0,
        "1" => Key::Num1,
        "2" => Key::Num2,
        "3" => Key::Num3,
        "4" => Key::Num4,
        "5" => Key::Num5,
        "6" => Key::Num6,
        "7" => Key::Num7,
        "8" => Key::Num8,
        "9" => Key::Num9,

        // Modifiers
        "shift" => Key::ShiftLeft,
        "shiftleft" => Key::ShiftLeft,
        "shiftright" => Key::ShiftRight,
        "control" | "ctrl" => Key::ControlLeft,
        "alt" => Key::Alt,
        "altgr" => Key::AltGr,
        "meta" | "command" | "windows" => Key::MetaLeft,
        "capslock" => Key::CapsLock,
        "numlock" => Key::NumLock,
        "scrolllock" => Key::ScrollLock,

        // Navigation
        "enter" | "return" => Key::Return,
        "space" => Key::Space,
        "tab" => Key::Tab,
        "backspace" => Key::Backspace,
        "escape" | "esc" => Key::Escape,
        "home" => Key::Home,
        "end" => Key::End,
        "pageup" => Key::PageUp,
        "pagedown" => Key::PageDown,
        "insert" => Key::Insert,
        "delete" => Key::Delete,
        "up" | "uparrow" => Key::UpArrow,
        "down" | "downarrow" => Key::DownArrow,
        "left" | "leftarrow" => Key::LeftArrow,
        "right" | "rightarrow" => Key::RightArrow,

        // Function keys
        "f1" => Key::F1,
        "f2" => Key::F2,
        "f3" => Key::F3,
        "f4" => Key::F4,
        "f5" => Key::F5,
        "f6" => Key::F6,
        "f7" => Key::F7,
        "f8" => Key::F8,
        "f9" => Key::F9,
        "f10" => Key::F10,
        "f11" => Key::F11,
        "f12" => Key::F12,

        // Punctuation / Symbols
        "backquote" => Key::BackQuote,
        "minus" => Key::Minus,
        "equal" => Key::Equal,
        "leftbracket" => Key::LeftBracket,
        "rightbracket" => Key::RightBracket,
        "semicolon" => Key::SemiColon,
        "quote" => Key::Quote,
        "backslash" => Key::BackSlash,
        "intlbackslash" => Key::IntlBackslash,
        "comma" => Key::Comma,
        "dot" => Key::Dot,
        "slash" => Key::Slash,

        // Numpad
        "kp0" => Key::Kp0,
        "kp1" => Key::Kp1,
        "kp2" => Key::Kp2,
        "kp3" => Key::Kp3,
        "kp4" => Key::Kp4,
        "kp5" => Key::Kp5,
        "kp6" => Key::Kp6,
        "kp7" => Key::Kp7,
        "kp8" => Key::Kp8,
        "kp9" => Key::Kp9,
        "kpreturn" => Key::KpReturn,
        "kpminus" => Key::KpMinus,
        "kpplus" => Key::KpPlus,
        "kpmultiply" => Key::KpMultiply,
        "kpdivide" => Key::KpDivide,
        "kpdelete" => Key::KpDelete,

        // Default case
        _ => return Err(format!("Unknown key: {}", text)),
    };
    simulate(&EventType::KeyPress(key)).map_err(|e| e.to_string())?; 
    simulate(&EventType::KeyRelease(key)).map_err(|e| e.to_string())?; 
    Ok(()) 
}

#[tauri::command]
fn type_string (text: &str) -> Result<(), String> {
    let mut enigo = Enigo::new(&Settings::default()) .map_err(|e| format!("Failed to create Enigo: {:?}", e))?;
    let _ = enigo.text(&text).map_err(|e| format!("Failed to type text: {:?}", e))?;
    Ok(())
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_screenshot, monitor_activity,press_key,type_string])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
