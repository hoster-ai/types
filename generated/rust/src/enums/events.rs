use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub enum Events {
    TEST,
    DEAD_LETTER,
    CORE_QUEUE,
}
