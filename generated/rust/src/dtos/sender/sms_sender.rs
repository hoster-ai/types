use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct SmsSender {
    pub sender_phone: String,
    pub message: String,
}
