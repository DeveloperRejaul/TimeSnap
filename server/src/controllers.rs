use actix_web::{get, post, web, HttpResponse, Responder,Error};
use actix_files::NamedFile;
use crate::models::LoginFormData;
use serde_json::json;
use uuid::Uuid;
use actix_multipart::Multipart;
use futures_util::stream::StreamExt as _;
use std::io::Write;

// main / routes
#[get("/")]
pub async fn root() -> impl Responder {
     HttpResponse::Ok().body("server is running")
}

#[get("/auth/forgotpass")]
pub async fn forgotpass() -> actix_web::Result<NamedFile> {
     Ok(NamedFile::open("static/forgotpass.html")?)
}

#[get("/auth/signup")]
pub async fn signup() -> actix_web::Result<NamedFile> {
     Ok(NamedFile::open("static/signup.html")?)
}

// api/routes 
#[get("/")]
pub async fn api_root() -> impl Responder {
    HttpResponse::Ok().body("Api is running")
}

#[post("/login")]
pub async fn login(form: web::Form<LoginFormData>) -> impl Responder {
    HttpResponse::Ok().json(json!({
        "message": "Login successful",
        "email": form.email,
        "password": form.password,
        "id":Uuid::new_v4().to_string()
    }))
}



#[post("/screenshot")]
pub async fn screenshot(mut payload: Multipart) -> Result<impl Responder, Error> {
    // Iterate over multipart stream
    while let Some(item) = payload.next().await {
        let mut field = item?;

        // Extract original filename from Content-Disposition
        let content_disposition = field.content_disposition();
        let original_filename = content_disposition
            .get_filename()
            .map(|f| f.to_string())
            .unwrap_or_else(|| "file.png".to_string());

        // Split extension
        let ext = std::path::Path::new(&original_filename)
            .extension()
            .and_then(|e| e.to_str())
            .unwrap_or("png");


        // Generate a unique filename
        let filename = format!("uploads/{}.{}", Uuid::new_v4(),ext);

        // Create file
        let mut f: std::fs::File = std::fs::File::create(&filename)?;

        // Write file content
        while let Some(chunk) = field.next().await {
            let data = chunk?;
            f.write_all(&data)?;
        }
    }

    Ok(HttpResponse::Ok().body("File uploaded successfully"))
}

// just for testing
pub async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello from routes!")
}

pub async fn goodbye() -> impl Responder {
    HttpResponse::Ok().body("Goodbye from /api/goodbye!")
}