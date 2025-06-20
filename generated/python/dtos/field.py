# Auto-generated from TypeScript
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any, Union


@dataclass
class FieldDto:
    # ID of action field / 
    id: str
    # Label of action field / 
    label: List[MultilangTextDto] = field(default_factory=list)
    # Value of action field / 
    value: Union[str, float, Dict[str, Any]]
    # Type of label / 
    type: FieldTypeEnum
    # Indicates if the field is required / 
    required: bool
    # Indicates if the field is disabled / 
    disabled: bool
    # Indicates if the field is hidden / 
    hidden: bool
    # Regex validation pattern for the field / 
    regexValidation: Optional[str] = None
    # Error message for the field for supported languages / 
    regexValidationErrorMessage: Optional[List[MultilangTextDto]] = None
    # Indicates if the field has remote validation / 
    remoteValidation: Optional[bool] = None
    # Error message for the field / 
    remoteValidationErrorMessage: Optional[List[MultilangTextDto]] = None
