use scrap::{Capturer, Display};
use std::io::Cursor;
use base64::{engine::general_purpose, Engine as _};
use image::ImageFormat;

pub async fn get_screenshot() -> Result<Vec<String>, String> {
    let displays = Display::all().map_err(|e| e.to_string())?;
    if displays.is_empty() {
        return Err("No displays found".into());
    }

    let mut base64_images = Vec::new();

    for (i, display) in displays.into_iter().enumerate() {
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
        img.write_to(&mut buf, ImageFormat::Png).map_err(|e| e.to_string())?;

        let encoded = general_purpose::STANDARD.encode(buf.get_ref());
        base64_images.push(format!("data:image/png;base64,{}", encoded));
    }

    Ok(base64_images)
}
