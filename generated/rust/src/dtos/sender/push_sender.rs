use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct PushSender {
    pub message_id: String,
    pub user_id: String,
    pub title: String,
    pub message: String,
    pub subtitle: Option<String>,
}
