use actix_web::{get, post, web, HttpResponse, Responder};
use serde_json::json;
use crate::models::LoginFormData;

#[get("/")]
async fn root() -> impl Responder {
    HttpResponse::Ok().body("Api is running")
}

#[post("/login")]
async fn login(form: web::Form<LoginFormData>) -> impl Responder {
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




pub fn routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api")
        .service(root)
        .service(login) 
        .route("/hello",web::get().to(hello))
        .route("/goodbye",web::get().to(goodbye))
    );
}