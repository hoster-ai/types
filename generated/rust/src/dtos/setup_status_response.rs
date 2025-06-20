use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct SetupStatusResponse {
    pub status: SetupStatusEnum,
}
