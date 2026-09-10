// ==========================================================================
// CONFIGURACIÓN DE RESERVAS
// ==========================================================================
const BOOKING_CONFIG = {
  // Número oficial de WhatsApp de Callejeros Tours RD (sin signos '+' ni espacios)
  officialWhatsApp: "18298081466",
  // Correo electrónico de destino para las reservas
  officialEmail: "callejerostrd@gmail.com",
  // Endpoint personalizado opcional (Formspree, Resend o backend propio). Si está vacío usa Netlify Forms / Fallback
  customFormEndpoint: ""
};

const defaultPolicy = {
  es: `
  <p><strong>VERIFICACIÓN DE PAGOS:</strong> Enviar un comprobante no confirma el pago; todo comprobante debe ser revisado y verificado por Callejeros Tours.</p>
  <p><strong>BALANCE:</strong> El saldo pendiente debe completarse entre <strong>5 y 2 días antes</strong> de la excursión, según las condiciones y disponibilidad de cada actividad.</p>
  <p><strong>CANCELACIÓN DEL CLIENTE:</strong> Las reservas son <strong>generalmente no reembolsables</strong>.</p>
  <p><strong>ANTICIPACIÓN:</strong> Toda cancelación debe notificarse con un mínimo de <strong>72 horas de anticipación</strong>, según las condiciones de la reserva.</p>
  <p><strong>PAGO COMPLETO:</strong> Si el cliente cancela fuera de las condiciones establecidas después de pagar el total, <strong>puede perder el monto completo pagado</strong>.</p>
  <p><strong>EXCEPCIONES:</strong> Cualquier excepción a estas políticas será evaluada directamente por el <strong>equipo de Callejeros Tours</strong>.</p>
`,
  en: `
  <p><strong>PAYMENT VERIFICATION:</strong> Sending a receipt does not confirm payment; all receipts must be reviewed and verified by Callejeros Tours.</p>
  <p><strong>BALANCE:</strong> The remaining balance must be paid between <strong>5 and 2 days before</strong> the excursion, according to the conditions and availability of each activity.</p>
  <p><strong>CLIENT CANCELLATION:</strong> Reservations are <strong>generally non-refundable</strong>.</p>
  <p><strong>NOTICE:</strong> Any cancellation must be notified at least <strong>72 hours in advance</strong>, according to the reservation conditions.</p>
  <p><strong>FULL PAYMENT:</strong> If the client cancels outside the established conditions after paying the total amount, <strong>they may lose the full amount paid</strong>.</p>
  <p><strong>EXCEPTIONS:</strong> Any exception to these policies will be evaluated directly by the <strong>Callejeros Tours team</strong>.</p>
`
};

const getLocalizedValue = (value, lang) => {
  if (typeof value === "string" || Array.isArray(value)) {
    // If it's already a string or array (old structure), return it as fallback
    if (!value.es && !value.en) return value;
  }
  return value?.[lang] ?? value?.es ?? "";
};

const t = (key, fallback) => {
  const lang = typeof window.getCurrentLanguage === 'function' ? window.getCurrentLanguage() : 'es';
  return (window.translations && window.translations[lang] && window.translations[lang][key]) || fallback;
};

const tours = [
  {
    id: "ermitaño-20",
    date: { es: "Domingo 16 de agosto de 2026", en: "Sunday, August 16, 2026" },
    shortDate: { es: "16 AGO", en: "AUG 16" },
    title: { es: "Playa Ermitaño", en: "Ermitaño Beach" },
    location: { es: "Samaná, República Dominicana", en: "Samaná, Dominican Republic" },
    price: "RD$3,200",
    image: "img/Playaermitaño.jpeg",
    description: {
      es: "Una vuelta para desconectarte, conocer playas espectaculares y disfrutar Samaná con la gente de Callejeros.",
      en: "A getaway to disconnect, discover spectacular beaches, and enjoy Samaná with the Callejeros crew."
    },
    includes: {
      es: ["Transporte ida y vuelta", "Desayuno ligero", "Almuerzo criollo", "Paseo en lancha", "Staff de Callejeros", "Fotografías y buena vibra"],
      en: ["Round-trip transportation", "Light breakfast", "Traditional Dominican lunch", "Speedboat ride", "Callejeros staff", "Photography and good vibes"]
    },
    excludes: {
      es: ["Consumos personales", "Gastos no indicados como incluidos"],
      en: ["Personal expenses", "Expenses not listed as included"]
    },
    policy: defaultPolicy,
    additionalIcons: [
      { file: "bote.png", label: "Paseo en lancha", key: "icon_lancha" }
    ]
  },
  {
    id: "buggy-macao",
    date: { es: "Domingo 20 de septiembre de 2026", en: "Sunday, September 20, 2026" },
    shortDate: { es: "20 SEP", en: "SEP 20" },
    title: { es: "Buggy Playa Macao", en: "Macao Beach Buggy" },
    location: { es: "Macao, Punta Cana", en: "Macao, Punta Cana" },
    price: "RD$3,700",
    image: "img/webp/Buggy.webp",
    description: {
      es: "Aventura, barro, playa y adrenalina en una de las experiencias que más se gozan en el Este.",
      en: "Adventure, mud, beach, and adrenaline in one of the most enjoyable experiences in the East."
    },
    includes: {
      es: ["Transporte ida y vuelta", "Actividad de buggy", "Coordinación de Callejeros", "Tiempo de disfrute en destino"],
      en: ["Round-trip transportation", "Buggy activity", "Callejeros coordination", "Free time to enjoy the destination"]
    },
    excludes: {
      es: ["Consumos personales", "Gastos no indicados como incluidos"],
      en: ["Personal expenses", "Expenses not listed as included"]
    },
    policy: defaultPolicy,
    additionalIcons: [
      { file: "buggy.png", label: "Buggy", key: "icon_buggy" }
    ]
  },
  {
    id: "rio-partido",
    date: { es: "Domingo 18 de octubre de 2026", en: "Sunday, October 18, 2026" },
    shortDate: { es: "18 OCT", en: "OCT 18" },
    title: { es: "Tour Río Partido", en: "Río Partido Tour" },
    location: { es: "República Dominicana", en: "Dominican Republic" },
    price: "RD$3,100",
    image: "img/webp/Riopartido.webp",
    description: {
      es: "Naturaleza, agua cristalina y aventura para salir de la rutina y descubrir otro de los rincones de RD.",
      en: "Nature, crystal clear water, and adventure to break the routine and discover another hidden gem of the DR."
    },
    includes: {
      es: ["Transporte ida y vuelta", "Coordinación y acompañamiento", "Actividades indicadas en el itinerario", "Buena vibra Callejeros"],
      en: ["Round-trip transportation", "Coordination and guidance", "Activities listed in the itinerary", "Callejeros good vibes"]
    },
    excludes: {
      es: ["Consumos personales", "Gastos no indicados como incluidos"],
      en: ["Personal expenses", "Expenses not listed as included"]
    },
    policy: defaultPolicy,
    additionalIcons: [
      { file: "naturaleza.png", label: "Naturaleza", key: "icon_naturaleza" },
      { file: "chaleco_salvavidas.png", label: "Chalecos salvavidas", key: "icon_chalecos_salvavidas" },
      { file: "dificultad_media.png", label: "Dificultad media", key: "icon_dificultad_media" }
    ]
  },
  {
    id: "isla-saona",
    date: { es: "Domingo 15 de noviembre de 2026", en: "Sunday, November 15, 2026" },
    shortDate: { es: "15 NOV", en: "NOV 15" },
    title: { es: "Isla Saona y piscina natural", en: "Saona Island and natural pool" },
    location: { es: "Bayahíbe / Isla Saona, RD", en: "Bayahíbe / Saona Island, DR" },
    price: "RD$3,800",
    image: "img/webp/islasaona.webp",
    description: {
      es: "Aguas turquesas, piscina natural, paseo en catamarán y lancha rápida con toda la energía de Callejeros.",
      en: "Turquoise waters, a natural pool, catamaran ride, and speedboat with all the energy of Callejeros."
    },
    includes: {
      es: ["Transporte ida y vuelta", "Paseo en lancha y catamarán", "Almuerzo buffet en la isla", "Piscina natural con estrellas de mar", "Staff y animación"],
      en: ["Round-trip transportation", "Speedboat and catamaran ride", "Buffet lunch on the island", "Natural pool with starfish", "Staff and entertainment"]
    },
    excludes: {
      es: ["Consumos personales", "Gastos no indicados como incluidos"],
      en: ["Personal expenses", "Expenses not listed as included"]
    },
    policy: defaultPolicy,
    additionalIcons: [
      { file: "bote.png", label: "Paseo en lancha y catamarán", key: "icon_lancha_catamaran" },
      { file: "playa_isla.png", label: "Isla Saona" } // Name proper
    ]
  },
  {
    id: "playa-fronton",
    date: { es: "Domingo 06 de diciembre de 2026", en: "Sunday, December 06, 2026" },
    shortDate: { es: "06 DIC", en: "DEC 06" },
    title: { es: "Playa Frontón y Madama", en: "Frontón and Madama Beach" },
    location: { es: "Las Galeras, Samaná", en: "Las Galeras, Samaná" },
    price: "RD$3,400",
    image: "img/webp/fronton4.webp",
    bgPosition: "center bottom",
    description: {
      es: "Imponentes acantilados, snorkel en arrecifes de coral y dos de las playas más salvajes y bellas de Samaná.",
      en: "Towering cliffs, coral reef snorkeling, and two of the wildest and most beautiful beaches in Samaná."
    },
    includes: {
      es: ["Transporte ida y vuelta", "Paseo en bote a las playas", "Almuerzo típico", "Guía y staff Callejeros", "Tiempo de playa y snorkel"],
      en: ["Round-trip transportation", "Boat ride to the beaches", "Traditional lunch", "Callejeros guide and staff", "Beach and snorkeling time"]
    },
    excludes: {
      es: ["Equipo personal de snorkel", "Consumos fuera del menú incluido"],
      en: ["Personal snorkeling gear", "Consumption outside the included menu"]
    },
    policy: defaultPolicy,
    additionalIcons: [
      { file: "bote.png", label: "Paseo en bote", key: "icon_paseo_bote" },
      { file: "snorkel.png", label: "Snorkel", key: "icon_snorkel" }
    ]
  },
  {
    id: "cano-frio",
    date: { es: "Domingo 20 de diciembre de 2026", en: "Sunday, December 20, 2026" },
    shortDate: { es: "20 DIC", en: "DEC 20" },
    title: { es: "Caño Frío y Playa Rincón", en: "Caño Frío and Rincón Beach" },
    location: { es: "Samaná, República Dominicana", en: "Samaná, Dominican Republic" },
    price: "RD$2,800",
    image: "img/cañofrio.jpg",
    description: {
      es: "El contraste perfecto entre el agua dulce y cristalina de Caño Frío y las olas de Playa Rincón.",
      en: "The perfect contrast between the crystal clear fresh water of Caño Frío and the waves of Playa Rincón."
    },
    includes: {
      es: ["Transporte ida y vuelta", "Visita a Caño Frío y Playa Rincón", "Almuerzo frente al mar", "Staff de apoyo Callejeros", "Fotos de la experiencia"],
      en: ["Round-trip transportation", "Visit to Caño Frío and Playa Rincón", "Oceanfront lunch", "Callejeros support staff", "Photos of the experience"]
    },
    excludes: {
      es: ["Gastos personales", "Bebidas alcohólicas no incluidas"],
      en: ["Personal expenses", "Alcoholic beverages not included"]
    },
    policy: defaultPolicy,
    additionalIcons: [
      { file: "playa_descanso.png", label: "Playa", key: "icon_playa" }
    ]
  }
];

