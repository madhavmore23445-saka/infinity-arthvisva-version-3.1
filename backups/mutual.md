

1) update the ui for the  LeadManagementScreen.js and ReferralLeadModal.js

use proper table format , do not use card design the disply the leads data for both the referral lead and detailed lead , in proper format and in best way 


LeadManagementScreen.js
ReferralLeadModal.js
AddDetailedLeadScreen.js
theme.js




================================================================================================================


in the mobile app 

theme.js
HomeLoanFormScreen.js
AddDetailedLeadScreen.js
LeadManagementScreen.js
DocumentPreviewModal.js
LeadDocumentsModal



ReferralLeadModal.js

AddDetailedLeadScreen.js




backend response :

do not display the data in a card format 
1️⃣ Referral Leads Table (Compact Table View)

Referral Lead ID (ref_id)

Ref ID

Client (lead_name)

Contact (contact_number)

Dept (department)

Product (sub_category)

Notes

Created (created_at – formatted)

Backend response reference:

{
  "id": 11,
  "ref_id": "REF_0011",
  "lead_name": "Test",
  "contact_number": "8010097706",
  "email": "madhavmore55550@gmail.com",
  "department": "Real Estate",
  "sub_category": "Fractional Real Estate",
  "notes": "Hey 😊😊😊😊😊😊😊😊",
  "created_at": "2026-02-04T06:25:23.349Z"
}

2️⃣ Detailed Leads Table (Expanded Table View)



Lead ID (detail_lead_id)

Lead Name

Contact

Email

Dept

Sub Category

Self Login (Yes / No)

Actions (View / Edit / etc. – keep existing)

Created (formatted date)

Backend response reference:

{
  "detail_lead_id": "HL/2025-26/0002",
  "lead_name": "Madhav More",
  "contact_number": "8010097706",
  "email": "madhavmore395@gmail.com",
  "is_self_login": false,
  "department": "Loan",
  "sub_category": "Home Loan",
  "created_at": "2026-02-04T11:30:55.437Z"
}


