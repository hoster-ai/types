use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Attachment {
    pub filename: String,
    pub content: String,
    pub content_type: Option<String>,
}
