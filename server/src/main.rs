use actix_web::{get, App, HttpServer};
use actix_files as fs;
use actix_files::NamedFile;
mod routes;

#[get("/")]
async fn root() -> actix_web::Result<NamedFile> {
     Ok(NamedFile::open("static/index.html")?)
}



#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(root)
            .service(fs::Files::new("/static", ".").show_files_listing())
            .configure(routes::routes)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
