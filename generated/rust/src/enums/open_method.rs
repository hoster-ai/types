use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub enum OpenMethod {
    AJAX_CALL,
    SMALL_IFRAME,
    MEDIUM_IFRAME,
    LARGE_IFRAME,
}