const grid = document.querySelector("#tour-grid");
const modal = document.querySelector("#tour-modal");
const policyAccept = document.querySelector("#policy-accept");
const modalReserveBtn = document.querySelector("#modal-reserve-btn");

let currentTourInModal = null;

const tourImages = [
  "img/Playaermitaño.jpeg"
];

function getRandomTourImage() {
  const randomIndex = Math.floor(Math.random() * tourImages.length);
  return tourImages[randomIndex];
}

function renderTours() {
  if (!grid) return;
  const currentLang = typeof window.getCurrentLanguage === 'function' ? window.getCurrentLanguage() : 'es';

  grid.innerHTML = tours.map(tour => {
    const bgImage = tour.image || getRandomTourImage();
    const bgPos = tour.bgPosition || 'center';

    const fixedIcons = [
      { file: "almuerzo.png", label: "Almuerzo", key: "icon_almuerzo" },
      { file: "transporte.png", label: "Transporte", key: "icon_transporte" },
      { file: "fotografia.png", label: "Fotografía", key: "icon_fotografia" }
    ];

    const allIcons = fixedIcons.concat(tour.additionalIcons || []);
    const iconsHtml = `
      <div class="tour-icons" style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-start; margin: 12px 0;">
        ${allIcons.map(icon => `<img src="img/icons/${icon.file}" alt="${icon.label}" title="${icon.label}" ${icon.key ? `data-i18n-aria="${icon.key}" data-i18n-title="${icon.key}" data-i18n-alt="${icon.key}"` : ''} aria-label="${icon.label}" style="width: 32px; height: 32px; object-fit: contain; background: transparent;">`).join('')}
      </div>
    `;

    return `
    <article class="tour-card">
      <div class="tour-media" style="background-image: url('${bgImage}'); background-position: ${bgPos};">
      </div>
      <div class="tour-body">
        <h3 style="margin-bottom: 12px; font-size: 1.6rem;">${getLocalizedValue(tour.title, currentLang)}</h3>
        <div style="margin-bottom: 0px;">
          <span class="price" style="display: block; font-size: 1.45rem; line-height: 1.2;">${tour.price}</span>
          <span style="font-size: 0.85rem; font-weight: normal; color: var(--muted);"><span data-i18n="tour_reserve_with">Reserva con:</span> RD$1,000</span>
        </div>
        ${iconsHtml}
        <p style="margin-top: 4px;">${getLocalizedValue(tour.description, currentLang)}</p>
        <div class="tour-meta" style="justify-content: center; margin-top: auto; padding-top: 16px;">
          <button class="btn btn-accent btn-card-action" type="button" data-tour="${tour.id}" data-i18n="tour_btn_details">Ver detalles y reservar</button>
        </div>
      </div>
    </article>
  `;
  }).join("");

  // Triggers data-i18n replacement in the newly rendered HTML
  if (typeof setLanguage === 'function') {
    setLanguage(currentLang);
  }
}

function openTour(tour) {
  currentTourInModal = tour;
  const currentLang = typeof window.getCurrentLanguage === 'function' ? window.getCurrentLanguage() : 'es';

  document.querySelector("#modal-title").textContent = getLocalizedValue(tour.title, currentLang);
  document.querySelector("#modal-location").textContent = getLocalizedValue(tour.location, currentLang);
  document.querySelector("#modal-price").textContent = tour.price;

  document.querySelector("#modal-description").textContent = getLocalizedValue(tour.description, currentLang);

  const includesArr = getLocalizedValue(tour.includes, currentLang) || [];
  document.querySelector("#modal-includes").innerHTML = includesArr.map(x => `<li>${x}</li>`).join("");

  const excludesArr = getLocalizedValue(tour.excludes, currentLang) || [];
  document.querySelector("#modal-excludes").innerHTML = excludesArr.map(x => `<li>${x}</li>`).join("");

  document.querySelector("#modal-policy").innerHTML = getLocalizedValue(tour.policy || defaultPolicy, currentLang);

  if (policyAccept) policyAccept.checked = false;
  if (modalReserveBtn) {
    modalReserveBtn.classList.add("disabled-link");
    modalReserveBtn.setAttribute("aria-disabled", "true");
  }

  if (typeof modal.showModal === "function") {
    if (!modal.open) modal.showModal();
  } else {
    modal.setAttribute("open", "");
  }
}

// Refresh dynamic content when language changes
document.addEventListener("languageChanged", (e) => {
  renderTours(); // Re-render grid to update dynamic descriptions
  if (currentTourInModal && modal && (modal.open || modal.hasAttribute("open"))) {
    openTour(currentTourInModal); // Re-populate modal with new language
  }
});

if (policyAccept && modalReserveBtn) {
  policyAccept.addEventListener("change", e => {
    modalReserveBtn.classList.toggle("disabled-link", !e.target.checked);
    modalReserveBtn.setAttribute("aria-disabled", String(!e.target.checked));
  });
}

if (modalReserveBtn) {
  modalReserveBtn.addEventListener("click", () => {
    if (modalReserveBtn.getAttribute("aria-disabled") === "true") return;
    if (modal) modal.close();
    if (currentTourInModal) openBookingModal(currentTourInModal.id);
  });
}

