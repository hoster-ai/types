# Auto-generated from TypeScript
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any, Union


@dataclass
class PushSenderDto:
    # Unique identifier of the message Length restriction from 1 to 255 characters / 
    messageId: str
    # The user ID that will receive the push notification Length restriction from 1 to 255 characters / 
    userId: str
    # The title of the push notification Length restriction from 1 to 255 characters / 
    title: str
    # The content of the push notification Length restriction from 1 to 1000 characters / 
    message: str
    # The subtitle of the push notification (optional) Length restriction from 1 to 255 characters / 
    subtitle: Optional[str] = None
