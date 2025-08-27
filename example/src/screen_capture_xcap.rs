use base64::{engine::general_purpose, Engine as _};
use image::ImageFormat;
use std::io::Cursor;
use xcap::Monitor;


pub async fn get_screenshot() -> Result<Vec<String>, String> {
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