use serde::Deserialize;

#[derive(Deserialize)]
pub struct LoginFormData {
    pub email: String,
    pub password: String,
}
