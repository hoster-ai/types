# Auto-generated from TypeScript
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any, Union


@dataclass
class CompanyDataDto:
    id: str
    name: str
    emails: List[str] = field(default_factory=list)
    invoiceEmail: str
    privacyPolicyUrl: str
    defaultLanguage: LanguageEnum
    languages: List[LanguageEnum] = field(default_factory=list)
    telephone: str
    mobile: Optional[str] = None
    address1: str
    address2: Optional[str] = None
    address3: Optional[str] = None
    postcode: str
    city: str
    country: CountryEnum
    state: Optional[str] = None
    vat: Optional[str] = None
    taxOffice: Optional[str] = None
