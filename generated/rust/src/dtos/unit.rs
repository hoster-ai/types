use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Unit {
    pub id: String,
    pub unit_description: String,
    pub interval_description: String,
}
