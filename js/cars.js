// js/cars.js

const vehicles = [
  {
    id: "CAR-0001",
    brand: "Hyundai",
    model: "Cantus (Creta)",
    year: 2021,
    category: "car_cat_jeepeta",
    transmission: "car_trans_auto",
    airConditioning: true,
    image: "/img/webp/car-0001.webp",
    alt_key: "car_alt_car_0001"
  },
  {
    id: "CAR-0002",
    brand: "Honda",
    model: "CR-V",
    year: 2022,
    category: "car_cat_jeepeta",
    transmission: "car_trans_auto",
    airConditioning: true,
    image: "/img/webp/car-0002.webp",
    alt_key: "car_alt_car_0002"
  },
  {
    id: "CAR-0003",
    brand: "Kia",
    model: "Seltos",
    year: 2021,
    category: "car_cat_jeepeta",
    transmission: "car_trans_auto",
    airConditioning: true,
    image: "/img/webp/car-0003.webp",
    alt_key: "car_alt_car_0003"
  },
  {
    id: "CAR-0004",
    brand: "Kia",
    model: "Sportage",
    year: 2023,
    category: "car_cat_jeepeta",
    transmission: "car_trans_auto",
    airConditioning: true,
    image: "/img/webp/car-0004.webp",
    alt_key: "car_alt_car_0004"
  }
];

function renderVehicles() {
  const select = document.getElementById('car-req-vehicle-pref');
  if (!select) return;

  // Clear all options except the first placeholder
  while (select.options.length > 1) {
    select.remove(1);
  }

  // Populate from vehicles array
  vehicles.forEach(car => {
    const opt = document.createElement('option');
    opt.value = car.id;
    opt.textContent = `${car.brand} ${car.model} (${car.year})`;
    select.appendChild(opt);
  });

  // Add "Any" and "Other" options
  const optAny = document.createElement('option');
  optAny.value = 'any';
  optAny.setAttribute('data-i18n', 'car_opt_any');
  optAny.textContent = getLocalizedValue(translations, getCurrentLanguage())?.['car_opt_any'] || 'Cualquier vehículo disponible';
  select.appendChild(optAny);

  const optOther = document.createElement('option');
  optOther.value = 'other';
  optOther.setAttribute('data-i18n', 'car_opt_other');
  optOther.textContent = getLocalizedValue(translations, getCurrentLanguage())?.['car_opt_other'] || 'Otro';
  select.appendChild(optOther);
}

function openCarRequest() {
  const modal = document.getElementById('car-request-modal');
  const title = document.getElementById('car-request-vehicle-name');
  title.textContent = "";

  // Show form, hide review
  document.getElementById('car-request-form').style.display = 'block';
  document.getElementById('car-request-review').style.display = 'none';

  modal.showModal();
}

function handleCarFormVisibility() {
  const prefSelect = document.getElementById('car-req-vehicle-pref');
  const prefOther = document.getElementById('car-req-vehicle-other');
  const pickupSelect = document.getElementById('car-req-pickup-loc');
  const pickupExtra = document.getElementById('car-req-pickup-extra');
  const dropoffSelect = document.getElementById('car-req-dropoff-loc');
  const dropoffExtra = document.getElementById('car-req-dropoff-extra');

  prefSelect.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
      prefOther.style.display = 'block';
      prefOther.required = true;
    } else {
      prefOther.style.display = 'none';
      prefOther.required = false;
    }
  });

  pickupSelect.addEventListener('change', (e) => {
    const val = e.target.value;
    if (val === 'airport' || val === 'hotel' || val === 'other') {
      pickupExtra.style.display = 'block';
      pickupExtra.required = true;
    } else {
      pickupExtra.style.display = 'none';
      pickupExtra.required = false;
    }
  });

  dropoffSelect.addEventListener('change', (e) => {
    const val = e.target.value;
    if (val === 'airport' || val === 'hotel' || val === 'other') {
      dropoffExtra.style.display = 'block';
      dropoffExtra.required = true;
    } else {
      dropoffExtra.style.display = 'none';
      dropoffExtra.required = false;
    }
  });
}

