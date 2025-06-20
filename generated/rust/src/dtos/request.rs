use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Request {
    pub notification_id: String,
    pub sender: EmailSenderDto,
    pub receiver: EmailReceiverDto,
}
