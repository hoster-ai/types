use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct ErrorResponse {
    pub code: String,
    pub each: true }),
    pub errors: Option<Vec<String>>,
}
