# Auto-generated from TypeScript
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any, Union


@dataclass
class RequestDto:
    # Unique identifier of the hoster message / 
    notificationId: str
    # Sender details according to the integration's notification type / 
    sender: Union[EmailSenderDto, SmsSenderDto, PushSenderDto]
    # Recipient details according to the integration's notification type / 
    receiver: Union[EmailReceiverDto, SmsReceiverDto, PushReceiverDto]
