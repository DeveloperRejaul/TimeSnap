use serde::{Serialize, Deserialize};

#[derive(Deserialize)]
pub struct LoginFormData {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub id: String,
    pub email: String,
    pub exp: usize,
}


#[derive(Debug, Clone, Deserialize)]
pub struct EnvAppConfig {
    pub jwt_secret: String,
}