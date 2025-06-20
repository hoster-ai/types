use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub enum FieldType {
    TEXT_BOX,
    TEXT_AREA,
    SELECT,
    MULTI_SELECT,
    DESCRIPTION,
    RADIO_BOX,
    CHECKBOX,
    SLIDER,
}
