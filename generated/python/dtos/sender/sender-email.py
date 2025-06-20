# Auto-generated from TypeScript
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any, Union


@dataclass
class EmailSenderDto:
    # The full name of the sender / 
    fullName: str
    # The email subject Length restriction from 1 to 500 characters / 
    subject: str
    # The message content Length restriction from 1 to 50000 characters / 
    message: str
    # File attachments (optional) / 
    attachments: Optional[List[AttachmentDto]] = None
