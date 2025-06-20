use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub enum SetupStatus {
    SUCCESS,
    FAILURE,
    PENDING,
}