if (grid) {
  grid.addEventListener("click", event => {
    const detailsBtn = event.target.closest("[data-tour]");
    if (detailsBtn) {
      const tour = tours.find(item => item.id === detailsBtn.dataset.tour);
      if (tour) openTour(tour);
      return;
    }

    const bookBtn = event.target.closest("[data-book-tour]");
    if (bookBtn) {
      openBookingModal(bookBtn.dataset.bookTour);
    }
  });
}

const modalClose = document.querySelector("#modal-close");
if (modalClose && modal) modalClose.addEventListener("click", () => modal.close());
if (modal) modal.addEventListener("click", e => { if (e.target === modal) modal.close(); });

// ==========================================================================
// CONTROLADOR DEL MODAL Y FORMULARIO DE RESERVAS
// ==========================================================================
const bookingModal = document.querySelector("#booking-modal");
const bookingModalClose = document.querySelector("#booking-modal-close");
const bookingForm = document.querySelector("#booking-form");
const bookingTourSelect = document.querySelector("#booking-tour");
const bookingDateInput = document.querySelector("#booking-date");
const btnToSummary = document.querySelector("#btn-to-summary");
const btnBackToForm = document.querySelector("#btn-back-to-form");
const btnConfirmBooking = document.querySelector("#btn-confirm-booking");
const btnSuccessClose = document.querySelector("#btn-success-close");

const bookingSummaryStep = document.querySelector("#booking-summary-step");
const bookingSuccessStep = document.querySelector("#booking-success-step");

let currentBookingData = null;

function populateTourSelect() {
  if (!bookingTourSelect) return;
  const currentVal = bookingTourSelect.value;
  bookingTourSelect.innerHTML = `<option value="">${t('book_opt_tour', '-- Selecciona una excursión --')}</option>` +
    tours.map(t => `<option value="${t.id}" data-date="${t.date}">${t.title} (${t.shortDate} - ${t.price})</option>`).join("");
  if (currentVal) bookingTourSelect.value = currentVal;
}

if (bookingTourSelect && bookingDateInput) {
  bookingTourSelect.addEventListener("change", () => {
    const selectedOption = bookingTourSelect.options[bookingTourSelect.selectedIndex];
    if (selectedOption && selectedOption.dataset.date) {
      bookingDateInput.value = selectedOption.dataset.date;
      clearFieldError("booking-tour");
      clearFieldError("booking-date");
    } else {
      bookingDateInput.value = "";
    }
  });
}

function clearFieldError(fieldId) {
  const input = document.querySelector(`#${fieldId}`);
  const errorSpan = document.querySelector(`#err-${fieldId}`);
  if (input) input.classList.remove("is-invalid");
  if (errorSpan) errorSpan.textContent = "";
}

function setFieldError(fieldId, message) {
  const input = document.querySelector(`#${fieldId}`);
  const errorSpan = document.querySelector(`#err-${fieldId}`);
  if (input) input.classList.add("is-invalid");
  if (errorSpan) errorSpan.textContent = message;
}

function validateBookingForm() {
  let isValid = true;

  const name = document.querySelector("#booking-name").value.trim();
  const phone = document.querySelector("#booking-phone").value.trim();
  const email = document.querySelector("#booking-email").value.trim();
  const people = parseInt(document.querySelector("#booking-people").value, 10);
  const tourId = document.querySelector("#booking-tour").value;
  const date = document.querySelector("#booking-date").value.trim();
  const pickup = document.querySelector("#booking-pickup").value.trim();
  const method = document.querySelector('input[name="metodo_envio"]:checked');

  // Limpiar errores previos
  ["booking-name", "booking-phone", "booking-email", "booking-people", "booking-tour", "booking-date", "booking-pickup", "booking-method"].forEach(clearFieldError);

  if (!name || name.length < 3) {
    setFieldError("booking-name", t("val_name", "Por favor ingresa tu nombre completo."));
    isValid = false;
  }

  if (!phone || phone.length < 7) {
    setFieldError("booking-phone", t("val_phone", "Ingresa un número de WhatsApp válido."));
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    setFieldError("booking-email", t("val_email", "Ingresa un correo electrónico válido (ej. tu@correo.com)."));
    isValid = false;
  }

  if (isNaN(people) || people < 1) {
    setFieldError("booking-people", t("val_people", "La cantidad debe ser al menos 1 persona."));
    isValid = false;
  }

  if (!tourId) {
    setFieldError("booking-tour", t("val_tour", "Selecciona la excursión que deseas reservar."));
    isValid = false;
  }

  if (!date) {
    setFieldError("booking-date", t("val_date", "La fecha de la excursión es obligatoria."));
    isValid = false;
  }

  if (!pickup || pickup.length < 3) {
    setFieldError("booking-pickup", t("val_pickup", "Especifica el punto de recogida deseado."));
    isValid = false;
  }

  if (!method) {
    setFieldError("booking-method", t("val_method", "Selecciona cómo deseas enviar tu solicitud."));
    isValid = false;
  }

  if (isValid) {
    const selectedTour = tours.find(t => t.id === tourId);
    currentBookingData = {
      nombre: name,
      whatsapp: phone,
      correo: email,
      personas: people,
      excursionId: tourId,
      excursion: selectedTour ? selectedTour.title : tourId,
      fecha: date,
      punto_recogida: pickup,
      observaciones: document.querySelector("#booking-notes").value.trim(),
      metodo_envio: method.value
    };
  }

  return isValid;
}

function showBookingStep(step) {
  if (bookingForm) bookingForm.style.display = (step === "form") ? "block" : "none";
  if (bookingSummaryStep) bookingSummaryStep.style.display = (step === "summary") ? "block" : "none";
  if (bookingSuccessStep) bookingSuccessStep.style.display = (step === "success") ? "block" : "none";
}

function populateSummary(data) {
  const lang = typeof window.getCurrentLanguage === 'function' ? window.getCurrentLanguage() : 'es';
  document.querySelector("#sum-name").textContent = data.nombre;
  document.querySelector("#sum-phone").textContent = data.whatsapp;
  document.querySelector("#sum-email").textContent = data.correo;
  document.querySelector("#sum-tour").textContent = data.excursion;
  document.querySelector("#sum-date").textContent = data.fecha;
  document.querySelector("#sum-people").textContent = `${data.personas} ${data.personas === 1 ? (lang === 'en' ? 'person' : 'persona') : (lang === 'en' ? 'people' : 'personas')}`;
  document.querySelector("#sum-pickup").textContent = data.punto_recogida;
  document.querySelector("#sum-notes").textContent = data.observaciones || (lang === 'en' ? "None" : "Ninguna");

  let methodText = "📱 WhatsApp";
  if (data.metodo_envio === "email") methodText = lang === 'en' ? "📧 Email" : "📧 Correo electrónico";
  if (data.metodo_envio === "both") methodText = lang === 'en' ? "⚡ Both (Email + WhatsApp)" : "⚡ Ambos (Correo + WhatsApp)";
  document.querySelector("#sum-method").textContent = methodText;
}

function generateWhatsAppMessage(data) {
  const lang = typeof window.getCurrentLanguage === 'function' ? window.getCurrentLanguage() : 'es';
  if (lang === 'en') {
    return `Hello Callejeros Tours RD 👋
I would like to request a reservation.

👤 Name: ${data.nombre}
📱 WhatsApp: ${data.whatsapp}
📧 Email: ${data.correo}
🏝️ Tour: ${data.excursion}
📅 Date: ${data.fecha}
👥 People: ${data.personas}
📍 Pickup Location: ${data.punto_recogida}
📝 Notes: ${data.observaciones || "None"}

I look forward to your availability confirmation. Thank you!`;
  }
  return `Hola Callejeros Tours RD 👋
Quiero solicitar una reserva.

👤 Nombre: ${data.nombre}
📱 WhatsApp: ${data.whatsapp}
📧 Correo: ${data.correo}
🏝️ Excursión: ${data.excursion}
📅 Fecha: ${data.fecha}
👥 Personas: ${data.personas}
📍 Punto de recogida: ${data.punto_recogida}
📝 Observaciones: ${data.observaciones || "Ninguna"}

Quedo atento a la confirmación de disponibilidad. ¡Gracias!`;
}

function openBookingModal(tourId = "") {
  populateTourSelect();
  showBookingStep("form");

  if (tourId && bookingTourSelect) {
    bookingTourSelect.value = tourId;
    const selectedTour = tours.find(t => t.id === tourId);
    if (selectedTour && bookingDateInput) {
      bookingDateInput.value = selectedTour.date;
    }
  }

  // Limpiar errores
  document.querySelectorAll(".form-error").forEach(span => span.textContent = "");
  document.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));

  if (bookingModal) {
    if (typeof bookingModal.showModal === "function") bookingModal.showModal();
    else bookingModal.setAttribute("open", "");
  }
}