function renderCarReview() {
  const lang = getCurrentLanguage();
  const formData = new FormData(document.getElementById('car-request-form'));
  
  const prefVal = formData.get('vehicle_pref');
  let prefStr = '';
  if (prefVal === 'any') {
    prefStr = lang === 'es' ? 'Cualquier vehículo disponible' : 'Any available vehicle';
  } else if (prefVal === 'other') {
    const otherVal = formData.get('vehicle_other') || '';
    prefStr = `${lang === 'es' ? 'Otro' : 'Other'}: ${otherVal}`;
  } else {
    const car = vehicles.find(v => v.id === prefVal);
    if (car) {
      prefStr = `${car.brand} ${car.model} (${car.year})`;
    } else {
      prefStr = prefVal;
    }
  }

  const container = document.getElementById('car-summary-content');

  // Helper to translate values
  const t = (key) => getLocalizedValue(translations, lang)?.[key] || key;

  const pickupLocVal = formData.get('lugar_recogida');
  const dropoffLocVal = formData.get('lugar_devolucion');

  const getLocStr = (val, extra) => {
    if (val === 'santo_domingo') return t('car_loc_sd');
    if (val === 'airport') return `${t('car_loc_airport')} - ${extra}`;
    if (val === 'hotel') return `${t('car_loc_hotel')} - ${extra}`;
    return extra;
  };

  const driverWho = formData.get('quien_conduce') === 'self' ? t('car_opt_self') : t('car_opt_other_driver');
  const hasLicense = formData.get('licencia_vigente') === 'yes' ? t('car_opt_yes') : t('car_opt_no');
  const acceptsAlt = formData.get('acepta_alternativa') === 'yes' ? t('car_opt_yes') : t('car_opt_no');

  container.innerHTML = `
    <div class="summary-row">
      <span class="summary-label" data-i18n="car_sum_pref">${t('car_sum_pref')}</span>
      <span class="summary-value highlight">${prefStr}</span>
    </div>
    <div class="summary-row">
      <span class="summary-label" data-i18n="car_sum_client">${t('car_sum_client')}</span>
      <span class="summary-value">${formData.get('nombre')} (${formData.get('pais') || '-'})</span>
    </div>
    <div class="summary-row">
      <span class="summary-label" data-i18n="car_sum_contact">${t('car_sum_contact')}</span>
      <span class="summary-value">${formData.get('whatsapp')} | ${formData.get('correo')}</span>
    </div>
    <div class="summary-row">
      <span class="summary-label" data-i18n="car_sum_pickup">${t('car_sum_pickup')}</span>
      <span class="summary-value">${formData.get('fecha_recogida')} ${formData.get('hora_recogida')} | ${getLocStr(pickupLocVal, formData.get('lugar_recogida_extra'))}</span>
    </div>
    <div class="summary-row">
      <span class="summary-label" data-i18n="car_sum_dropoff">${t('car_sum_dropoff')}</span>
      <span class="summary-value">${formData.get('fecha_devolucion')} ${formData.get('hora_devolucion')} | ${getLocStr(dropoffLocVal, formData.get('lugar_devolucion_extra'))}</span>
    </div>
    <div class="summary-row">
      <span class="summary-label" data-i18n="car_sum_passengers">${t('car_sum_passengers')}</span>
      <span class="summary-value">${formData.get('pasajeros')}</span>
    </div>
    <div class="summary-row">
      <span class="summary-label" data-i18n="car_sum_driver">${t('car_sum_driver')}</span>
      <span class="summary-value">${driverWho}</span>
    </div>
    <div class="summary-row">
      <span class="summary-label" data-i18n="car_sum_age">${t('car_sum_age')}</span>
      <span class="summary-value">${formData.get('edad_conductor')}</span>
    </div>
    <div class="summary-row">
      <span class="summary-label" data-i18n="car_sum_license">${t('car_sum_license')}</span>
      <span class="summary-value">${hasLicense} (${formData.get('pais_licencia') || '-'})</span>
    </div>
    <div class="summary-row">
      <span class="summary-label" data-i18n="car_sum_alternative">${t('car_sum_alternative')}</span>
      <span class="summary-value">${acceptsAlt}</span>
    </div>
    <div class="summary-row">
      <span class="summary-label" data-i18n="car_sum_comments">${t('car_sum_comments')}</span>
      <span class="summary-value" style="font-weight: 400; max-width: 300px;">${formData.get('comentarios') || '-'}</span>
    </div>
  `;
}

