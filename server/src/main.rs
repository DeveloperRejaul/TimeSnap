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
use actix_cors::Cors;

use crate::models::EnvAppConfig;


#[actix_web::main]
async fn main() -> std::io::Result<()> {

    // setup env
    dotenv().ok();

    let config = EnvAppConfig {
        jwt_secret:utils::get_env_var("JWT_SECRET_KEY"),
        port:utils::get_env_var("PORT"),
    };

    let host = "0.0.0.0";
    let port = config.port.parse().expect("PORT must be a valid u16");


    // ensure all env is exists 

    if config.jwt_secret.is_empty() || config.port.is_empty() {
        eprintln!("Error: One or more required environment variables are missing.");
        std::process::exit(1);
    }

    println!("Server running on http://{}:{}", host, port);

   
    create_dir_all("uploads")?;


    // logger setup
    env_logger::init_from_env(Env::default().default_filter_or("info"));

    HttpServer::new(move || {        
        App::new()
            .wrap(
                Cors::default()
                .allow_any_origin() 
                .allow_any_method()
                .allow_any_header()
                .supports_credentials()
            )
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
