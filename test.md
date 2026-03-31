Body:

JSON
{
  "name": "TechShield Corp",
  "email": "security@techshield.com",
  "password": "Password123!",
  "role": "company"
}

URL: http://localhost:5000/auth/register

Body:

JSON
{
  "name": "Ahmed The Hacker",
  "email": "ahmed@hunter.com",
  "password": "Password123!",
  "role": "hunter"
}


URL: http://localhost:5000/auth/login

Body:

JSON
{
  "email": "security@techshield.com",
  "password": "Password123!"
}
URL: http://localhost:5000/programs/program

Body: (خد بالك الـ scope هنا بيتبعت كـ Array حسب الباك إند بتاعك)

JSON
{
  "title": "Main Web App Vulnerabilities",
  "description": "Find bugs in our main application and APIs. Do not test DDoS.",
  "scope": ["techshield.com", "api.techshield.com"],
  "rewards": {
    "low": 50,
    "medium": 200,
    "high": 500,
    "critical": 1500
  },
  "isActive": true
}










<!-- بداية الشركة -->

URL: http://localhost:5000/auth/register


{
  "name": "DefendX Security",
  "email": "security@defendx.com",
  "password": "Password123!",
  "role": "company"
}


{
  "name": "gogole Security",
  "email": "google@defendx.com",
  "password": "123456",
  "role": "company"
}



URL: http://localhost:5000/auth/login


{
  "email": "security@defendx.com",
  "password": "Password123!"
}

URL: http://localhost:5000/company/profile


{
  "comName": "FinTech",
  "website": "https://defendx.com",
  "description": "We are a financial technology company."
}

{
  "title": "Bug Bounty Program V1",
  "description": "Test description",
  "scope": ["example.com"],
  "rewards": {
    "low": 100,
    "medium": 500,
    "high": 1000,
    "critical": 5000
  },
  "isActive": true
}
URL: http://localhost:5000/programs/program




{
  "title": "DefendX Main API Bug Bounty",
  "description": "Find vulnerabilities in our main payment API. DDoS is strictly prohibited.",
  "scope": ["api.defendx.com"],
  "rewards": { "low": 100, "medium": 500, "high": 1500, "critical": 5000 },
  "isActive": true
}

(احتفظ بـ الـ _id بتاع البرنامج ده عشان هنحتاجه)



بداية الهانتر

URL: http://localhost:5000/auth/register


{
  "name": "Ninja Hacker",
  "email": "ninja@hack.com",
  "password": "Password123!",
  "role": "hunter"
}


URL: http://localhost:5000/auth/login (بنفس بيانات الهنتر)

URL: http://localhost:5000/reports/report

{
  "programId": "حط_هنا_ID_البرنامج_بتاع_الشركة",
  "title": "Authentication Bypass in Payment Gateway",
  "description": "I found a way to bypass the OTP verification by changing the response code to 200.",
  "severity": "critical",
  "proofUrl": "https://youtube.com/private-video-link"
}
(احتفظ بـ الـ _id بتاع التقرير ده)

URL: http://localhost:5000/reports/report/حط_هنا_ID_البرنامج



URL: http://localhost:5000/reports/report/company/حط_هنا_ID_التقرير


{
  "status": "accepted"
}

















{
  "programId": "حط_هنا_ID_البرنامج_بتاع_الشركة",
  "title": "Authentication Bypass in Payment Gateway",
  "description": "I found a way to bypass the OTP verification by changing the response code to 200.",
  "severity": "critical",
  "proofUrl": "https://youtube.com/private-video-link"
}


{
  "name": "Ninja Hacker",
  "email": "ninja@hack.com",
  "password": "Password123!",
  "role": "hunter"
}

{
  "title": "DefendX Main API Bug Bounty",
  "description": "Find vulnerabilities in our main payment API. DDoS is strictly prohibited.",
  "scope": ["api.defendx.com"],
  "rewards": { "low": 100, "medium": 500, "high": 1500, "critical": 5000 },
  "isActive": true
}









{
  "title": "Bug Bounty Program V1",
  "description": "اختبار اختراق لموقع الشركة الأساسي، الحد الأدنى 10 حروف.",
  "scope": ["example.com", "api.example.com"],
  "rewards": {
    "low": 100,
    "medium": 500,
    "high": 1000,
    "critical": 5000
  },
  "isActive": true
}









