use actix_web::{App, HttpServer,middleware::Logger};
use actix_files as fs;
mod routes;
mod models;
mod controllers;
use env_logger::Env;




#[actix_web::main]
async fn main() -> std::io::Result<()> {
     // logger setup
    env_logger::init_from_env(Env::default().default_filter_or("info"));

    let host = "127.0.0.1";
    let port = 8080;
    println!("Server running on http://{}:{}", host, port);

    HttpServer::new(|| {        
        App::new()
            .wrap(Logger::new("%a %r %s %b %D"))
            .service(controllers::root)
            .service(controllers::forgotpass)
            .service(controllers::signup)
            .service(fs::Files::new("/static", ".").show_files_listing())
            .configure(routes::routes)
    })
    .bind((host, port))?
    .run()
    .await
}
