
// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Quick estimate (rough marketing calc)
const quickForm = document.getElementById("quickForm");
const estimateBox = document.getElementById("estimateBox");

function formatCAD(n) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0
  }).format(n);
}

if (quickForm && estimateBox) {
  quickForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(quickForm);
    const bill = Number(data.get("bill"));
    const city = String(data.get("city") || "").trim();

    if (!bill || bill <= 0 || !city) return;

    // Rough assumptions:
    // annual spend = bill * 12
    // average offset = 70%
    // system cost range tiers
    const annual = bill * 12;
    const annualSavings = Math.round(annual * 0.7);

    let range;
    if (bill < 120) range = [12000, 18000];
    else if (bill < 220) range = [18000, 28000];
    else if (bill < 350) range = [28000, 42000];
    else range = [42000, 65000];

    estimateBox.classList.remove("hidden");
    estimateBox.textContent =
      `In ${city}, a system for a ${formatCAD(bill)}/mo bill often falls around ${formatCAD(range[0])} to ${formatCAD(range[1])}. ` +
      `A rough annual savings estimate is about ${formatCAD(annualSavings)}.`;
  });
}

// Contact form message for missing Formspree ID
const contactForm = document.getElementById("contactForm");
const statusBox = document.getElementById("contactStatus");

if (contactForm && statusBox) {
  contactForm.addEventListener("submit", () => {
    const action = contactForm.getAttribute("action") || "";
    if (action.includes("YOUR_FORM_ID")) {
      statusBox.classList.remove("hidden");
      statusBox.textContent =
        "Replace YOUR_FORM_ID in the form action with your Formspree form ID to receive messages.";
    }
  });
}
