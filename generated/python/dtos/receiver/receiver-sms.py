# Auto-generated from TypeScript
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any, Union


@dataclass
class SmsReceiverDto:
    # List of recipient phone numbers Must be valid phone numbers / 
    receiverPhones: List[str] = field(default_factory=list)