function handleCarSubmit() {
  const form = document.getElementById('car-request-form');
  const review = document.getElementById('car-request-review');
  const btnEdit = document.getElementById('btn-car-edit');
  const btnSendWa = document.getElementById('btn-car-send-wa');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate DateTime: Date + Time
    const pickDateStr = form.querySelector('[name="fecha_recogida"]').value;
    const pickTimeStr = form.querySelector('[name="hora_recogida"]').value;
    const dropDateStr = form.querySelector('[name="fecha_devolucion"]').value;
    const dropTimeStr = form.querySelector('[name="hora_devolucion"]').value;
    const errDates = document.getElementById('err-car-dates');

    if (pickDateStr && pickTimeStr && dropDateStr && dropTimeStr) {
      const pickDateTime = new Date(`${pickDateStr}T${pickTimeStr}`);
      const dropDateTime = new Date(`${dropDateStr}T${dropTimeStr}`);

      if (dropDateTime <= pickDateTime) {
        errDates.textContent = getCurrentLanguage() === 'es'
          ? "La fecha/hora de devolución debe ser posterior a la recogida."
          : "Drop-off date/time must be after pick-up.";
        return;
      } else {
        errDates.textContent = "";
      }
    }

    // Pass HTML5 Validation
    if (!form.checkValidity()) {
      return;
    }

    form.style.display = 'none';
    review.style.display = 'block';

    renderCarReview();
  });

  btnEdit.addEventListener('click', () => {
    review.style.display = 'none';
    form.style.display = 'block';
  });

  btnSendWa.addEventListener('click', () => {
    const declaration = document.getElementById('car-req-declaration');
    const errDecl = document.getElementById('err-car-declaration');
    if (!declaration.checked) {
      errDecl.textContent = getCurrentLanguage() === 'es' ? "Debes confirmar que los datos son correctos." : "You must confirm the details are correct.";
      return;
    }
    errDecl.textContent = '';

    const lang = getCurrentLanguage();
    const formData = new FormData(form);

    const getLocStr = (val, extra) => {
      const t = (key) => getLocalizedValue(translations, lang)?.[key] || key;
      if (val === 'santo_domingo') return t('car_loc_sd');
      if (val === 'airport') return `${t('car_loc_airport')} - ${extra}`;
      if (val === 'hotel') return `${t('car_loc_hotel')} - ${extra}`;
      return extra;
    };

    const prefVal = formData.get('vehicle_pref');
    let prefStrEs = '';
    let prefStrEn = '';
    if (prefVal === 'any') {
      prefStrEs = 'Cualquier vehículo disponible';
      prefStrEn = 'Any available vehicle';
    } else if (prefVal === 'other') {
      const otherVal = formData.get('vehicle_other') || '';
      prefStrEs = `Otro: ${otherVal}`;
      prefStrEn = `Other: ${otherVal}`;
    } else {
      const car = vehicles.find(v => v.id === prefVal);
      if (car) {
        prefStrEs = `${car.brand} ${car.model} (${car.year})`;
        prefStrEn = prefStrEs;
      } else {
        prefStrEs = prefVal;
        prefStrEn = prefVal;
      }
    }

    let text = "";
    if (lang === 'es') {
      text = `🚙 SOLICITUD DE ALQUILER DE VEHÍCULO

Vehículo de preferencia: ${prefStrEs}
Cliente: ${formData.get('nombre')}
WhatsApp: ${formData.get('whatsapp')}
Correo: ${formData.get('correo')}
País: ${formData.get('pais')}
Edad del conductor: ${formData.get('edad_conductor')}

Fecha de recogida: ${formData.get('fecha_recogida')}
Hora: ${formData.get('hora_recogida')}
Lugar: ${getLocStr(formData.get('lugar_recogida'), formData.get('lugar_recogida_extra'))}

Fecha de devolución: ${formData.get('fecha_devolucion')}
Hora: ${formData.get('hora_devolucion')}
Lugar: ${getLocStr(formData.get('lugar_devolucion'), formData.get('lugar_devolucion_extra'))}

Pasajeros: ${formData.get('pasajeros')}
Conductor: ${formData.get('quien_conduce') === 'self' ? 'Yo' : 'Otra persona'}
Licencia vigente: ${formData.get('licencia_vigente') === 'yes' ? 'Sí' : 'No'}
País de licencia: ${formData.get('pais_licencia') || 'N/A'}
Acepta alternativa similar: ${formData.get('acepta_alternativa') === 'yes' ? 'Sí' : 'No'}
Comentarios: ${formData.get('comentarios') || 'N/A'}

Entiendo que esta solicitud está sujeta a disponibilidad, precio final y confirmación. Solicito confirmar disponibilidad, precio final y condiciones aplicables.`;
    } else {
      text = `🚙 CAR RENTAL REQUEST

Preferred vehicle: ${prefStrEn}
Client: ${formData.get('nombre')}
WhatsApp: ${formData.get('whatsapp')}
Email: ${formData.get('correo')}
Country: ${formData.get('pais')}
Driver's age: ${formData.get('edad_conductor')}

Pick-up Date: ${formData.get('fecha_recogida')}
Time: ${formData.get('hora_recogida')}
Location: ${getLocStr(formData.get('lugar_recogida'), formData.get('lugar_recogida_extra'))}

Drop-off Date: ${formData.get('fecha_devolucion')}
Time: ${formData.get('hora_devolucion')}
Location: ${getLocStr(formData.get('lugar_devolucion'), formData.get('lugar_devolucion_extra'))}

Passengers: ${formData.get('pasajeros')}
Driver: ${formData.get('quien_conduce') === 'self' ? 'Me' : 'Someone else'}
Valid license: ${formData.get('licencia_vigente') === 'yes' ? 'Yes' : 'No'}
License country: ${formData.get('pais_licencia') || 'N/A'}
Accepts similar alternative: ${formData.get('acepta_alternativa') === 'yes' ? 'Yes' : 'No'}
Comments: ${formData.get('comentarios') || 'N/A'}

I understand that this request is subject to availability, final price, and confirmation. Please confirm availability, final pricing, and applicable terms.`;
    }

    const encodedText = encodeURIComponent(text);
    // Reuse officialWhatsApp from app.js if it exists, fallback just in case
    const phone = (typeof BOOKING_CONFIG !== 'undefined') ? BOOKING_CONFIG.officialWhatsApp : "18298081466";
    window.open(`https://wa.me/${phone}?text=${encodedText}`, "_blank");
  });
}

