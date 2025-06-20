use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Field {
    pub id: String,
    pub label: Vec<MultilangTextDto>,
    pub value: String,
    pub type: FieldTypeEnum,
    pub required: bool,
    pub disabled: bool,
    pub hidden: bool,
    pub regex_validation: Option<String>,
    pub regex_validation_error_message: Option<Vec<MultilangTextDto>>,
    pub remote_validation: Option<bool>,
    pub remote_validation_error_message: Option<Vec<MultilangTextDto>>,
}
