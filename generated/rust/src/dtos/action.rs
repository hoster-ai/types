use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Action {
    pub icon: String,
    pub label: Option<String>,
    pub open_method: OpenMethodEnum,
    pub url: String,
}