function handleCarModals() {
  const detailsModal = document.getElementById('car-details-modal');
  const requestModal = document.getElementById('car-request-modal');
  const termsModal = document.getElementById('car-terms-modal');
  
  document.getElementById('car-details-close')?.addEventListener('click', () => detailsModal.close());
  document.getElementById('car-request-close')?.addEventListener('click', () => requestModal.close());
  document.getElementById('car-terms-close')?.addEventListener('click', () => termsModal.close());
  document.getElementById('btn-car-terms')?.addEventListener('click', () => termsModal.showModal());
  document.getElementById('btn-car-terms-ok')?.addEventListener('click', () => termsModal.close());

  // Close on outside click or ESC (native behavior for <dialog>)
  [detailsModal, requestModal, termsModal].forEach(modal => {
    if(!modal) return;
    modal.addEventListener('click', (e) => {
      const rect = modal.getBoundingClientRect();
      const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!isInDialog) {
        modal.close();
      }
    });
  });
}

// Ensure the review pane re-renders on language change
document.addEventListener('languageChanged', () => {
  renderVehicles();
  updateCarouselAltTexts();
  const review = document.getElementById('car-request-review');
  if (review && review.style.display === 'block') {
    renderCarReview();
  }
});

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderVehicles();
  initCarImageCarousel();
  handleCarFormVisibility();
  handleCarSubmit();
  handleCarModals();
});

function initCarImageCarousel() {
  const container = document.getElementById('car-carousel-media');
  if (!container) return;

  const validVehicles = vehicles.filter(v => v.image);
  if (validVehicles.length === 0) return;

  const lang = getCurrentLanguage();

  validVehicles.forEach((car, index) => {
    const img = document.createElement('img');
    img.src = car.image;
    img.className = 'car-slide';
    if (index === 0) img.classList.add('active');
    
    img.setAttribute('data-i18n-alt', car.alt_key);
    
    // Safely get translation
    let altText = car.alt_key;
    try {
      if (typeof translations !== 'undefined') {
        const localizedObj = getLocalizedValue(translations, lang);
        if (localizedObj && localizedObj[car.alt_key]) {
          altText = localizedObj[car.alt_key];
        }
      }
    } catch (e) {
      console.warn("Translation not ready yet for carousel alt text");
    }
    img.alt = altText;
    
    container.appendChild(img);
  });

  if (validVehicles.length <= 1) return;

  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mql.matches) return;

  let currentIndex = 0;
  const slides = container.querySelectorAll('.car-slide');

  setInterval(() => {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
  }, 5000);
}

function updateCarouselAltTexts() {
  const lang = getCurrentLanguage();
  const imgs = document.querySelectorAll('#car-carousel-media .car-slide');
  imgs.forEach(img => {
    const key = img.getAttribute('data-i18n-alt');
    if (key && translations[lang] && translations[lang][key]) {
      img.alt = translations[lang][key];
    }
  });
}
