use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct MultilangText {
    pub language: LanguageEnum,
    pub text: String,
}
