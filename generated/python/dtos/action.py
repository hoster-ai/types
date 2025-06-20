# Auto-generated from TypeScript
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any, Union


@dataclass
class ActionDto:
    # The icon of the action. / 
    icon: str
    # The label of the action (optional). / 
    label: Optional[str] = None
    openMethod: OpenMethodEnum
    # The link of the action. / 
    url: str
