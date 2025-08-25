use actix_multipart::Field;
use futures_util::stream::StreamExt as _;
use uuid::Uuid;
use std::io::Write;
use std::path::Path;
use std::fs;
use jsonwebtoken::{encode, Header, EncodingKey};
use chrono::{Utc, Duration};
use std::env;

use crate::models::Claims;

pub async fn write_file(mut field: Field) -> String {
    // Extract original filename
    let content_disposition = field.content_disposition();
    let original_filename = content_disposition
        .get_filename()
        .map(|f| f.to_string())
        .unwrap_or_else(|| "file.png".to_string());

    // Extract extension
    let ext = Path::new(&original_filename)
        .extension()
        .and_then(|e| e.to_str())
        .unwrap_or("png");

    // Generate unique filename
    let id = format!("{}.{}", Uuid::new_v4(), ext);
    let filename = format!("uploads/{}",id);

    // Try to create the file
    if let Ok(mut f) = fs::File::create(&filename) {
        while let Some(chunk) = field.next().await {
            if let Ok(data) = chunk {
                let _ = f.write_all(&data); // ignore write errors
            }
        }
    } else {
        eprintln!(" Failed to create file: {}", filename);
    }

    id
}


pub fn create_jwt(user_id: &str,email: &str, secret: &str) -> String {
    let expiration = Utc::now()
        .checked_add_signed(Duration::days(30)) // token valid for 30 minutes
        .unwrap()
        .timestamp() as usize;

    let claims = Claims {
        id: user_id.to_owned(),
        email: email.to_owned(),
        exp: expiration,
    };

    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(secret.as_ref()),
    ).expect("Failed to encode JWT")
}

pub fn get_env_var(key: &str) -> String {
    match env::var(key) {
        Ok(val) => val,
        Err(_) => {
            eprintln!("Environment variable {} is not set", key);
            std::process::exit(1);
        }
    }
}