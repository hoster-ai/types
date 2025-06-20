# Auto-generated from TypeScript
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any, Union


@dataclass
class EmailReceiverDto:
    # The main email address / 
    to: str
    # List of email addresses for carbon copy (optional) Must be valid and unique email addresses / 
    cc: Optional[List[str]] = None
    # List of email addresses for blind carbon copy (optional) Must be valid and unique email addresses / 
    bcc: Optional[List[str]] = None