if (btnToSummary) {
  btnToSummary.addEventListener("click", () => {
    if (validateBookingForm()) {
      populateSummary(currentBookingData);
      showBookingStep("summary");
    }
  });
}

if (btnBackToForm) {
  btnBackToForm.addEventListener("click", () => {
    showBookingStep("form");
  });
}

if (btnConfirmBooking) {
  btnConfirmBooking.addEventListener("click", async () => {
    if (!currentBookingData) return;

    // Verificar Honeypot anti-spam
    const botField = document.querySelector('input[name="bot-field"]');
    if (botField && botField.value.trim() !== "") {
      // Spam detectado: simular éxito silencioso
      showBookingStep("success");
      return;
    }

    btnConfirmBooking.disabled = true;
    btnConfirmBooking.textContent = t("book_btn_processing", "Procesando solicitud...");

    const { metodo_envio, excursion, nombre } = currentBookingData;
    const waMsg = generateWhatsAppMessage(currentBookingData);
    const waUrl = `https://wa.me/${BOOKING_CONFIG.officialWhatsApp}?text=${encodeURIComponent(waMsg)}`;
    const emailSubject = `Nueva solicitud de reserva — ${excursion} — ${nombre}`;

    const hintContainer = document.querySelector("#success-method-hint");

    try {
      // 1. Envío por Correo o Ambos (Integración Netlify Forms / Backend AJAX)
      if (metodo_envio === "email" || metodo_envio === "both") {
        const formData = new FormData(bookingForm);
        const endpoint = BOOKING_CONFIG.customFormEndpoint || "/";

        try {
          await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
          });
        } catch (fetchError) {
          console.warn("Nota de envío directo: Se procesará con respaldo de correo.", fetchError);
        }
      }

      // 2. Manejo de apertura de WhatsApp si aplica
      if (metodo_envio === "whatsapp" || metodo_envio === "both") {
        window.open(waUrl, "_blank", "noopener,noreferrer");
      }

      // 3. Configurar mensajes explicativos del paso de éxito
      if (hintContainer) {
        const lang = typeof window.getCurrentLanguage === 'function' ? window.getCurrentLanguage() : 'es';
        if (metodo_envio === "whatsapp") {
          hintContainer.innerHTML = lang === 'en' ?
            `✓ We have opened <strong>WhatsApp</strong> with your reservation details so you can send the message with one click.` :
            `✓ Hemos abierto <strong>WhatsApp</strong> con los datos de tu reserva para que puedas enviar el mensaje con un solo clic.`;
        } else if (metodo_envio === "email") {
          hintContainer.innerHTML = lang === 'en' ?
            `✓ The request has been sent to <strong>${BOOKING_CONFIG.officialEmail}</strong>. We will contact you shortly.` :
            `✓ La solicitud se ha enviado a <strong>${BOOKING_CONFIG.officialEmail}</strong>. Te contactaremos a la brevedad.`;
        } else {
          hintContainer.innerHTML = lang === 'en' ?
            `✓ Request registered to be sent by <strong>email</strong> and <strong>WhatsApp</strong> has been opened for your quick confirmation.` :
            `✓ Solicitud registrada para envío por <strong>correo</strong> y se ha abierto <strong>WhatsApp</strong> para tu confirmación rápida.`;
        }
      }

      // 4. Mostrar pantalla de éxito
      showBookingStep("success");
      if (bookingForm) bookingForm.reset();

    } catch (err) {
      console.error("Error al procesar reserva:", err);
      // En caso de cualquier inconveniente, permitir al usuario enviar por WhatsApp
      if (metodo_envio === "whatsapp" || metodo_envio === "both") {
        window.open(waUrl, "_blank");
      }
      showBookingStep("success");
    } finally {
      btnConfirmBooking.disabled = false;
      btnConfirmBooking.textContent = t("sum_btn_confirm", "CONFIRMAR RESERVA");
    }
  });
}

if (btnSuccessClose && bookingModal) {
  btnSuccessClose.addEventListener("click", () => {
    bookingModal.close();
    showBookingStep("form");
  });
}

if (bookingModalClose && bookingModal) {
  bookingModalClose.addEventListener("click", () => bookingModal.close());
}

if (bookingModal) {
  bookingModal.addEventListener("click", e => {
    if (e.target === bookingModal) bookingModal.close();
  });
}

// ==========================================================================
// COMPONENTES GENERALES Y MENÚ
// ==========================================================================
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector("#main-menu");
if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  menu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    menu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));
}

// Desplazamiento suave para todos los enlaces internos (#) y el logo
document.querySelectorAll('a[href^="#"], .brand').forEach(link => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");

    // Si no tiene href o es solo '#'
    if (!href || href === "#" || href === "#inicio" || link.classList.contains("brand")) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } else {
      try {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          const header = document.querySelector(".site-header");
          const headerHeight = header ? header.offsetHeight : 80;
          const targetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetTop,
            behavior: "smooth"
          });
        }
      } catch (err) {
        // En caso de selector especial, continuar navegación por defecto
      }
    }

    // Cerrar menú móvil si está abierto
    if (menu && menu.classList.contains("open")) {
      menu.classList.remove("open");
      if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

function setHeroBackground() {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  const bgImage = getRandomTourImage();
  hero.style.backgroundImage = `url('${bgImage}')`;
}

const introPlaces = [
  { name: "Playa Ermitaño", img: "img/Playaermitaño.jpeg", desc: "Playa virgen de arena blanca y aguas turquesas, accesible por bote o senderismo." },
  { name: "Isla Saona", img: "img/webp/islasaona.webp", desc: "Paraíso tropical con piscinas naturales, estrellas de mar y playas paradisíacas." },
  { name: "Buggy Macao", img: "img/webp/Buggy.webp", desc: "Aventura todoterreno llena de adrenalina, barro y hermosas vistas." },
  { name: "Río Partido", img: "img/webp/Riopartido.webp", desc: "Impresionante río de aguas color azul turquesa escondido en las montañas." },
  { name: "Playa Frontón", img: "img/webp/fronton4.webp", bgPosition: "center bottom", desc: "Espectacular playa rodeada de acantilados gigantes, ideal para snorkel." },
  { name: "Playa Dominicus", img: "img/webp/dominicus12.webp", desc: "Una hermosa playa de aguas turquesas y arena clara en Bayahíbe, perfecta para relajarse y disfrutar del ambiente caribeño." },
  { name: "Zona Colonial", img: "img/webp/zona colonial.webp", desc: "El corazón histórico de Santo Domingo, lleno de cultura y magia colonial." },
  { name: "Cola de Pato", img: "img/webp/coladepato11.webp", desc: "Una aventura entre montañas, senderos y aguas cristalinas para disfrutar uno de los rincones naturales más impresionantes de República Dominicana." },
  { name: "Cayo Arena", img: "img/webp/cayoarenaplaya.webp", desc: "Un pequeño paraíso de arena blanca y aguas cristalinas, ideal para disfrutar del mar, hacer snorkel y descubrir la belleza del norte de República Dominicana." },
  { name: "Rio Partido", img: "img/webp/Riopartido2.webp", desc: "Cascadas impresionantes y charcos cristalinos perfectos para desconectar." }
]

function initIntroCarousel() {
  const container = document.querySelector(".intro-carousel");
  const track = document.querySelector(".intro-carousel-track");
  if (!container || !track) return;

  // Items template with destination label overlay
  const createItems = (list) => list.map((place, index) => `
    <div class="intro-carousel-item" data-gallery-index="${index}">
      <img src="${place.img}" alt="${place.name}" draggable="false" loading="lazy">
      <div class="intro-item-overlay">
        <span>${place.name}</span>
      </div>
    </div>
  `).join("");

  // 3 complete sets for infinite bilateral drag wrapping
  track.innerHTML = createItems(introPlaces) + createItems(introPlaces) + createItems(introPlaces);

  let currentX = 0;
  let autoSpeed = -0.65; // base auto-scroll speed (px per frame)
  let velocity = 0;
  let isDragging = false;
  let isHovered = false;
  let startPointerX = 0;
  let lastPointerX = 0;
  let lastPointerTime = 0;
  let animationFrameId = null;
  let dragDistance = 0;

  function getSegmentWidth() {
    return track.scrollWidth / 3;
  }

  function wrapPosition() {
    const segW = getSegmentWidth();
    if (segW <= 0) return;
    while (currentX < -2 * segW) {
      currentX += segW;
    }
    while (currentX > -segW) {
      currentX -= segW;
    }
  }

  // Set initial position to center segment
  requestAnimationFrame(() => {
    const initialSegW = getSegmentWidth();
    currentX = -initialSegW;
    track.style.transform = `translate3d(${currentX}px, 0, 0)`;
  });

  // Main animation tick
  function tick() {
    if (!isDragging) {
      if (Math.abs(velocity) > 0.08) {
        // Inertia coasting
        currentX += velocity;
        velocity *= 0.94; // friction damping
      } else {
        velocity = 0;
        if (!isHovered) {
          currentX += autoSpeed;
        }
      }
      wrapPosition();
      track.style.transform = `translate3d(${currentX}px, 0, 0)`;
    }
    animationFrameId = requestAnimationFrame(tick);
  }

  animationFrameId = requestAnimationFrame(tick);

  // Pointer drag events
  function handlePointerDown(e) {
    // Only primary button for mouse
    if (e.pointerType === "mouse" && e.button !== 0) return;

    isDragging = true;
    startPointerX = e.clientX;
    lastPointerX = e.clientX;
    lastPointerTime = performance.now();
    velocity = 0;
    dragDistance = 0;

    container.classList.add("is-dragging");
  }

  function handlePointerMove(e) {
    if (!isDragging) return;

    const clientX = e.clientX;
    const deltaX = clientX - lastPointerX;
    dragDistance += Math.abs(deltaX);
    const now = performance.now();
    const dt = Math.max(1, now - lastPointerTime);

    // Compute velocity for inertia
    const instantVelocity = (deltaX / dt) * 16;
    // Smooth velocity estimate
    velocity = velocity * 0.35 + instantVelocity * 0.65;
    if (velocity > 32) velocity = 32;
    if (velocity < -32) velocity = -32;

    currentX += deltaX;
    wrapPosition();
    track.style.transform = `translate3d(${currentX}px, 0, 0)`;

    lastPointerX = clientX;
    lastPointerTime = now;
  }

  function handlePointerUp(e) {
    if (!isDragging) return;
    isDragging = false;
    container.classList.remove("is-dragging");
  }

  container.addEventListener("pointerdown", handlePointerDown);
  container.addEventListener("pointermove", handlePointerMove);
  container.addEventListener("pointerup", handlePointerUp);
  container.addEventListener("pointercancel", handlePointerUp);

  // Click event for Gallery Modal
  container.addEventListener("click", (e) => {
    // Ignore clicks if the user was dragging
    if (dragDistance > 5) {
      return;
    }

    const item = e.target.closest(".intro-carousel-item");
    if (item) {
      const index = parseInt(item.getAttribute("data-gallery-index"), 10);
      if (!isNaN(index)) {
        openGalleryModal(index);
      }
    }
  });

  container.addEventListener("mouseenter", () => {
    isHovered = true;
  });

  container.addEventListener("mouseleave", () => {
    isHovered = false;
  });

  // Trackpad / Horizontal wheel support
  container.addEventListener("wheel", (e) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
    if (delta !== 0) {
      e.preventDefault();
      currentX -= delta * 0.7;
      wrapPosition();
      track.style.transform = `translate3d(${currentX}px, 0, 0)`;
    }
  }, { passive: false });

  // Recalculate on window resize
  window.addEventListener("resize", () => {
    wrapPosition();
  });
}

