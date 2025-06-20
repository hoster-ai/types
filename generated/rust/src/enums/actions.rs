use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub enum Actions {
    CREATE,
    RENEW,
    UPGRADE,
    DOWNGRADE,
    SUSPEND,
    UNSUSPEND,
    DELETE,
}
