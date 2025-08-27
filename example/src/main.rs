mod screenshot_scrap;
mod screen_capture_xcap;
mod keyboard_type;

#[tokio::main]
async fn main() {
    // match screenshot_scrap::get_screenshot().await {
    //     Ok(images) => {
    //         for (i, img) in images.iter().enumerate() {
    //             println!("Got screenshot {} with length {}", i, img);
    //         }
    //     }
    //     Err(e) => eprintln!("Error: {}", e),
    // }
}
