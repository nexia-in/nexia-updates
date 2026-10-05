/* =========================================================================
   NEXIA VIRTUAL DESK  —  content.js
   -------------------------------------------------------------------------
   >>> THIS IS THE ONLY FILE YOU NORMALLY NEED TO EDIT. <<<

   Everything that changes (the current advertisement, services, enquiry
   form fields, ticker text, contact links) lives here as simple text.

   You do NOT need to touch index.html, style.css or script.js.

   HOW TO EDIT SAFELY
   1. Always keep the commas at the end of each line.
   2. Always keep text inside "double quotes".
   3. If a line has a comma at the end, do not delete the comma.
   4. After editing, refresh the page in your browser (Ctrl + R).
   5. If the page looks broken, press F12 > Console tab to see the error.
      It is almost always a missing comma or a missing quote.

   SECTIONS IN THIS FILE
   A. CONTACT & SOCIAL LINKS        (permanent - rarely changes)
   B. CURRENT FEATURED ADVERTISEMENT (changes often - this is the ad)
   C. OTHER ADVERTISEMENTS           (optional - for ?ref= links)
   D. SERVICE TICKER STRIP           (permanent)
   E. SERVICES + ENQUIRY FORMS       (permanent)
   F. INTERNET CABIN PROMO           (permanent)
   ========================================================================= */