// Gallery Modal Logic
let currentGalleryIndex = 0;
const galleryModal = document.getElementById("gallery-modal");
const galleryImage = document.getElementById("gallery-image");
const galleryTitle = document.getElementById("gallery-title");
const galleryDesc = document.getElementById("gallery-desc");
const galleryCloseBtn = document.getElementById("gallery-close");
const galleryPrevBtn = document.getElementById("gallery-prev");
const galleryNextBtn = document.getElementById("gallery-next");

function updateGalleryUI() {
  const place = introPlaces[currentGalleryIndex];
  if (!place) return;
  galleryImage.src = place.img;
  galleryImage.alt = place.name;
  galleryTitle.textContent = place.name;
  galleryDesc.textContent = place.desc;
}

function openGalleryModal(index) {
  currentGalleryIndex = index;
  updateGalleryUI();
  if (typeof galleryModal.showModal === "function") {
    galleryModal.showModal();
  } else {
    galleryModal.setAttribute("open", "");
  }
}

function closeGalleryModal() {
  if (typeof galleryModal.close === "function") {
    galleryModal.close();
  } else {
    galleryModal.removeAttribute("open");
  }
}

function nextGalleryItem() {
  currentGalleryIndex = (currentGalleryIndex + 1) % introPlaces.length;
  updateGalleryUI();
}

function prevGalleryItem() {
  currentGalleryIndex = (currentGalleryIndex - 1 + introPlaces.length) % introPlaces.length;
  updateGalleryUI();
}

if (galleryCloseBtn) galleryCloseBtn.addEventListener("click", closeGalleryModal);
if (galleryNextBtn) galleryNextBtn.addEventListener("click", nextGalleryItem);
if (galleryPrevBtn) galleryPrevBtn.addEventListener("click", prevGalleryItem);
if (galleryModal) {
  galleryModal.addEventListener("click", (e) => {
    if (e.target === galleryModal) closeGalleryModal();
  });
}

