# Auto-generated from TypeScript
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any, Union


@dataclass
class SmsSenderDto:
    # Sender's phone number Must be a valid phone number / 
    senderPhone: str
    # The content of the SMS message / 
    message: str
