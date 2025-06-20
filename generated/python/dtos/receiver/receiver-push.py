# Auto-generated from TypeScript
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any, Union


@dataclass
class PushReceiverDto:
    # The user ID that will receive the push notification / 
    userId: str
    # List of user device tokens Must contain at least one token / 
    deviceTokens: List[str] = field(default_factory=list)