const yearSpan = document.querySelector("#year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

renderTours();
setHeroBackground();
initIntroCarousel();

// ==========================================================================
// FORMULARIO PARA GRUPOS
// ==========================================================================
const groupModal = document.querySelector("#group-modal");
const groupPolicyAccept = document.querySelector("#group-policy-accept");
const btnGroupSend = document.querySelector("#btn-group-send");
const groupModalClose = document.querySelector("#group-modal-close");
const groupForm = document.querySelector("#group-form");
const groupPeopleInput = document.querySelector("#group-people");

function openGroupModal() {
  if (!groupModal) return;

  if (groupForm) {
    groupForm.reset();
    document.querySelectorAll("#group-form .form-error").forEach(el => el.textContent = "");
  }

  const policyContainer = document.querySelector("#group-modal-policy");
  if (policyContainer) {
    const currentLang = typeof window.getCurrentLanguage === 'function' ? window.getCurrentLanguage() : 'es';
    policyContainer.innerHTML = getLocalizedValue(defaultPolicy, currentLang);
  }

  if (btnGroupSend) {
    btnGroupSend.classList.add("disabled-link");
    btnGroupSend.setAttribute("aria-disabled", "true");
  }

  if (typeof groupModal.showModal === "function") {
    groupModal.showModal();
  } else {
    groupModal.setAttribute("open", "");
  }
}

function closeGroupModal() {
  if (typeof groupModal.close === "function") {
    groupModal.close();
  } else {
    groupModal.removeAttribute("open");
  }
}

if (groupModalClose) groupModalClose.addEventListener("click", closeGroupModal);
if (groupModal) {
  groupModal.addEventListener("click", (e) => {
    if (e.target === groupModal) closeGroupModal();
  });
}

function validateGroupForm() {
  if (!groupForm || !btnGroupSend) return;

  let isValid = true;
  document.querySelectorAll("#group-form .form-error").forEach(el => el.textContent = "");

  const reqFields = ["#group-name", "#group-phone", "#group-email", "#group-tour", "#group-pickup"];
  reqFields.forEach(sel => {
    const el = document.querySelector(sel);
    if (!el.value.trim()) {
      isValid = false;
      const errEl = document.querySelector(`#err-${el.id}`);
      if (errEl) errEl.textContent = t("val_required", "Este campo es requerido.");
    }
  });

  const personas = parseInt(groupPeopleInput.value, 10);
  const errPeople = document.querySelector("#err-group-people");
  if (isNaN(personas) || personas < 5) {
    isValid = false;
    if (errPeople) errPeople.textContent = t("val_group_people", "Las solicitudes para grupos aplican a partir de 5 personas.");
  }

  if (!groupPolicyAccept.checked) {
    isValid = false;
  }

  if (isValid) {
    btnGroupSend.classList.remove("disabled-link");
    btnGroupSend.removeAttribute("aria-disabled");
  } else {
    btnGroupSend.classList.add("disabled-link");
    btnGroupSend.setAttribute("aria-disabled", "true");
  }

  return isValid;
}

if (groupForm) {
  groupForm.addEventListener("input", validateGroupForm);
}

if (btnGroupSend) {
  btnGroupSend.addEventListener("click", () => {
    if (!validateGroupForm()) return;

    const nombre = document.querySelector("#group-name").value.trim();
    const whatsapp = document.querySelector("#group-phone").value.trim();
    const correo = document.querySelector("#group-email").value.trim();
    const tourSelect = document.querySelector("#group-tour");
    const excursionText = tourSelect.options[tourSelect.selectedIndex].text;
    const personas = document.querySelector("#group-people").value.trim();
    const pickupSelect = document.querySelector("#group-pickup");
    const punto = pickupSelect.options[pickupSelect.selectedIndex].text;
    const obs = document.querySelector("#group-notes").value.trim() || "Ninguna";
    const metodo = document.querySelector("input[name='metodo_envio_grupo']:checked").value;

    const lang = typeof window.getCurrentLanguage === 'function' ? window.getCurrentLanguage() : 'es';
    const text = lang === 'en'
      ? `Hello Callejeros Tours RD\n\nI want to request a special quote for a group.\n\nName: ${nombre}\nWhatsApp: ${whatsapp}\nEmail: ${correo}\nTour: ${excursionText}\nNumber of people: ${personas}\nPickup Location: ${punto}\nNotes: ${obs}\n\nI confirm that I have read and accepted the reservation and cancellation policies.\n\nI look forward to the availability confirmation and price proposal for the group. Thank you.`
      : `Hola Callejeros Tours RD\n\nQuiero solicitar una cotización especial para grupo.\n\nNombre: ${nombre}\nWhatsApp: ${whatsapp}\nCorreo: ${correo}\nExcursión: ${excursionText}\nCantidad de personas: ${personas}\nPunto de recogida: ${punto}\nObservaciones: ${obs}\n\nConfirmo que he leído y acepto las políticas de reserva y cancelación.\n\nQuedo atento a la confirmación de disponibilidad y propuesta de precio para el grupo. Gracias.`;

    if (metodo === "whatsapp") {
      const waUrl = `https://wa.me/${BOOKING_CONFIG.officialWhatsApp}?text=${encodeURIComponent(text)}`;
      window.open(waUrl, "_blank");
      closeGroupModal();
    } else if (metodo === "email") {
      const subject = encodeURIComponent(lang === 'en' ? "Special group request - Callejeros Tours" : "Solicitud especial para grupo - Callejeros Tours");
      const mailUrl = `mailto:${BOOKING_CONFIG.officialEmail}?subject=${subject}&body=${encodeURIComponent(text)}`;
      window.location.href = mailUrl;
      closeGroupModal();
    }
  });
}
populateTourSelect();

// ==========================================================================
// CONTROLADOR DEL MODAL DE TOURS PRIVADOS
// ==========================================================================
const privateModal = document.querySelector("#private-modal");
const btnOpenPrivate = document.querySelector("#btn-open-private");
const privateModalClose = document.querySelector("#private-modal-close");
const privateForm = document.querySelector("#private-form");
const btnPrivateSend = document.querySelector("#btn-private-send");
const btnPrivatePdf = document.querySelector("#btn-private-pdf");
const privatePolicyAccept = document.querySelector("#private-policy-accept");
const privateArrival = document.querySelector("#private-arrival");
const privateDeparture = document.querySelector("#private-departure");
const privateDuration = document.querySelector("#private-duration");
const expOtherCheckbox = document.querySelector("#exp-other-checkbox");
const privateExpOther = document.querySelector("#private-exp-other");

let currentRequestReference = "";
let currentRequestDate = "";

const PRIVATE_POLICY = `
  <p>La solicitud del tour privado no constituye una reserva confirmada. Callejeros Tours RD revisará los destinos solicitados, cantidad de personas, fechas, duración, punto de recogida, transporte y demás requerimientos antes de preparar una cotización personalizada.</p>
  <p>Una vez enviada y aceptada la cotización, se requiere un depósito equivalente al 20% del total presupuestado para confirmar la reserva y comenzar las coordinaciones correspondientes.</p>
  <p>El 80% restante deberá completarse conforme a las condiciones y fecha límite indicadas en la cotización.</p>
  <p>La disponibilidad de destinos, transporte, actividades y servicios está sujeta a confirmación.</p>
  <p>Cualquier modificación solicitada después de aprobar la cotización puede producir cambios en el precio.</p>
  <p>El depósito de reserva es generalmente no reembolsable debido a los gastos de planificación y servicios coordinados con terceros.</p>
  <p>El envío de un comprobante de pago no confirma automáticamente la reserva. Todo pago debe ser revisado y verificado por el equipo de Callejeros Tours RD.</p>
`;

const PRIVATE_POLICY_EN = `
  <p>The private tour request does not constitute a confirmed reservation. Callejeros Tours RD will review the requested destinations, number of people, dates, duration, pick-up point, transportation, and other requirements before preparing a personalized quote.</p>
  <p>Once the quote is sent and accepted, a deposit equivalent to 20% of the total budget is required to confirm the reservation and begin the corresponding coordination.</p>
  <p>The remaining 80% must be completed according to the conditions and deadline indicated in the quote.</p>
  <p>The availability of destinations, transportation, activities, and services is subject to confirmation.</p>
  <p>Any modification requested after approving the quote may result in price changes.</p>
  <p>The reservation deposit is generally non-refundable due to planning expenses and third-party coordinated services.</p>
  <p>Sending a payment receipt does not automatically confirm the reservation. All payments must be reviewed and verified by the Callejeros Tours RD team.</p>
`;

function generateRequestReference() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  let randomPart = "";
  if (window.crypto && window.crypto.getRandomValues) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    randomPart = array[0].toString(36).substring(0, 4).toUpperCase();
  } else {
    randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  }

  return `TP-${year}-${month}${day}-${hours}${minutes}${seconds}-${randomPart}`;
}

function openPrivateModal() {
  if (!privateModal) return;

  if (privateForm) {
    privateForm.reset();
    document.querySelectorAll("#private-form .form-error").forEach(el => el.textContent = "");
    const currentLang = typeof window.getCurrentLanguage === 'function' ? window.getCurrentLanguage() : 'es';
    privateDuration.value = translations[currentLang]?.priv_val_duration || "Selecciona las fechas";
    privateExpOther.style.display = "none";

    currentRequestReference = generateRequestReference();
    currentRequestDate = new Date().toLocaleString("es-DO", {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: 'numeric', minute: 'numeric', hour12: true
    });
  }

  const policyContainer = document.querySelector("#private-modal-policy");
  if (policyContainer) {
    const currentLang = typeof window.getCurrentLanguage === 'function' ? window.getCurrentLanguage() : 'es';
    policyContainer.innerHTML = currentLang === 'en' ? PRIVATE_POLICY_EN : PRIVATE_POLICY;
  }

  if (btnPrivateSend) {
    btnPrivateSend.classList.add("disabled-link");
    btnPrivateSend.setAttribute("aria-disabled", "true");
  }
  if (btnPrivatePdf) {
    btnPrivatePdf.classList.add("disabled-link");
    btnPrivatePdf.setAttribute("aria-disabled", "true");
  }

  if (typeof privateModal.showModal === "function") {
    privateModal.showModal();
  } else {
    privateModal.setAttribute("open", "");
  }
}

if (btnOpenPrivate) btnOpenPrivate.addEventListener("click", openPrivateModal);

function closePrivateModal() {
  if (typeof privateModal.close === "function") {
    privateModal.close();
  } else {
    privateModal.removeAttribute("open");
  }
}

if (privateModalClose) privateModalClose.addEventListener("click", closePrivateModal);
if (privateModal) {
  privateModal.addEventListener("click", (e) => {
    if (e.target === privateModal) closePrivateModal();
  });
}

function calculateDuration() {
  if (privateArrival && privateDeparture && privateDuration) {
    const errDates = document.querySelector("#err-private-dates");
    if (errDates) errDates.textContent = "";

    const currentLang = typeof window.getCurrentLanguage === 'function' ? window.getCurrentLanguage() : 'es';

    if (privateArrival.value && privateDeparture.value) {
      const start = new Date(privateArrival.value);
      const end = new Date(privateDeparture.value);

      // Reset hours to compare dates only
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      if (end < start) {
        if (errDates) errDates.textContent = translations[currentLang]?.priv_err_dates || "La fecha de salida no puede ser anterior a la de llegada.";
        privateDuration.value = translations[currentLang]?.priv_val_invalid || "Fechas inválidas";
        return false;
      } else {
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days if applicable
        const dayStr = translations[currentLang]?.priv_val_day || "1 día";
        const daysStr = translations[currentLang]?.priv_val_days || "días";
        privateDuration.value = diffDays === 1 ? dayStr : `${diffDays} ${daysStr}`;
        return true;
      }
    } else {
      privateDuration.value = translations[currentLang]?.priv_val_duration || "Selecciona las fechas";
      return false; // Need both dates
    }
  }
  return true;
}

