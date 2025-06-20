use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct PushReceiver {
    pub user_id: String,
    pub device_tokens: Vec<String>,
}
