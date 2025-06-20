# Auto-generated from TypeScript
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any, Union


@dataclass
class ErrorResponseDto:
    # Unique error identifier Used for error reporting and tracking / 
    code: str
    # Array or text with error messages May contain one or more messages describing the error / 
    errors: Optional[Union[List[str], str]] = None
