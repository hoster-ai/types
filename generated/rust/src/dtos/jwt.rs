use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Jwt {
    pub jwt: {,
    pub integration_id: String,
    pub user_id: Option<String>,
    pub company_id: String,
    pub accepted_roles: Vec<RolesEnum>,
}
