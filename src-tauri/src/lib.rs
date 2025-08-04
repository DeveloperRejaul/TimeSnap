use xcap::Monitor;
use std::fs;
use std::path::{Path, PathBuf};
use std::time::{SystemTime, UNIX_EPOCH};
use tauri::{AppHandle, Emitter};
use rdev::{listen,Event};
use std::thread;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn screenshot() -> Result<Vec<String>, String> {
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
        let id = SystemTime::now().duration_since(UNIX_EPOCH).expect("Time went backwards").as_millis();
        // Generate filename
        let filename = format!("{}.png", id);
        let filepath: PathBuf = folder.join(filename);

        // Save image
        image.save(&filepath).map_err(|e| e.to_string())?;

        saved_paths.push(filepath.to_string_lossy().to_string());
    }

    Ok(saved_paths)
}


#[tauri::command]
async fn monitor_activity(app:AppHandle) -> Result<String, String> {
    let app_handle = app.clone(); 

    thread::spawn(move || {
        let result = listen(move |event: Event| {
            let payload = format!("{:?}", event);
            let _ = app_handle.emit("MY_EVENT", payload);
        });

        if let Err(error) = result {
            eprintln!("Error while listening: {:?}", error);
        }
    });

    Ok("Started listening to events".into())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet,screenshot,monitor_activity])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
