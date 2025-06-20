use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct EmailReceiver {
    pub to: String,
    pub each: true }),
    pub cc: Option<Vec<String>>,
    pub each: true }),
    pub bcc: Option<Vec<String>>,
}
