use actix_web::{get, web, HttpResponse, Responder};

#[get("/")]
async fn root() -> impl Responder {
    HttpResponse::Ok().body("Api is running")
}

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
        .route("/hello",web::get().to(hello))
        .route("/goodbye",web::get().to(goodbye))
    );
}