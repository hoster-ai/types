use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub enum MessageType {
    EMAIL,
    SMS,
    PUSH,
}
