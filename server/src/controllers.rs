use std::path::PathBuf;

use actix_web::{get, post, web, HttpResponse, Responder,Error,Result};
use actix_files::NamedFile;
use crate::{models::{EnvAppConfig, LoginFormData}, utils::{create_jwt, write_file}};
use serde_json::json;
use uuid::Uuid;
use actix_multipart::Multipart;
use futures_util::stream::StreamExt as _;

// main / routes
#[get("/")]
pub async fn root() -> impl Responder {
     HttpResponse::Ok().body("server is running")
}

#[get("/auth/forgotpass")]
pub async fn forgotpass() -> Result<NamedFile> {
     Ok(NamedFile::open("static/forgotpass.html")?)
}

#[get("/auth/signup")]
pub async fn signup() -> Result<NamedFile> {
     Ok(NamedFile::open("static/signup.html")?)
}

// api/routes 
#[get("/")]
pub async fn api_root() -> impl Responder {
    HttpResponse::Ok().body("Api is running")
}

#[post("/login")]
pub async fn login(form: web::Json<LoginFormData>,config: web::Data<EnvAppConfig>) -> impl Responder {
    let secret = &config.jwt_secret;

    HttpResponse::Ok().json(json!({
        "message": "Login successful",
        "email": form.email,
        "password": form.password,
        "remember": form.remember,
        "id":Uuid::new_v4().to_string(),
        "token": create_jwt(&form.email, &form.password, secret),
    }))
}



#[post("/screenshot")]
pub async fn screenshot(mut payload: Multipart) -> Result<impl Responder, Error> {
    let mut file_name = String::new();

    println!("Receiving file...");
    // Iterate over multipart stream
    while let Some(item) = payload.next().await {
       let field = item?;

       if field.name() == "file" {
          file_name=write_file(field).await;
       }
    }
    Ok(
        HttpResponse::Ok().json(json!({
            "file_id": file_name
        }))
    )
}


#[get("/file/{filename}")]
pub async fn get_file(path: web::Path<String>) -> Result<NamedFile> {
    let filename: String = path.into_inner();
    let filepath: PathBuf = PathBuf::from(format!("uploads/{}", filename));

    if filepath.exists() {
        Ok(NamedFile::open(filepath)?)
    } else {
        Err(actix_web::error::ErrorNotFound("File not found"))
    }
}

// just for testing
pub async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello from routes!")
}

pub async fn goodbye() -> impl Responder {
    HttpResponse::Ok().body("Goodbye from /api/goodbye!")
}