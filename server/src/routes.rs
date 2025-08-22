use actix_web::web;
use crate::{controllers::{api_root, get_file, goodbye, hello, login, screenshot}, middlewares};


pub fn routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api")
        .service(api_root)
        .service(login) 
        .service(get_file) 
        .service( web::scope("").wrap(middlewares::Auth).service(screenshot)) 
        .route("/hello",web::get().to(hello))
        .route("/goodbye",web::get().to(goodbye))
    );
}