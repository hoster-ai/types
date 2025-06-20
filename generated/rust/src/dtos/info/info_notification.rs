use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct InfoNotification {
    pub type: MessageTypeEnum,
}
