use actix_web::{middleware::Logger, web, App, HttpServer};
use actix_files as fs;
mod routes;
mod models;
mod controllers;
mod middlewares;
mod utils;
use env_logger::Env;
use std::fs::create_dir_all;
use dotenvy::dotenv;

use crate::models::EnvAppConfig;


#[actix_web::main]
async fn main() -> std::io::Result<()> {

    // setup env
    dotenv().ok();
    // logger setup
    env_logger::init_from_env(Env::default().default_filter_or("info"));

    let host = "0.0.0.0";
    let port = 8080;
    println!("Server running on http://{}:{}", host, port);

    let config = EnvAppConfig {
        jwt_secret:utils::get_env_var("JWT_SECRET_KEY")
    };
    create_dir_all("uploads")?;

    HttpServer::new(move || {        
        App::new()
            .app_data(web::Data::new(config.clone()))
            .wrap(Logger::new("%a %r %s %b %D"))
            .service(controllers::root)
            .service(controllers::forgotpass)
            .service(controllers::signup)
            .service(fs::Files::new("/static", ".").show_files_listing())
            .service(fs::Files::new("/uploads", ".").show_files_listing())
            .configure(routes::routes)
    })
    .bind((host, port))?
    .run()
    .await
}
