use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct EmailSender {
    pub full_name: String,
    pub subject: String,
    pub message: String,
    pub each: true }),
    pub attachments: Option<Vec<AttachmentDto>>,
}
