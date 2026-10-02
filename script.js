/* =========================================================================
   NEXIA VIRTUAL DESK — script.js
   -------------------------------------------------------------------------
   This file is the LOGIC. It reads the text from content.js and builds the
   page: the featured advertisement, the scrolling strip, the service cards
   and the enquiry popup.

   You normally NEVER need to edit this file.
   To change content, edit content.js instead.

   WHAT HAPPENS IN THIS FILE
   1. Small helper tools
   2. Date helpers + automatic "Application Closed" logic
   3. Contact / social links
   4. Featured advertisement (uses ?ref= to pick the right ad)
   5. Scrolling service ticker
   6. Service cards
   7. Internet cabin promo
   8. Enquiry popup (bottom sheet) + WhatsApp message builder
   9. Small visual touches (scroll reveal, floating WhatsApp button)
   ========================================================================= */

(function () {
  "use strict";

  /* Guard: if content.js did not load, stop quietly instead of crashing. */
  if (typeof SITE === "undefined") {
    console.error("content.js is missing or broken. The page cannot be built.");
    return;
  }

  /* =======================================================================
     1. SMALL HELPER TOOLS
     ======================================================================= */
  var $  = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /** Safely write text into an element (no HTML injection possible). */
  function setText(el, value) {
    if (el) el.textContent = value == null ? "" : String(value);
  }

  /** Hide / show an element. */
  function setHidden(el, isHidden) {
    if (el) el.hidden = !!isHidden;
  }

  /**
   * If an image file is missing or renamed, swap in the neutral placeholder
   * so the layout never breaks. (runs only once per image)
   */
  function safeImage(img, fallbackPath, fallbackAlt) {
    if (!img) return;
    img.addEventListener("error", function () {
      if (img.dataset.fallbackApplied === "1") return;   // avoid infinite loop
      img.dataset.fallbackApplied = "1";
      img.src = fallbackPath || "assets/placeholder.svg";
      img.alt = fallbackAlt || "Image not available";
    });
  }

  /** Read a value from the address bar, e.g. ?ref=ibps  ->  "ibps" */
  function getUrlParam(name) {
    try {
      return new URLSearchParams(window.location.search).get(name);
    } catch (e) {
      return null;                                        // e.g. opened from file://
    }
  }

  /* =======================================================================
     2. DATE HELPERS + AUTOMATIC EXPIRY
     -----------------------------------------------------------------------
     In content.js you write dates as "2026-10-15" (YYYY-MM-DD).
     - formatDate() turns that into "15 October 2026" for display.
     - isPast() decides whether the opportunity has already closed.
     If you write plain text instead (e.g. "To be announced"), the code
     simply shows your text and skips the automatic closing.
     ======================================================================= */
  var MONTHS = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];

  /** "2026-10-15" -> Date object (local time, no timezone surprises). */
  function parseISODate(value) {
    if (typeof value !== "string") return null;
    var parts = value.trim().split("-");
    if (parts.length !== 3) return null;
    var y = Number(parts[0]), m = Number(parts[1]), d = Number(parts[2]);
    if (!y || !m || !d) return null;
    var date = new Date(y, m - 1, d);
    if (isNaN(date.getTime())) return null;
    if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
    return date;
  }

  /** "2026-10-15" -> "15 October 2026". Anything else is returned unchanged. */
  function formatDate(value) {
    var date = parseISODate(value);
    if (!date) return String(value || "");
    return date.getDate() + " " + MONTHS[date.getMonth()] + " " + date.getFullYear();
  }

  /**
   * True when `value` is a real date AND that day has already finished.
   * The whole final day still counts as OPEN, so an ad that closes on
   * 15 October stays open until 15 October 23:59.
   */
  function isPast(value) {
    var date = parseISODate(value);
    if (!date) return false;
    var endOfThatDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
    return new Date() > endOfThatDay;
  }

  /** How many full days are left (used only for the "Closing soon" hint). */
  function daysLeft(value) {
    var date = parseISODate(value);
    if (!date) return null;
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.round((date - today) / 86400000);
  }

  /* =======================================================================
     3. CONTACT / SOCIAL LINKS
     -----------------------------------------------------------------------
     Every link marked data-wa-link in index.html gets the real WhatsApp
     number from content.js. Change the number in ONE place only.
     ======================================================================= */
  var WA_NUMBER   = String(SITE.contact.whatsappNumber || "").replace(/[^\d]/g, "");
  var WA_BASE     = "https://wa.me/" + WA_NUMBER;
  var INSTAGRAM   = SITE.contact.instagram;
  var FACEBOOK    = SITE.contact.facebook;

  /** Build a WhatsApp chat link with a ready-written message. */
  function waLink(message) {
    if (!message) return WA_BASE;
    return WA_BASE + "?text=" + encodeURIComponent(message);
  }

  function applyContactLinks() {
    $$("[data-wa-link]").forEach(function (link) {
      var messageId = link.getAttribute("data-wa-message-id");
      link.href = messageId === "ad" ? waLink(adWhatsAppMessage()) : WA_BASE;
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener");
    });

    $$("[data-wa-display]").forEach(function (el) {
      setText(el, SITE.contact.whatsappDisplay);
    });

    $$('[data-social="instagram"]').forEach(function (link) { link.href = INSTAGRAM; });
    $$('[data-social="facebook"]').forEach(function (link) { link.href = FACEBOOK; });

    setText($("#footerCopy"),
      "© " + SITE.footer.copyrightFrom + "–" + SITE.footer.copyrightTo + " " + SITE.business.name);
    setText($("#footerNote"), SITE.footer.note);
  }

  /* =======================================================================
     4. FEATURED ADVERTISEMENT
     -----------------------------------------------------------------------
     Which advertisement is shown?
       • Normal visit           -> SITE.currentAd
       • Visit with ?ref=rrb    -> the ad whose ref is "rrb"
                                   (searched in currentAd + otherAds)
     The ref is also added to every enquiry message as "Source: ...".
     ======================================================================= */
  var REF = (getUrlParam("ref") || "").trim().toLowerCase();
  var AD_IS_CLOSED = false;   /* true once the featured opportunity has expired */

  function pickAd() {
    var all = [SITE.currentAd].concat(SITE.otherAds || []);
    if (REF) {
      for (var i = 0; i < all.length; i++) {
        if (String(all[i].ref || "").toLowerCase() === REF) return all[i];
      }
    }
    return SITE.currentAd;
  }

  var AD = pickAd();

  /** "Source: IBPS Advertisement" — only when we know where the visitor came from. */
  function sourceLine() {
    if (!REF) return "";
    var label = SITE.sourceLabels[REF];
    return "Source: " + (label || REF.toUpperCase() + " Advertisement");
  }

  /** Is the current opportunity already closed? */
  function adIsClosed() {
    var checkpoint = AD.expiresOn || AD.lastDate;
    return isPast(checkpoint);
  }

  /** Ready-made WhatsApp message for the "Ask on WhatsApp" button. */
  function adWhatsAppMessage() {
    var lines = [
      "Hello " + SITE.business.name + ",",
      "",
      "I saw this update on your website:",
      AD.title
    ];
    if (AD.lastDate) lines.push("Last Date: " + formatDate(AD.lastDateText || AD.lastDate));
    lines.push("", "Please share the details and help me with the application.");
    var source = sourceLine();
    if (source) lines.push("", source);
    return lines.join("\n");
  }

  function renderAd() {
    var closed = adIsClosed();

    /* Text content */
    setText($("#adCategory"), AD.category || "Opportunity");
    setText($("#adTitle"), AD.title || "");
    setText($("#adDescription"), AD.description || "");

    /* Dates */
    var lastDateText = AD.lastDateText || formatDate(AD.lastDate);
    var lastDateEl = $("#adLastDate");
    setText(lastDateEl, closed ? "Closed" : (lastDateText || "—"));

    var left = daysLeft(AD.expiresOn || AD.lastDate);
    if (!closed && left !== null && left >= 0 && left <= 3) {
      lastDateEl.classList.add("is-urgent");
      setText(lastDateEl, lastDateText + "  •  closing soon");
    }

    setText($("#adUpdated"), "Updated: " + formatDate(AD.updated || ""));
    setText($("#adUpdatedDate"), formatDate(AD.updated || "—"));

    /* Image */
    var img = $("#adImage");
    if (img) {
      img.src = AD.image || "assets/placeholder.svg";
      img.alt = AD.imageAlt || (AD.title || "Advertisement");
      safeImage(img, "assets/placeholder.svg", AD.imageAlt || "Advertisement image not available");
    }

    /* Status badge on the image */
    var status = $("#adStatus");
    if (status) {
      setHidden(status, false);
      if (closed) {
        status.dataset.state = "closed";
        setText(status, "● Application Closed");
      } else {
        status.dataset.state = "open";
        setText(status, "● Applications Open");
      }
    }

    /* Demo-data warning (isSample: true in content.js) */
    setHidden($("#demoBanner"), !AD.isSample);

    /* Main button */
    var card   = $("#adCard");
    var button = $("#adButton");
    var verify = $(".ad-verify");

    if (closed) {
      /* ---- EXPIRED: never present a closed opportunity as open ---- */
      card.classList.add("is-closed");
      setHidden(button, true);
      if (verify) {
        setText(verify,
          "This application window has closed" +
          (AD.expiresOn || AD.lastDate ? " (" + formatDate(AD.expiresOn || AD.lastDate) + ")" : "") +
          ". Message us on WhatsApp for the latest open opportunities.");
      }
    } else if (AD.detailsUrl) {
      /* ---- Real link supplied: open it in a new tab ---- */
      button.href = AD.detailsUrl;
      button.target = "_blank";
      button.rel = "noopener";
      setText(button, AD.detailsText || "View Details");
    } else {
      /* ---- No link yet: send the customer to WhatsApp instead ---- */
      button.href = waLink(adWhatsAppMessage());
      button.target = "_blank";
      button.rel = "noopener";
      setText(button, "💬 " + (AD.detailsText || "Get Details on WhatsApp"));
      if (verify) {
        setText(verify,
          "Official link not added yet. Tap the button to ask us on WhatsApp — " +
          "always verify details on the official website before applying.");
      }
    }

    /* Page title follows the current ad — good for sharing & bookmarks */
    if (AD.title) {
      document.title = AD.title + " | " + SITE.business.name;
    }
  }

  /* =======================================================================
     5. SCROLLING SERVICE TICKER
     ======================================================================= */
  function renderTicker() {
    var track = $("#tickerTrack");
    if (!track) return;
    var items = SITE.ticker || [];
    if (!items.length) { track.parentElement.hidden = true; return; }

    /* Two identical groups are needed so the loop looks endless. */
    var html = "";
    for (var copy = 0; copy < 2; copy++) {
      html += '<div class="ticker-group" aria-hidden="' + (copy === 1 ? "true" : "false") + '">';
      items.forEach(function (item) {
        html += '<span class="ticker-item">' + escapeHtml(item) + "</span>";
      });
      html += "</div>";
    }
    track.innerHTML = html;
  }

  /** Convert text so it is safe to place inside HTML. */
  function escapeHtml(text) {
    return String(text == null ? "" : text)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* =======================================================================
     6. SERVICE CARDS
     -----------------------------------------------------------------------
     Each card is a real <button>, so tapping, Enter and Space all work.
     ======================================================================= */
  function renderServices() {
    var grid = $("#serviceGrid");
    if (!grid) return;

    (SITE.services || []).forEach(function (service) {
      var card = document.createElement("button");
      card.type = "button";
      card.className = "service-card reveal";
      card.setAttribute("data-service-open", service.id);
      card.setAttribute("aria-haspopup", "dialog");

      /* Optional thumbnail. If the image file is missing, a neutral
         placeholder is shown automatically (see safeImage above). */
      if (service.image) {
        var media = document.createElement("span");
        media.className = "service-media";
        var thumb = document.createElement("img");
        thumb.src = service.image;
        thumb.alt = service.imageAlt || "";
        thumb.loading = "lazy";
        thumb.decoding = "async";
        thumb.width = 800;
        thumb.height = 500;
        safeImage(thumb, "assets/placeholder.svg", service.imageAlt || "Image not available");
        media.appendChild(thumb);
        card.appendChild(media);
      } else {
        card.classList.add("no-media");
      }

      var icon = document.createElement("span");
      icon.className = "service-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = service.icon || "\u2022";

      var body = document.createElement("span");
      body.className = "service-body";

      var title = document.createElement("span");
      title.className = "service-title";
      title.textContent = service.title;

      var desc = document.createElement("span");
      desc.className = "service-desc";
      desc.textContent = service.description;

      var cta = document.createElement("span");
      cta.className = "service-cta";
      cta.textContent = service.actionText || "Enquire";

      body.appendChild(title);
      body.appendChild(desc);
      body.appendChild(cta);
      card.appendChild(icon);
      card.appendChild(body);
      grid.appendChild(card);
    });
  }

  /* =======================================================================
     7. INTERNET CABIN PROMO
     ======================================================================= */
  function renderCabin() {
    var promo = SITE.cabinPromo;
    if (!promo) return;

    setText($("#cabin-title"), promo.title || "Internet Cabin");
    var icon = $(".cabin-icon");
    if (icon) setText(icon, promo.icon || "💻");

    var list = $("#cabinList");
    if (list) {
      list.innerHTML = "";
      (promo.points || []).forEach(function (point) {
        var li = document.createElement("li");
        li.textContent = point;
        list.appendChild(li);
      });
    }

    var button = $('#cabinPanel [data-service-open="internet"]');
    if (button && promo.buttonText) setText(button, promo.buttonText);
  }

  /* =======================================================================
     8. ENQUIRY POPUP + WHATSAPP MESSAGE BUILDER
     -----------------------------------------------------------------------
     • The popup is a native <dialog>: it traps focus, closes with Esc and
       works with screen readers out of the box.
     • Fields are built from content.js, so a new service needs no new code.
     • Name + number are remembered on this device only (localStorage) so
       returning customers do not have to type them again.
     ======================================================================= */
  var sheet      = $("#enquirySheet");
  var sheetForm  = $("#enquiryForm");
  var sheetBody  = $("#sheetFields");
  var sheetError = $("#sheetError");
  var activeService = null;
  var lastFocused   = null;
  var STORAGE_KEY   = "nexiaEnquiryDetails";

  function readStoredDetails() {
    try {
      return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) { return {}; }
  }
  function storeDetails(values) {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values)); } catch (e) { /* private mode */ }
  }

  /** Build the form fields for one service. */
  function buildFields(service) {
    sheetBody.innerHTML = "";
    var stored = readStoredDetails();

    (service.enquiry.fields || []).forEach(function (field) {
      var wrapper = document.createElement("div");
      wrapper.className = "field";

      var id = "field-" + service.id + "-" + field.name;

      var label = document.createElement("label");
      label.className = "field-label";
      label.setAttribute("for", id);
      label.innerHTML = escapeHtml(field.label) + (field.required ? '<span class="req" aria-hidden="true">*</span>' : "");

      var input;
      if (field.type === "select") {
        input = document.createElement("select");
        var blank = document.createElement("option");
        blank.value = "";
        blank.textContent = "Select " + field.label;
        input.appendChild(blank);
        (field.options || []).forEach(function (option) {
          var opt = document.createElement("option");
          opt.value = option;
          opt.textContent = option;
          input.appendChild(opt);
        });
      } else {
        input = document.createElement("input");
        input.type = field.type === "tel" ? "tel" : (field.type || "text");
        if (field.placeholder) input.placeholder = field.placeholder;
        if (field.type === "tel") {
          input.inputMode = "numeric";
          input.autocomplete = "tel";
          input.maxLength = 16;
          if (stored.phone) input.value = stored.phone;
        }
        if (field.type === "text" && field.name === "name") {
          input.autocomplete = "name";
          if (stored.name) input.value = stored.name;
        }
        if (field.type === "date") input.min = todayISO();
      }

      input.className = "field-input";
      input.id = id;
      input.name = field.name;
      if (field.required) input.required = true;
      input.setAttribute("aria-required", field.required ? "true" : "false");

      var error = document.createElement("span");
      error.className = "field-error";
      error.id = id + "-error";
      error.textContent = "Please fill this in correctly.";
      input.setAttribute("aria-describedby", error.id);

      /* Clear the error as soon as the customer fixes it */
      input.addEventListener("input",  function () { clearFieldError(wrapper, input); });
      input.addEventListener("change", function () { clearFieldError(wrapper, input); });

      wrapper.appendChild(label);
      wrapper.appendChild(input);
      wrapper.appendChild(error);
      sheetBody.appendChild(wrapper);
    });
  }

  function todayISO() {
    var now = new Date();
    var mm = String(now.getMonth() + 1).padStart(2, "0");
    var dd = String(now.getDate()).padStart(2, "0");
    return now.getFullYear() + "-" + mm + "-" + dd;
  }

  function showFieldError(wrapper, input, message) {
    wrapper.classList.add("has-error");
    var err = $(".field-error", wrapper);
    if (err) setText(err, message);
    input.setAttribute("aria-invalid", "true");
  }
  function clearFieldError(wrapper, input) {
    wrapper.classList.remove("has-error");
    input.removeAttribute("aria-invalid");
  }

  /** Indian mobile number check: 10 digits, starts with 6/7/8/9. */
  function validatePhone(raw) {
    var digits = String(raw || "").replace(/\D/g, "");
    if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);  // 919961850698
    if (digits.length === 11 && digits.startsWith("0"))   digits = digits.slice(1);  // 09961850698
    if (digits.length !== 10) return { ok: false, value: digits, message: "Enter a 10 digit mobile number." };
    if (!/^[6-9]/.test(digits)) return { ok: false, value: digits, message: "Indian mobile numbers start with 6, 7, 8 or 9." };
    return { ok: true, value: digits };
  }

  /** Open the popup for one service id. */
  function openEnquiry(serviceId) {
    var service = (SITE.services || []).filter(function (s) { return s.id === serviceId; })[0];
    if (!service || !service.enquiry) return;

    activeService = service;
    lastFocused = document.activeElement;

    setText($("#sheetServiceName"), service.title);
    setText($("#sheetTitle"), service.enquiry.title || (service.title + " Enquiry"));
    setHidden(sheetError, true);
    buildFields(service);

    if (typeof sheet.showModal === "function") {
      sheet.showModal();
    } else {
      sheet.setAttribute("open", "");            /* very old browser fallback */
    }
    document.body.style.overflow = "hidden";

    /* Focus the first empty field so mobile keyboards behave nicely */
    window.setTimeout(function () {
      var first = $$(".field-input", sheetBody).filter(function (el) { return !el.value; })[0]
               || $(".field-input", sheetBody);
      if (first) first.focus();
    }, 60);
  }

  function closeEnquiry() {
    if (!sheet.open) return;
    sheet.classList.add("is-closing");
    window.setTimeout(function () {
      sheet.classList.remove("is-closing");
      if (typeof sheet.close === "function") sheet.close();
      else sheet.removeAttribute("open");
      document.body.style.overflow = "";
      if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    }, 190);
  }

  /** "14:30" -> "2:30 PM" (friendlier inside a WhatsApp message). */
  function prettyTime(value) {
    var parts = String(value || "").split(":");
    var h = Number(parts[0]), m = parts[1] || "00";
    if (isNaN(h)) return value;
    var suffix = h >= 12 ? "PM" : "AM";
    var hour = h % 12;
    if (hour === 0) hour = 12;
    return hour + ":" + m + " " + suffix;
  }

  /** Assemble the WhatsApp message from the filled form. */
  function buildMessage(service, values) {
    var lines = ["Hello " + SITE.business.name + ",", "", service.enquiry.intro || "I would like to enquire."];
    lines.push("");

    (service.enquiry.fields || []).forEach(function (field) {
      var value = values[field.name];
      if (!value) return;                                    // skip empty optional fields
      if (field.type === "date") value = formatDate(value) || value;   // 2026-10-05 -> 5 October 2026
      if (field.type === "time") value = prettyTime(value);            // 14:30 -> 2:30 PM
      lines.push((field.messageLine || field.label) + ": " + value);
    });

    if (!AD_IS_CLOSED && AD.title) {
      lines.push("Seen on page: " + AD.title);
    }

    var source = sourceLine();
    if (source) lines.push(source);

    lines.push("", service.enquiry.closing || "Please contact me.");
    return lines.join("\n");
  }

  /** Validate + open WhatsApp. */
  function handleEnquirySubmit(event) {
    event.preventDefault();
    if (!activeService) return;

    var values = {};
    var firstBad = null;

    $$(".field", sheetBody).forEach(function (wrapper) {
      var input = $(".field-input", wrapper);
      if (!input) return;
      var field = (activeService.enquiry.fields || []).filter(function (f) { return f.name === input.name; })[0] || {};
      var raw = String(input.value || "").trim();

      clearFieldError(wrapper, input);

      /* Required but empty */
      if (field.required && !raw) {
        showFieldError(wrapper, input, "This field is required.");
        if (!firstBad) firstBad = input;
        return;
      }

      /* Name: at least 2 letters */
      if (raw && field.type === "text" && input.name === "name" && raw.replace(/\s/g, "").length < 2) {
        showFieldError(wrapper, input, "Please enter your full name.");
        if (!firstBad) firstBad = input;
        return;
      }

      /* Phone number rules */
      if (raw && field.type === "tel") {
        var check = validatePhone(raw);
        if (!check.ok) {
          showFieldError(wrapper, input, check.message);
          if (!firstBad) firstBad = input;
          return;
        }
        raw = check.value;                 // normalise to clean 10 digits
        input.value = raw;
      }

      if (raw) values[input.name] = raw;
    });

    if (firstBad) {
      setHidden(sheetError, false);
      setText(sheetError, "Please check the highlighted fields.");
      firstBad.focus();
      return;
    }

    setHidden(sheetError, true);
    storeDetails({ name: values.name || "", phone: values.phone || "" });

    var message = buildMessage(activeService, values);
    var url = waLink(message);

    /* Open WhatsApp in a new tab. Keep the popup open for a moment so the
       customer understands what just happened, then close it. */
    var opened = window.open(url, "_blank", "noopener");
    if (!opened) window.location.href = url;   // popup blocked -> go directly

    var button = $('.sheet-foot [type="submit"]');
    if (button) {
      var original = button.textContent;
      button.textContent = "✓ Opening WhatsApp…";
      button.disabled = true;
      window.setTimeout(function () {
        button.textContent = original;
        button.disabled = false;
        closeEnquiry();
      }, 900);
    } else {
      closeEnquiry();
    }
  }

  /* =======================================================================
     9. SMALL VISUAL TOUCHES
     ======================================================================= */
  function initReveal() {
    var items = $$(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    /* Safety net: if anything goes wrong, make sure content still appears */
    window.setTimeout(function () {
      $$(".reveal").forEach(function (el) { el.classList.add("is-in"); });
    }, 1500);

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { observer.observe(el); });
  }

  function initFloatingWhatsApp() {
    var fab = $(".wa-fab");
    if (!fab) return;
    var ticking = false;
    function update() {
      ticking = false;
      fab.classList.toggle("is-visible", window.scrollY > 320);
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* =======================================================================
     START EVERYTHING
     ======================================================================= */
  function init() {
    applyContactLinks();
    AD_IS_CLOSED = adIsClosed();
    renderAd();
    renderTicker();
    renderServices();
    renderCabin();

    /* Any element with data-service-open opens that service's popup */
    document.addEventListener("click", function (event) {
      var trigger = event.target.closest ? event.target.closest("[data-service-open]") : null;
      if (trigger) {
        event.preventDefault();
        openEnquiry(trigger.getAttribute("data-service-open"));
      }
    });

    if (sheet) {
      sheetForm.addEventListener("submit", handleEnquirySubmit);
      $("#sheetClose").addEventListener("click", closeEnquiry);
      /* Esc key: the browser fires "cancel" for <dialog> */
      sheet.addEventListener("cancel", function (event) {
        event.preventDefault();
        closeEnquiry();
      });
      /* Tap on the dark area outside the sheet closes it */
      sheet.addEventListener("click", function (event) {
        if (event.target === sheet) closeEnquiry();
      });
    }

    /* Mark the static sections for the subtle fade-in, then observe them all */
    $$(".ad-card, .panel").forEach(function (el) { el.classList.add("reveal"); });
    initReveal();
    initFloatingWhatsApp();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
