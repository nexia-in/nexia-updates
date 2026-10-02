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
    tagline: "Your online application supporting team"
  },

  /* =======================================================================
     B. CURRENT FEATURED ADVERTISEMENT   (DYNAMIC — CHANGE THIS OFTEN)
     -----------------------------------------------------------------------
     This is the advertisement your WhatsApp customers land on.
     Replace these values whenever a new recruitment opens.

     FIELD GUIDE
     ref          : short code used in your WhatsApp ad link, e.g. ?ref=RRB
                    It is added to every enquiry message as "Source: ...".
     category     : small label above the title, e.g. "Banking Recruitment"
     title        : the headline of the opportunity
     description  : 1-2 short lines. Keep it under about 140 characters.
     image        : path to the image file. Put your image in assets/ads/
     imageAlt     : describe the image for screen readers / Google Images
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
     detailsUrl   : the button link — the OFFICIAL website or your WhatsApp.
                    Leave as "" to send customers to WhatsApp instead.
     detailsText  : button label, e.g. "View Details" or "Apply Now"
     isSample     : true  = shows a yellow "DEMO CONTENT" warning banner.
                    ALWAYS set this to false once you enter real, verified
                    information. Never publish invented recruitment details.
     ======================================================================= */
  currentAd: {
    ref: "RRB",
    category: "Railway Recruitment",
    title: "RRB Recruitment 2026",
    description: "Applications are currently open. Check eligibility, important dates and application details.",
    image: "assets/ads/current-ad.svg",
    imageAlt: "RRB Recruitment 2026 advertisement from Nexia Virtual Desk",
    lastDate: "2026-10-08",
    lastDateText: "",
    updated: "2026-10-08",
    expiresOn: "",
    detailsUrl: "",
    detailsText: "View Details",
    isSample: false
  },

  /* =======================================================================
     C. OTHER ADVERTISEMENTS   (OPTIONAL — LEAVE EMPTY IF YOU DON'T NEED IT)
     -----------------------------------------------------------------------
     Sometimes you run more than one WhatsApp advertisement at the same time
     (IBPS today, RRB tomorrow). Instead of editing currentAd every time,
     you can keep several advertisements here. Each one has its own "ref".

     Your WhatsApp advertisement links then become:
         https://your-domain.com/?ref=ibps    -> shows the IBPS card
         https://your-domain.com/?ref=rrb     -> shows the RRB card
         https://your-domain.com              -> shows currentAd (the default)

     HOW TO ADD ONE: copy the example below, delete the comment marks that
     surround it (the slash-star at the start and star-slash at the end),
     and change the values.
     ======================================================================= */
  otherAds: [
    /*
    {
      ref: "rrb",
      category: "Railway Recruitment",
      title: "RRB Recruitment 2026",
      description: "Sample entry. Replace with verified information only.",
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