/* global nothing — this file simply creates one variable called SITE */
var SITE = {

  /* =======================================================================
     A. CONTACT & SOCIAL LINKS   (PERMANENT)
     -----------------------------------------------------------------------
     To change the WhatsApp number: edit ONLY the two lines below.
     whatsappNumber -> digits only, country code first, NO + sign, NO spaces
     whatsappDisplay -> what customers see on the page
     ======================================================================= */
  contact: {
    whatsappNumber: "919961850698",
    whatsappDisplay: "+91 99618 50698",
    instagram: "https://www.instagram.com/nexia_virtual_desk/",
    instagramHandle: "@nexia_virtual_desk",
    facebook: "https://www.facebook.com/nexiacare",
    facebookHandle: "nexiacare"
  },

  business: {
    name: "Nexia Virtual Desk",
    tagline: "Your online application supporting team",
    /* This line is automatically added to the ready-made WhatsApp message
       of the advertisement card ("Ask on WhatsApp"). Set it to "" to remove. */
    serviceChargeNote: "Service charges will be applicable extra."
  },

  /* =======================================================================
     B. CURRENT FEATURED ADVERTISEMENT   (DYNAMIC — CHANGE THIS OFTEN)
     -----------------------------------------------------------------------
     This is the advertisement your WhatsApp customers land on.
     Replace these values whenever a new recruitment opens.

     FIELD GUIDE
     ref          : short code used in your WhatsApp ad link, e.g. ?ref=ibps
                    It is added to every enquiry message as "Source: ...".
     category     : small label above the title, e.g. "Banking Recruitment"
     title        : the headline of the opportunity
     description  : 1-2 short lines. Keep it under about 140 characters.
     image        : path to the image file. Put your image in assets/ads/
     imageAlt     : describe the image for screen readers / Google Images
     startDate    : OPTIONAL. The day applications OPEN ("2026-10-15").
                    Before that day the card shows an amber "UPCOMING"
                    badge; ON that day it automatically turns green
                    "Applications Open". Leave "" if already open.
     lastDate     : the last date to apply. TWO ways to write it:
                      "2026-10-15"  -> recommended. The site reads this date
                                      and can automatically show
                                      "Application Closed" after it passes.
                      "To be announced" -> any plain text also works, but then
                                      automatic closing is turned off.
     lastDateText : OPTIONAL. If you want to show something different from
                    lastDate (e.g. "15 October 2026"), write it here.
                    Leave as "" to auto-format the date nicely.
     updated      : the date you last checked / updated this card ("2026-10-02")
     expiresOn    : OPTIONAL. The date after which the site must show
                    "Application Closed". Leave as "" to use lastDate.
     qualification: "Minimum Qualification" shown on the card.
                    Leave as "" to hide that box.
     applicationFee: "Official Application Fee" shown on the card.
                    Leave as "" to hide that box.
     detailsUrl   : the OFFICIAL link for the "View Details" button.
                    Leave as "" (or "#") until you have the real link —
                    the button then shows as a greyed-out placeholder.
     detailsText  : button label, e.g. "View Details" or "Apply Now"
     isSample     : true  = shows a yellow "DEMO CONTENT" warning banner.
                    ALWAYS set this to false once you enter real, verified
                    information. Never publish invented recruitment details.
     ======================================================================= */
  currentAd: {
      ref: "ssc-chsl",
    category: "SSC Recruitment",
    title: "SSC CHSL Recruitment 2026",
    description: "Applications are open for Lower Division Clerk (LDC), Junior Secretariat Assistant (JSA), and Data Entry Operator (DEO).",
    qualification: "12th Pass / Plus Two from a recognised board (Age: 18–27 years)",
    applicationFee: "₹100 (Women / SC / ST / PwBD / Ex-Servicemen: Nil)",
    startDate: "2026-09-07",
    image: "assets/ads/current-ad.svg",
    imageAlt: "SSC CHSL Recruitment 2026 advertisement from Nexia Virtual Desk",
    lastDate: "2026-10-07",
    lastDateText: "",
    updated: "2026-10-03",
    expiresOn: "2026-10-07",
    detailsUrl: "https://drive.google.com/file/d/1jx3MpY3RHYygEpcqEiXpYFOkf5QeHG_y/view?usp=drive_link",
    detailsText: "View Details",
    isSample: false
    },

  /* =======================================================================
     C. MORE LIVE ADVERTISEMENTS — THE COPY & PASTE METHOD
     -----------------------------------------------------------------------
     Want IBPS and RRB (and Army, Navy...) on the page AT THE SAME TIME?
     Exactly the way you imagined it:

     1. Copy the whole example block below (the one that sits between
        the comment marks, slash-star at the start and star-slash at end).
     2. Paste your copy inside the [ ] brackets.
     3. Delete the comment marks around YOUR COPY (keep the values).
     4. Change the values. "ref" must be a new short code
        (rrb, army, navy ...). Each ad needs its own ref.
     5. Save + refresh -> a SECOND card appears under the first card.

     Need a third advertisement? Copy the block again and repeat.
     Order in this list = order on the page (currentAd is always first).

     BONUS: a WhatsApp advertisement link like
         https://your-domain.com/?ref=rrb
     will automatically scroll to the RRB card and put a blue ring
     around it, so the customer lands exactly on the right card.

     When an opportunity is fully finished you can delete its block,
     or leave it — an expired card shows "Application Closed" by itself.

     !!! MOST COMMON MISTAKE — READ ONCE !!!
     The words   otherAds: [   and   ],   appear ONLY ONCE in this file.
     For advertisement #3, #4, #5 ... copy ONLY the { ... } block and
     separate the blocks with commas, like this:

         otherAds: [
           { ...ad 2... },     <- comma after every block
           { ...ad 3... },     <- comma
           { ...ad 4... }      <- last block: NO comma
         ],

     If you paste "otherAds: [ ... ]," a second time, JavaScript silently
     keeps only the LAST list — your earlier extra cards disappear
     without any error message. One label = one list. Always.
     ======================================================================= */
  otherAds: [
    /*
    {
      ref: "rrb",
      category: "Railway Recruitment",
      title: "RRB Recruitment 2026",
      description: "Sample entry. Replace with verified information only.",
      qualification: "As per official notification",
      applicationFee: "As per official notification",
      startDate: "",
      image: "assets/jobs/sample-job.svg",
      imageAlt: "RRB Recruitment 2026 advertisement",
      lastDate: "2026-11-30",
      lastDateText: "",
      updated: "2026-10-02",
      expiresOn: "",
      detailsUrl: "",
      detailsText: "View Details",
      isSample: true
    }
    */
   

  // 2. Cochin Shipyard Limited (CSL)
  {
    ref: "csl-apprentices",
    category: "PSU Recruitment",
    title: "Cochin Shipyard Apprenticeship 2026",
    description: "Applications are open for Trade Apprentices and Technician Vocational Apprentices.",
    qualification: "10th Pass (SSLC) with ITI (NTC) / VHSE (Plus Two Vocational)",
    applicationFee: "Nil (അപേക്ഷാ ഫീസ് ഇല്ല)",
    startDate: "2026-09-16",
    image: "assets/ads/current-ad.svg",
    imageAlt: "Cochin Shipyard Limited Apprenticeship 2026 advertisement from Nexia Virtual Desk",
    lastDate: "2026-10-08",
    lastDateText: "",
    updated: "2026-10-03",
    expiresOn: "2026-10-08",
    detailsUrl: "https://drive.google.com/file/d/1UHNc__6vCoiWOE7nQpB1O6hso8YFKX0x/view?usp=sharing",
    detailsText: "View Details",
    isSample: false
  },

  // 3. High Court of Kerala (Office Attendant)
  {
    ref: "high-court-oa",
    category: "Kerala High Court Recruitment",
    title: "High Court of Kerala Office Attendant Recruitment 2026",
    description: "Applications are open for Office Attendant (OA) post.",
    qualification: "Passed SSLC or equivalent, Graduation പൂർത്തിയാക്കിയവർ അപേക്ഷിക്കാൻ പാടില്ല (Age: 18 – 40 years)",
    applicationFee: "₹500 (SC / ST / അർഹരായ ഭിന്നശേഷിക്കാർ: ഫീസ് ഇല്ല)",
    startDate: "2026-09-23",
    image: "assets/ads/current-ad.svg",
    imageAlt: "High Court of Kerala Office Attendant Recruitment 2026 advertisement from Nexia Virtual Desk",
    lastDate: "2026-10-26",
    lastDateText: "",
    updated: "2026-10-03",
    expiresOn: "2026-10-26",
    detailsUrl: "https://drive.google.com/file/d/1E3KtMxOj9G0dKQtVQTI35ahuOFmLld1k/view?usp=sharing",
    detailsText: "View Details",
    isSample: false
  },

  // 4. RRB NTPC (Graduate Level)
  {
    ref: "rrb-ntpc-grad",
    category: "Railway Recruitment",
    title: "RRB NTPC (Graduate Level) Recruitment 2026",
    description: "Applications are open for Station Master, Goods Train Manager, and Senior Commercial cum Ticket Clerk.",
    qualification: "Any Bachelor’s Degree / Graduation (Age: 18–36 years)",
    applicationFee: "₹500 (SC / ST / Ex-SM / PwBD / Female / EBC: ₹250; പരീക്ഷ എഴുതുമ്പോൾ റീഫണ്ട് ലഭിക്കും)",
    startDate: "2026-10-08",
    image: "assets/ads/upcoming-ad.svg",
    imageAlt: "RRB NTPC Graduate Level Recruitment 2026 advertisement from Nexia Virtual Desk",
    lastDate: "2026-11-06",
    lastDateText: "",
    updated: "2026-10-03",
    expiresOn: "2026-11-06",
    detailsUrl: "https://drive.google.com/file/d/18vTpucAYj4W24Ue3JVvq78SL__0-cWn_/view?usp=sharing",
    detailsText: "View Details",
    isSample: false
    
  },

  // 5. RRB upcoming
{
  ref: "rrb-ntpc-12th",
  category: "Railway Recruitment",
  title: "RRB NTPC (12th Level) Recruitment 2026",
  description: "Applications opening soon for Junior Clerk cum Typist, Account Clerk cum Typist, Trains Clerk, and Commercial cum Ticket Clerk.",
  qualification: "12th Pass / Plus Two from a recognized board (Age: 18 – 30/33 years)",
  applicationFee: "₹500 (SC / ST / PwD / വനിത / EWS: ₹250; CBT-1 പരീക്ഷ എഴുതിയാൽ ഫീസ് തിരികെ ലഭിക്കും)",
  startDate: "2026-10-15",
  image: "assets/ads/upcoming-ad.svg",
  imageAlt: "RRB NTPC 12th Level Recruitment 2026 advertisement from Nexia Virtual Desk",
  lastDate: "2026-11-13",
  lastDateText: "",
  updated: "2026-10-03",
  expiresOn: "2026-11-13",
  detailsUrl: "https://drive.google.com/file/d/1aQ5L2E0tsqUclQPY6I8SLF_1LU01v9xi/view?usp=sharing",
  detailsText: "View Details",
  isSample: false,
  
},
   // 6. CRPF Sports Quota
{
  ref: "crpf-sports-quota-2026",
  category: "Defence Recruitment",
  title: "CRPF Sports Quota Recruitment 2026",
  description: "എഴുത്ത് പരീക്ഷ ഇല്ലാതെ കേന്ദ്ര സർക്കാർ ജോലി നേടാൻ കായികതാരങ്ങൾക്ക് അവസരം. ഹെഡ് കോൺസ്റ്റബിൾ, കോൺസ്റ്റബിൾ തസ്തികകളിലായി 521 ഒഴിവുകൾ.",
  qualification: "പത്താം ക്ലാസ് / പ്ലസ് ടു വിജയം, ഒപ്പം നിശ്ചിത കായിക യോഗ്യതയും (പ്രായപരിധി: 18 - 23 വയസ്സ്)",
  applicationFee: "₹100 (വനിതകൾ / SC / ST വിഭാഗങ്ങൾക്ക് ഫീസില്ല)",
  startDate: "2026-10-12",
  image: "assets/ads/upcoming-ad.svg",
  imageAlt: "CRPF Sports Quota Recruitment 2026 advertisement from Nexia Virtual Desk",
  lastDate: "2026-11-11",
  lastDateText: "",
  updated: "2026-10-05",
  expiresOn: "2026-11-11",
  detailsUrl: "https://drive.google.com/file/d/1Ff4yoAQEwdET3e2lL0rm2tKLPnUAMp74/view?usp=sharing", 
  detailsText: "View Details",
  isSample: false,
},


  ],

  /* Nice readable names shown in the enquiry message as "Source: ..."      */
  sourceLabels: {
    ibps: "IBPS Advertisement",
    rrb: "RRB Advertisement",
    army: "Indian Army Advertisement",
    navy: "Indian Navy Advertisement",
    whatsapp: "WhatsApp Group Advertisement",
    instagram: "Instagram"
  },

  /* =======================================================================
     D. SERVICE TICKER STRIP   (PERMANENT)
     -----------------------------------------------------------------------
     The thin scrolling strip. Add or remove lines freely.
     Keep each item short (2-4 words).
     ======================================================================= */
  ticker: [
    "CV / Resume Creation",
    "Online Application Support",
    "Print & DTP",
    "Exam Support",
    "Interview Support",
    "High-Speed Internet Cabin",
    "Digital Services"
  ],

  /* =======================================================================
     E. SERVICES + THEIR ENQUIRY FORMS   (PERMANENT)
     -----------------------------------------------------------------------
     Each service = one card on the page + one enquiry popup.

     HOW TO ADD A NEW SERVICE (example: "Passport Application Help")
     1. Copy any { ... } block below and paste it after the last one.
     2. Add a comma between the blocks.
     3. Change id, icon, title, description, image.
     4. Change enquiry.title, enquiry.intro and the fields.
     That is all — the card, the popup and the WhatsApp message appear
     automatically. You do not need to touch any other file.

     FIELD TYPES you can use in "fields":
       "text"   normal typing          "tel"   phone keypad
       "select" dropdown / choices     "date"  date picker
       "time"   time picker
     FIELD OPTIONS
       name        internal id (one word, no spaces)
       label       what the customer sees
       type        one of the types above
       required    true or false
       placeholder grey hint text (optional)
       options     list of choices (only for "select")
       messageLine the label used inside the WhatsApp message
     ======================================================================= */
  services: [
    {
      id: "cv",
      icon: "📄",
      title: "CV / Resume Creation",
      description: "Professional CV, Resume and Biodata creation for job applications.",
      image: "assets/services/cv.svg",
      imageAlt: "CV and Resume creation service",
      actionText: "Enquire",
      enquiry: {
        title: "CV / Resume Enquiry",
        intro: "I would like to create a CV.",
        closing: "Please contact me.",
        fields: [
          { name: "name", label: "Name", type: "text", required: true, placeholder: "Your full name", messageLine: "Name" },
          { name: "phone", label: "WhatsApp Number", type: "tel", required: true, placeholder: "10 digit mobile number", messageLine: "WhatsApp Number" },
          {
            name: "requirement", label: "Requirement", type: "select", required: true, messageLine: "Requirement",
            options: ["New CV", "Resume", "Biodata", "Need advice"]
          }
        ]
      }
    },
    {
      id: "application",
      icon: "🧾",
      title: "Online Application Support",
      description: "Support for job, exam, admission and other online applications.",
      image: "assets/services/application.svg",
      imageAlt: "Online application support service",
      actionText: "Enquire",
      enquiry: {
        title: "Online Application Enquiry",
        intro: "I need support with an online application.",
        closing: "Please guide me.",
        fields: [
          { name: "name", label: "Name", type: "text", required: true, placeholder: "Your full name", messageLine: "Name" },
          { name: "phone", label: "WhatsApp Number", type: "tel", required: true, placeholder: "10 digit mobile number", messageLine: "WhatsApp Number" },
          {
            name: "type", label: "Application Type", type: "select", required: true, messageLine: "Application Type",
            options: ["Job Application", "Exam Application", "Government Service", "Admission", "Other"]
          },
          { name: "detail", label: "Application / Recruitment Name", type: "text", required: false, placeholder: "Optional — e.g. IBPS Clerk", messageLine: "Application Name" }
        ]
      }
    },
    {
      id: "print",
      icon: "🖨️",
      title: "Print & DTP",
      description: "Printing, scanning, PDF, document and DTP support.",
      image: "assets/services/print.svg",
      imageAlt: "Printing scanning and DTP service",
      actionText: "Enquire",
      enquiry: {
        title: "Print & DTP Enquiry",
        intro: "I need printing / DTP support.",
        closing: "Please let me know the details.",
        fields: [
          { name: "name", label: "Name", type: "text", required: true, placeholder: "Your full name", messageLine: "Name" },
          { name: "phone", label: "WhatsApp Number", type: "tel", required: true, placeholder: "10 digit mobile number", messageLine: "WhatsApp Number" },
          {
            name: "requirement", label: "Requirement", type: "select", required: true, messageLine: "Requirement",
            options: ["Colour Print", "Black & White Print", "Scan", "Photo", "PDF / Document", "DTP", "Other"]
          }
        ]
      }
    },
    {
      id: "internet",
      icon: "💻",
      title: "Internet Cabin",
      description: "High-speed internet support for online exams, interviews and other online requirements. Booking required.",
      image: "assets/services/internet.svg",
      imageAlt: "High speed internet cabin for online exams and interviews",
      actionText: "Enquire",
      enquiry: {
        title: "Internet Cabin Enquiry",
        intro: "I would like to enquire about the Internet Cabin.",
        closing: "Please provide availability and details.",
        fields: [
          { name: "name", label: "Name", type: "text", required: true, placeholder: "Your full name", messageLine: "Name" },
          { name: "phone", label: "WhatsApp Number", type: "tel", required: true, placeholder: "10 digit mobile number", messageLine: "WhatsApp Number" },
          {
            name: "purpose", label: "Purpose", type: "select", required: true, messageLine: "Purpose",
            options: ["Online Exam", "Online Interview", "Job Application", "Other"]
          },
          { name: "date", label: "Preferred Date", type: "date", required: false, messageLine: "Preferred Date" },
          { name: "time", label: "Preferred Time", type: "time", required: false, messageLine: "Preferred Time" }
        ]
      }
    }
  ],

  /* =======================================================================
     F. INTERNET CABIN PROMO CARD   (PERMANENT)
     ======================================================================= */
  cabinPromo: {
    icon: "💻",
    title: "Internet Cabin",
    points: [
      "High-speed internet",
      "Suitable for online exams and interviews",
      "Booking required"
    ],
    buttonText: "Enquire Now"
  },

  footer: {
    copyrightFrom: "2009",
    copyrightTo: "2026",
    note: "Nexia Virtual Desk helps customers with online applications, documents and digital services. Recruitment information is shared only for awareness — always verify details on the official website before applying."
  }
};
