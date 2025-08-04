// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/


use xcap::Monitor;
use std::fs;
use std::time::Instant;
use std::path::{Path, PathBuf};
use chrono::Local;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn greet2(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn normalized(filename: String) -> String {
    filename.replace(['|', '\\', ':', '/'], "")
}

#[tauri::command]
fn take_screenshot() -> Result<Vec<String>, String> {
    let start = Instant::now();

    // Create screenshots/ folder if not exists
    let folder = Path::new("screenshots");
    if !folder.exists() {
        fs::create_dir_all(folder).map_err(|e| e.to_string())?;
    }

    // Get all monitors
    let monitors = Monitor::all().map_err(|e| e.to_string())?;
    if monitors.is_empty() {
        return Err("No monitors found".into());
    }

    let mut saved_paths = Vec::new();

    for monitor in monitors {
        // Capture full monitor image
        let image = monitor.capture_image().map_err(|e| e.to_string())?;

        // Generate filename
       let name = monitor.name().unwrap_or_else(|_| "unknown".into());
       let timestamp = Local::now().format("%Y%m%d_%H%M%S");
        let filename = format!("monitor-{}-{}.png", normalized(name), timestamp);
        let filepath: PathBuf = folder.join(filename);

        // Save image
        image.save(&filepath).map_err(|e| e.to_string())?;

        saved_paths.push(filepath.to_string_lossy().to_string());
    }

    println!("Screenshot time: {:?}", start.elapsed());

    Ok(saved_paths)
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![greet2])
        .invoke_handler(tauri::generate_handler![take_screenshot])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