#,الخطوة,Method,Endpoint,Body,Expected Response,ملاحظات
1,Register Company,POST,/auth/register,"{ ""name"": ""TechCorp"", ""email"": ""company@test.com"", ""password"": ""123456"", ""role"": ""company"" }","201 + { ""msg"": ""data created successfully"", ""data"": ""token..."" }",Cookie token هيتخزن
2,Login Company,POST,/auth/login,"{ ""email"": ""company@test.com"", ""password"": ""123456"" }","200 + { ""msg"": ""logged in successfully"" }",Cookie token محدث
3,Get My Data,GET,/auth/me,-,200 + user object,تأكيد الـ role = company
4,Create Company Profile,POST,/company/profile,"{ ""comName"": ""TechCorp Ltd"", ""website"": ""https://techcorp.com"", ""description"": ""We build secure fintech"" }",201 + profile object,أول مرة
5,Get Company Profile,GET,/company/profile,-,200 + profile data,verified = false
6,Update Profile,PUT,/company/profile,"{ ""comName"": ""TechCorp v2"", ""website"": ""https://new.techcorp.com"" }",200 + updated profile,-
7,Create Program,POST,/programs/program,"{ ""title"": ""Web App Bounty"", ""description"": ""All subdomains..."", ""scope"": [""*.techcorp.com""], ""rewards"": { ""low"": 100, ""medium"": 500, ""high"": 2000, ""critical"": 5000 }, ""isActive"": true }",201 + program object,-
8,Get All My Programs,GET,/programs/programs,-,200 + array of programs,-
9,Get Single Program,GET,/programs/programs/{programId},-,200 + program,-
10,Update Program,PUT,/programs/program/{programId},"{ ""title"": ""Updated Bounty"", ""isActive"": false }",200 + updated,-
11,Delete Program,DELETE,/programs/program/{programId},-,"200 + { ""msg"": ""program deleted"" }",(اختياري)





#,الخطوة,Method,Endpoint,Body,Expected Response
1,Register Hunter,POST,/auth/register,"{ ""name"": ""Ahmed Hunter"", ""email"": ""hunter@test.com"", ""password"": ""123456"", ""role"": ""hunter"" }",201
2,Login Hunter,POST,/auth/login,"{ ""email"": ""hunter@test.com"", ""password"": ""123456"" }",200
3,Get Me,GET,/auth/me,-,role = hunter
4,Create Hunter Profile,POST,/hunter/profile,"{ ""nickName"": ""ZeroDayZ"", ""bio"": ""Bug hunter since 2022"", ""skills"": [""XSS"", ""SQLi"", ""SSRF""] }",201
5,Get Hunter Profile,GET,/hunter/profile,-,200 + profile (reputation = 0)
6,Update Profile,PUT,/hunter/profile,"{ ""nickName"": ""ZeroDayZ"", ""skills"": [""XSS"", ""SQLi"", ""SSRF"", ""IDOR""] }",200
7,Get All Active Programs (للـ Hunter),GET,/programs/programs,-,200 + programs (اللي isActive = true)
8,Submit Report,POST,/reports/report/{programId},"{ ""title"": ""Reflected XSS in search"", ""description"": ""Steps to reproduce..."", ""severity"": ""high"", ""proofUrl"": ""https://imgur.com/abc123"" }",201 + report object
9,Get My Submitted Reports (لبرنامج معين),GET,/reports/report/{programId},-,200 + array
10,Edit My Report (Hunter side),PUT,/reports/report/hunter/{reportId},"{ ""title"": ""Updated title"", ""description"": ""..."" }",200



#,الخطوة,Method,Endpoint,Body,Expected Response
1,Register Admin,POST,/auth/register,"{ ""name"": ""Super Admin"", ""email"": ""admin@test.com"", ""password"": ""123456"", ""role"": ""admin"" }",201
2,Login Admin,POST,/auth/login,"{ ""email"": ""admin@test.com"", ""password"": ""123456"" }",200
3,Get Me,GET,/auth/me,-,role = admin
4,Get All Companies,GET,/admin/companies,-,200 + all companies
5,Get Only Verified Companies,GET,/admin/companies?verified=true,-,200
6,Verify Company,PUT,/admin/companies/{companyId},{} (empty body),200 + updated company (verified: true)
7,Get All Hunters,GET,/admin/hunters,-,200
8,Verify Hunter,PUT,/admin/hunters/{hunterId},{},200 + verified: true
9,Get All Programs,GET,/admin/programs,-,200
10,Toggle Program Active,PUT,/admin/programs/{programId},{},200 + isActive flipped
11,Get All Reports,GET,/admin/reports,-,200
12,Delete Report,DELETE,/admin/reports/{reportId},-,"200 + ""report deleted"""