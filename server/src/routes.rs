use actix_web::web;

use crate::controllers::{api_root, goodbye, hello, login};



    

pub fn routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api")
        .service(api_root)
        .service(login) 
        .route("/hello",web::get().to(hello))
        .route("/goodbye",web::get().to(goodbye))
    );
}