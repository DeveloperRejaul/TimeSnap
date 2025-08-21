use actix_web::{get, App, HttpServer,middleware::Logger};
use actix_files as fs;
use actix_files::NamedFile;
mod routes;
mod models;
use env_logger::Env;

#[get("/")]
async fn root() -> actix_web::Result<NamedFile> {
     Ok(NamedFile::open("static/index.html")?)
}

#[get("/auth/forgotpass")]
async fn forgotpass() -> actix_web::Result<NamedFile> {
     Ok(NamedFile::open("static/index.html")?)
}

#[get("/auth/signup")]
async fn signup() -> actix_web::Result<NamedFile> {
     Ok(NamedFile::open("static/index.html")?)
}



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
            .service(root)
            .service(forgotpass)
            .service(signup)
            .service(fs::Files::new("/static", ".").show_files_listing())
            .configure(routes::routes)
    })
    .bind((host, port))?
    .run()
    .await
}
