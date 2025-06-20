# Auto-generated from TypeScript
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any, Union


@dataclass
class AttachmentDto:
    # The name of the attached file / 
    filename: str
    # The content of the file in Base64 encoding / 
    content: str
    # The content type of the file (MIME type) / 
    contentType: Optional[str] = None
