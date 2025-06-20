use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct SuccessResponse {
    pub notification_id: String,
}
