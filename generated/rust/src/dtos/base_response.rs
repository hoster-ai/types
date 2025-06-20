use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct BaseResponse {
    pub code: f64,
    pub message: String,
}
