# Auto-generated from TypeScript
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any, Union


@dataclass
class JwtDto:
    # Integration identifier / 
    integrationId: str
    # Unique user identifier that triggers the API call (only the /send method will not contain userId). / 
    userId: Optional[str] = None
    # Unique company identifier / 
    companyId: str
    # The roles accepted by the company for this integration / 
    acceptedRoles: List[RolesEnum] = field(default_factory=list)