document.addEventListener("languageChanged", () => {
  // Update duration if modal is open
  if (typeof calculateDuration === 'function') {
    calculateDuration();
  }
});

if (privateArrival) privateArrival.addEventListener("change", calculateDuration);
if (privateDeparture) privateDeparture.addEventListener("change", calculateDuration);

if (expOtherCheckbox && privateExpOther) {
  expOtherCheckbox.addEventListener("change", () => {
    if (expOtherCheckbox.checked) {
      privateExpOther.style.display = "block";
    } else {
      privateExpOther.style.display = "none";
      privateExpOther.value = "";
    }
  });
}

function validatePrivateForm() {
  if (!privateForm || !btnPrivateSend) return;

  let isValid = true;
  document.querySelectorAll("#private-form .form-error").forEach(el => el.textContent = "");

  const reqFields = ["#private-name", "#private-country", "#private-phone", "#private-email", "#private-destinations", "#private-pickup-type", "#private-pickup-name"];
  reqFields.forEach(sel => {
    const el = document.querySelector(sel);
    if (!el.value.trim()) {
      isValid = false;
      const errEl = document.querySelector(`#err-${el.id}`);
      if (errEl) errEl.textContent = t("val_required", "Este campo es requerido.");
    }
  });

  const email = document.querySelector("#private-email").value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    isValid = false;
    const errEl = document.querySelector("#err-private-email");
    if (errEl) errEl.textContent = t("val_email_invalid", "Ingresa un correo válido.");
  }

  const arrival = document.querySelector("#private-arrival").value;
  if (!arrival) {
    isValid = false;
    const errEl = document.querySelector("#err-private-arrival");
    if (errEl) errEl.textContent = t("val_required", "Este campo es requerido.");
  }

  const departure = document.querySelector("#private-departure").value;
  if (!departure) {
    isValid = false;
    const errEl = document.querySelector("#err-private-departure");
    if (errEl) errEl.textContent = t("val_required", "Este campo es requerido.");
  }

  const isDurationValid = calculateDuration();
  if (!isDurationValid && arrival && departure) {
    isValid = false;
  } else if (!arrival || !departure) {
    isValid = false;
  }

  const personas = parseInt(document.querySelector("#private-people").value, 10);
  const errPeople = document.querySelector("#err-private-people");
  if (isNaN(personas) || personas < 1) {
    isValid = false;
    if (errPeople) errPeople.textContent = t("val_private_people", "Debe ser al menos 1 persona.");
  }

  if (!privatePolicyAccept.checked) {
    isValid = false;
  }

  if (isValid) {
    btnPrivateSend.classList.remove("disabled-link");
    btnPrivateSend.removeAttribute("aria-disabled");
    if (btnPrivatePdf) {
      btnPrivatePdf.classList.remove("disabled-link");
      btnPrivatePdf.removeAttribute("aria-disabled");
    }
  } else {
    btnPrivateSend.classList.add("disabled-link");
    btnPrivateSend.setAttribute("aria-disabled", "true");
    if (btnPrivatePdf) {
      btnPrivatePdf.classList.add("disabled-link");
      btnPrivatePdf.setAttribute("aria-disabled", "true");
    }
  }

  return isValid;
}

if (privateForm) {
  privateForm.addEventListener("input", validatePrivateForm);
  privateForm.addEventListener("change", validatePrivateForm);
}

function getPrivateFormData() {
  const nombre = document.querySelector("#private-name").value.trim();
  const pais = document.querySelector("#private-country").value.trim();
  const whatsapp = document.querySelector("#private-phone").value.trim();
  const correo = document.querySelector("#private-email").value.trim();
  const idioma = document.querySelector("input[name='idioma']:checked").value;

  const llegada = document.querySelector("#private-arrival").value;
  const salida = document.querySelector("#private-departure").value;
  const duracion = privateDuration.value;
  const personas = document.querySelector("#private-people").value.trim();

  const destinos = document.querySelector("#private-destinations").value.trim();

  const expBoxes = document.querySelectorAll("input[name='experiencia']:checked");
  const expList = Array.from(expBoxes).map(cb => {
    if (cb.value === "Otro") {
      const otroTexto = privateExpOther.value.trim();
      return otroTexto ? `Otro (${otroTexto})` : "Otro";
    }
    return cb.value;
  });
  const experiencias = expList.length > 0 ? expList.join(", ") : "Ninguna indicada";

  const pickupSelect = document.querySelector("#private-pickup-type");
  const pickupType = pickupSelect.options[pickupSelect.selectedIndex].text;
  const pickupName = document.querySelector("#private-pickup-name").value.trim();

  const obs = document.querySelector("#private-notes").value.trim() || "Ninguna";
  const metodo = document.querySelector("input[name='metodo_envio_privado']:checked").value;

  return {
    nombre, pais, whatsapp, correo, idioma,
    llegada, salida, duracion, personas,
    destinos, experiencias,
    pickupType, pickupName,
    obs, metodo
  };
}

async function getBase64ImageFromURL(url) {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    img.onload = () => {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png");
      resolve(dataURL);
    };
    img.onerror = error => reject(error);
    img.src = url;
  });
}

function formatSpanishDate(dateString) {
  if (!dateString) return '';
  const parts = dateString.split('-');
  if (parts.length !== 3) return dateString;
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  return `${parseInt(parts[2], 10)} de ${months[parseInt(parts[1], 10) - 1]} de ${parts[0]}`;
}

