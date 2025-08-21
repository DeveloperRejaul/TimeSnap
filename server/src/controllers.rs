use actix_web::{get, post, web, HttpResponse, Responder};
use actix_files::NamedFile;
use crate::models::LoginFormData;
use serde_json::json;

// main / routes
#[get("/")]
pub async fn root() -> actix_web::Result<NamedFile> {
     Ok(NamedFile::open("static/index.html")?)
}

#[get("/auth/forgotpass")]
pub async fn forgotpass() -> actix_web::Result<NamedFile> {
     Ok(NamedFile::open("static/index.html")?)
}

#[get("/auth/signup")]
pub async fn signup() -> actix_web::Result<NamedFile> {
     Ok(NamedFile::open("static/index.html")?)
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
    }))
}


// just for testing
pub async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello from routes!")
}

pub async fn goodbye() -> impl Responder {
    HttpResponse::Ok().body("Goodbye from /api/goodbye!")
}