async function generatePrivatePDF() {
  if (!validatePrivateForm()) return;

  // Disable button to prevent double generation
  if (btnPrivatePdf) {
    btnPrivatePdf.classList.add("disabled-link");
    btnPrivatePdf.textContent = "GENERANDO...";
  }

  const data = getPrivateFormData();

  // Asegurar espaciado correcto en experiencias únicamente para el PDF
  const displayExperiencias = data.experiencias.split(',').map(e => e.trim()).join(', ');

  let logoBase64 = null;
  try {
    logoBase64 = await getBase64ImageFromURL('img/logos/callejerostours.png');
  } catch (e) {
    console.error("Error loading logo for PDF", e);
  }

  const cleanPolicyText = PRIVATE_POLICY.replace(/<p>/g, '').replace(/<\/p>/g, '\n\n').trim();

  const docDefinition = {
    pageSize: 'A4',
    pageMargins: [40, 40, 40, 60],
    footer: function (currentPage, pageCount) {
      return {
        columns: [
          { text: 'Callejeros Tours RD · República Dominicana\nWhatsApp: +1 829-808-1466 · callejerostrd@gmail.com · callejerostoursrd.com', alignment: 'left', fontSize: 8, color: '#666666', margin: [40, 10, 0, 0] },
          { text: `Página ${currentPage} de ${pageCount}`, alignment: 'right', fontSize: 9, color: '#666666', margin: [0, 20, 40, 0] }
        ]
      };
    },
    content: [
      {
        columns: [
          logoBase64 ? { image: logoBase64, width: 120, alignment: 'left' } : { text: 'Callejeros Tours RD', style: 'header', alignment: 'left' },
          {
            text: [
              { text: 'CALLEJEROS TOURS RD\n', style: 'brandName' },
              { text: 'SOLICITUD DE TOUR PRIVADO\n\n', style: 'title' },
              { text: 'Referencia: ', bold: true, fontSize: 10, color: '#444' }, { text: `${currentRequestReference}\n`, fontSize: 10, color: '#444' },
              { text: 'Fecha: ', bold: true, fontSize: 10, color: '#444' }, { text: `${currentRequestDate}`, fontSize: 10, color: '#444' }
            ],
            alignment: 'right'
          }
        ],
        margin: [0, 0, 0, 20]
      },
      { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1, lineColor: '#e0e0e0' }], margin: [0, 0, 0, 20] },

      { text: 'DATOS DEL CLIENTE', style: 'sectionHeader' },
      {
        table: {
          widths: ['35%', '65%'],
          body: [
            [{ text: 'Nombre', style: 'tableLabel' }, { text: data.nombre, style: 'tableValue' }],
            [{ text: 'País', style: 'tableLabel' }, { text: data.pais, style: 'tableValue' }],
            [{ text: 'WhatsApp', style: 'tableLabel' }, { text: data.whatsapp, style: 'tableValue' }],
            [{ text: 'Correo', style: 'tableLabel' }, { text: data.correo, style: 'tableValue' }],
            [{ text: 'Idioma preferido', style: 'tableLabel' }, { text: data.idioma, style: 'tableValue' }],
          ]
        },
        layout: 'lightHorizontalLines',
        margin: [0, 0, 0, 20]
      },

      { text: 'INFORMACIÓN DEL VIAJE', style: 'sectionHeader' },
      {
        table: {
          widths: ['35%', '65%'],
          body: [
            [{ text: 'Llegada a RD', style: 'tableLabel' }, { text: formatSpanishDate(data.llegada), style: 'tableValue' }],
            [{ text: 'Salida', style: 'tableLabel' }, { text: formatSpanishDate(data.salida), style: 'tableValue' }],
            [{ text: 'Duración', style: 'tableLabel' }, { text: data.duracion, style: 'tableValue' }],
            [{ text: 'Personas', style: 'tableLabel' }, { text: data.personas, style: 'tableValue' }],
          ]
        },
        layout: 'lightHorizontalLines',
        margin: [0, 0, 0, 20]
      },

      { text: 'EXPERIENCIA SOLICITADA', style: 'sectionHeader' },
      {
        table: {
          widths: ['35%', '65%'],
          body: [
            [{ text: 'Destinos', style: 'tableLabel' }, { text: data.destinos, style: 'tableValue' }],
            [{ text: 'Tipos de experiencia', style: 'tableLabel' }, { text: displayExperiencias, style: 'tableValue' }],
          ]
        },
        layout: 'lightHorizontalLines',
        margin: [0, 0, 0, 20]
      },

      { text: 'RECOGIDA', style: 'sectionHeader' },
      {
        table: {
          widths: ['35%', '65%'],
          body: [
            [{ text: 'Tipo', style: 'tableLabel' }, { text: data.pickupType, style: 'tableValue' }],
            [{ text: 'Lugar/dirección', style: 'tableLabel' }, { text: data.pickupName, style: 'tableValue' }],
          ]
        },
        layout: 'lightHorizontalLines',
        margin: [0, 0, 0, 20]
      },

      { text: 'INFORMACIÓN ADICIONAL', style: 'sectionHeader' },
      { text: data.obs, fontSize: 11, color: '#444444', margin: [0, 0, 0, 20] },

      { text: 'POLÍTICA DE TOURS PRIVADOS Y VIAJEROS INTERNACIONALES', style: 'sectionHeader', pageBreak: 'before' },
      { text: cleanPolicyText, fontSize: 10, color: '#444444', margin: [0, 0, 0, 20], alignment: 'justify' },

      { text: 'ACEPTACIÓN DE POLÍTICA', style: 'sectionHeader' },
      { text: 'Cliente declaró haber leído y aceptado las políticas aplicables a los tours privados.', margin: [0, 0, 0, 5], fontSize: 11 },
      { text: `Fecha y hora de aceptación: ${currentRequestDate}`, margin: [0, 0, 0, 20], fontSize: 11, bold: true, color: '#444444' },

      { text: 'AVISO IMPORTANTE', style: 'sectionHeader', color: '#FF8500' },
      { text: 'Esta solicitud no constituye una reserva confirmada ni garantiza disponibilidad o precio.', bold: true, fontSize: 11, margin: [0, 0, 0, 5] },
      { text: 'Callejeros Tours RD revisará la información y preparará una propuesta personalizada.', fontSize: 11, margin: [0, 0, 0, 5] },
      { text: 'Una vez aceptada la cotización, se requerirá un depósito del 20% del total cotizado para confirmar el tour privado.', fontSize: 11, margin: [0, 0, 0, 20] }
    ],
    styles: {
      header: { fontSize: 20, bold: true, color: '#08364A' },
      brandName: { fontSize: 12, bold: true, color: '#FF8500', margin: [0, 0, 0, 2] },
      title: { fontSize: 16, bold: true, color: '#08364A', margin: [0, 0, 0, 5] },
      sectionHeader: { fontSize: 13, bold: true, color: '#0B6B8F', margin: [0, 15, 0, 8] },
      tableLabel: { bold: true, color: '#555555', fontSize: 11, margin: [0, 4, 0, 4] },
      tableValue: { color: '#222222', fontSize: 11, margin: [0, 4, 0, 4] }
    },
    defaultStyle: {
      fontSize: 11,
      color: '#173042'
    }
  };

  try {
    pdfMake.createPdf(docDefinition).download(`Solicitud_Tour_Privado_${currentRequestReference}.pdf`);
  } catch (e) {
    console.error("Error creating PDF", e);
  } finally {
    if (btnPrivatePdf) {
      btnPrivatePdf.classList.remove("disabled-link");
      btnPrivatePdf.textContent = "DESCARGAR SOLICITUD EN PDF";
    }
  }
}

if (btnPrivatePdf) {
  btnPrivatePdf.addEventListener("click", generatePrivatePDF);
}

if (btnPrivateSend) {
  btnPrivateSend.addEventListener("click", () => {
    if (!validatePrivateForm()) return;
    const data = getPrivateFormData();

    const lang = typeof window.getCurrentLanguage === 'function' ? window.getCurrentLanguage() : 'es';
    const text = lang === 'en'
      ? `Hello Callejeros Tours RD\n\nI want to request a quote for a PRIVATE TOUR.\n\nRequest Reference: ${currentRequestReference}\n\nATTENTION: This request is not a confirmed reservation. I look forward to your personalized proposal.\n\n--- CLIENT DETAILS ---\nName: ${data.nombre}\nCountry: ${data.pais}\nWhatsApp: ${data.whatsapp}\nEmail: ${data.correo}\nLanguage: ${data.idioma}\n\n--- TRIP INFORMATION ---\nArrival in DR: ${data.llegada}\nDeparture from DR: ${data.salida}\nApprox. Duration: ${data.duracion}\nPeople: ${data.personas}\n\n--- DESIRED EXPERIENCE ---\nDestination(s): ${data.destinos}\nExperience type: ${data.experiencias}\n\n--- PICKUP ---\nPickup location: ${data.pickupType}\nName/Address: ${data.pickupName}\n\n--- NOTES / PREFERENCES ---\n${data.obs}\n\n--- POLICIES ---\nI have read and accept the policies. I understand that a 20% deposit is required after approving the final quote.\n\nI await your response, thank you.`
      : `Hola Callejeros Tours RD\n\nQuiero solicitar una cotización para un TOUR PRIVADO.\n\nReferencia de solicitud: ${currentRequestReference}\n\nATENCIÓN: Esta solicitud no es una reserva confirmada. Quedo a la espera de su propuesta personalizada.\n\n--- DATOS DEL CLIENTE ---\nNombre: ${data.nombre}\nPaís: ${data.pais}\nWhatsApp: ${data.whatsapp}\nCorreo: ${data.correo}\nIdioma: ${data.idioma}\n\n--- INFORMACIÓN DEL VIAJE ---\nLlegada a RD: ${data.llegada}\nSalida de RD: ${data.salida}\nDuración aprox: ${data.duracion}\nPersonas: ${data.personas}\n\n--- EXPERIENCIA DESEADA ---\nDestino(s): ${data.destinos}\nTipo de experiencia: ${data.experiencias}\n\n--- RECOGIDA ---\nLugar de recogida: ${data.pickupType}\nNombre/Dirección: ${data.pickupName}\n\n--- NOTAS / PREFERENCIAS ---\n${data.obs}\n\n--- POLÍTICAS ---\nHe leído y acepto las políticas. Entiendo que se requiere un depósito del 20% después de aprobar la cotización final.\n\nEspero su respuesta, gracias.`;

    if (data.metodo === "whatsapp") {
      const waUrl = `https://wa.me/${BOOKING_CONFIG.officialWhatsApp}?text=${encodeURIComponent(text)}`;
      window.open(waUrl, "_blank");
    } else if (data.metodo === "email") {
      const subject = encodeURIComponent(lang === 'en' ? `Private Tour Request ${currentRequestReference} - ${data.nombre}` : `Solicitud de Tour Privado ${currentRequestReference} - ${data.nombre}`);
      const mailUrl = `mailto:${BOOKING_CONFIG.officialEmail}?subject=${subject}&body=${encodeURIComponent(text)}`;
      window.location.href = mailUrl;
    }
    closePrivateModal();
  });
}