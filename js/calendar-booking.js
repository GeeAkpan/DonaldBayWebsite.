/* ==========================================================================
   Donalds Bay Limited — Interactive Calendar Booking & Consultation Engine
   ========================================================================== */

(function() {
  // Calendar State
  let currentDate = new Date();
  let selectedDate = new Date();
  // If today is Sunday, default to next day (Monday)
  if (selectedDate.getDay() === 0) {
    selectedDate.setDate(selectedDate.getDate() + 1);
  }
  let selectedTimeSlot = "10:30 AM (WAT)";

  const TIME_SLOTS = [
    { time: "09:00 AM (WAT)", label: "Early Morning Briefing" },
    { time: "11:30 AM (WAT)", label: "Technical Review" },
    { time: "02:00 PM (WAT)", label: "Afternoon Assessment" },
    { time: "04:00 PM (WAT)", label: "Executive Consultation" },
    { time: "05:30 PM (WAT)", label: "Twilight Session" }
  ];

  const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Inject Booking Modal UI into DOM
  const modalHTML = `
    <dialog class="booking-dialog" id="calendarBookingModal" aria-label="Schedule Technical Consultation">
      <div class="booking-box">
        <button class="booking-close" type="button" id="closeCalendarModalBtn" aria-label="Close Booking Modal">&times;</button>
        
        <div class="booking-container" id="bookingMainStage">
          <!-- Left Column: Interactive Calendar & Slot Picker -->
          <div class="booking-left">
            <div class="booking-badge-header">
              <span class="booking-live-dot"></span>
              <span>DIRECT EXECUTIVE BOOKING &middot; WAT TIMEZONE</span>
            </div>
            <h3 class="booking-title">Select Consultation Date &amp; Time</h3>
            <p class="booking-desc">Choose a date and meeting slot with our resident chief engineers and project estimation board.</p>

            <!-- Calendar Widget -->
            <div class="cal-widget">
              <div class="cal-nav">
                <button type="button" class="cal-nav-btn" id="calPrevMonthBtn" aria-label="Previous Month">&lsaquo;</button>
                <h4 class="cal-month-title" id="calMonthTitle">September 2026</h4>
                <button type="button" class="cal-nav-btn" id="calNextMonthBtn" aria-label="Next Month">&rsaquo;</button>
              </div>

              <div class="cal-weekdays">
                <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
              </div>

              <div class="cal-days-grid" id="calDaysGrid">
                <!-- Populated dynamically via JS -->
              </div>
            </div>

            <!-- Time Slots -->
            <div class="slots-section">
              <div class="slots-label">Available Slots for <strong id="slotSelectedDateLabel">Selected Date</strong>:</div>
              <div class="slots-grid" id="calSlotsGrid">
                <!-- Populated dynamically via JS -->
              </div>
            </div>
          </div>

          <!-- Right Column: Project & Client Scope Form -->
          <div class="booking-right">
            <div class="booking-form-header">
              <span class="label" style="color:var(--accent);">Step 2 / Technical Scope</span>
              <h4>Consultation Details</h4>
            </div>

            <form id="consultationBookingForm" class="booking-form">
              <div class="bform-group">
                <label for="bClientName">Full Name / Corporate Entity *</label>
                <input type="text" id="bClientName" class="bform-control" placeholder="e.g. Engr. Adebayo / Apex Infra Ltd" required>
              </div>

              <div class="bform-row-2">
                <div class="bform-group">
                  <label for="bClientEmail">Corporate Email *</label>
                  <input type="email" id="bClientEmail" class="bform-control" placeholder="director@company.com" required>
                </div>
                <div class="bform-group">
                  <label for="bClientPhone">Phone / WhatsApp *</label>
                  <input type="tel" id="bClientPhone" class="bform-control" placeholder="+234 800 000 0000" required>
                </div>
              </div>

              <div class="bform-row-2">
                <div class="bform-group">
                  <label for="bServiceType">Discipline / Sector *</label>
                  <select id="bServiceType" class="bform-control" required>
                    <option value="Road Construction">Road Construction &amp; Highways</option>
                    <option value="Project Management" selected>Project Management (EPC &amp; BoQ)</option>
                    <option value="Real Estate">Real Estate &amp; Building Construction</option>
                    <option value="Tender & RFP">Public Infrastructure Tender &amp; RFP</option>
                  </select>
                </div>
                <div class="bform-group">
                  <label for="bMeetingFormat">Meeting Format *</label>
                  <select id="bMeetingFormat" class="bform-control" required>
                    <option value="Google Meet (Virtual)" selected>Virtual Video Conference (Google Meet / Zoom)</option>
                    <option value="Headquarters Boardroom">Lagos Headquarters Boardroom</option>
                    <option value="On-Site Inspection">On-Site Technical Inspection</option>
                  </select>
                </div>
              </div>

              <div class="bform-row-2">
                <div class="bform-group">
                  <label for="bLocation">Project / Site Location *</label>
                  <input type="text" id="bLocation" class="bform-control" placeholder="e.g. Lagos Coastal Corridor / Abuja CBD" required>
                </div>
                <div class="bform-group">
                  <label for="bBudgetTier">Estimated Budget Scale</label>
                  <select id="bBudgetTier" class="bform-control">
                    <option value="₦1B – ₦10B ($1M – $10M)" selected>₦1B – ₦10B ($1M – $10M)</option>
                    <option value="₦250M – ₦1B ($250K – $1M)">₦250M – ₦1B ($250K – $1M)</option>
                    <option value="₦50M – ₦250M ($50K – $250K)">₦50M – ₦250M ($50K – $250K)</option>
                    <option value="₦10B+ Mega Infrastructure">₦10B+ Mega Infrastructure</option>
                  </select>
                </div>
              </div>

              <div class="bform-group">
                <label for="bNotes">Project Scope &amp; Technical Agenda</label>
                <textarea id="bNotes" class="bform-control" rows="3" placeholder="Specify technical objectives, soil/pavement conditions, BoQ stage, or target completion dates..."></textarea>
              </div>

              <!-- Summary Pill -->
              <div class="booking-summary-bar">
                <div class="bsum-icon">📅</div>
                <div class="bsum-info">
                  <div class="bsum-date" id="bsumDisplayDate">Loading...</div>
                  <div class="bsum-sub">Slot requested &middot; Pending Executive Validation</div>
                </div>
              </div>

              <button type="submit" class="btn btn--primary" style="width:100%; padding:1rem; font-size:1rem; justify-content:center;">
                Schedule &amp; Submit Meeting to Executive Admin &rarr;
              </button>
            </form>
          </div>
        </div>

        <!-- Success Confirmation View -->
        <div class="booking-success-view" id="bookingSuccessStage" style="display:none;">
          <div class="bsuccess-card">
            <div class="bsuccess-icon">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#00E599" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <span class="status-pill status-pending" style="margin-top:1rem; display:inline-block; font-size:0.82rem;">STATUS: PENDING EXECUTIVE VALIDATION</span>
            <h3 style="font-size:1.8rem; color:var(--white); margin:0.75rem 0 0.25rem;">Technical Consultation Scheduled</h3>
            <p style="color:var(--on-petrol-mid); max-width:55ch; margin:0 auto 1.5rem; font-size:0.95rem;">
              Your consultation request has been logged into the Executive Portal. Our Directorate of Planning will validate your meeting and dispatch calendar invitations.
            </p>

            <div class="bsuccess-details" id="bsuccessDetails">
              <!-- Rendered via JS -->
            </div>

            <div style="display:flex; flex-wrap:wrap; gap:1rem; justify-content:center; margin-top:2rem;">
              <button type="button" class="btn btn--primary" id="btnBookAnother">Schedule Another Meeting</button>
              <button type="button" class="btn btn--ghost" id="btnSuccessClose">Done &amp; Return to Website</button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  `;

  // Append modal to body if not present
  if (!document.getElementById('calendarBookingModal')) {
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  const modal = document.getElementById('calendarBookingModal');
  const closeBtn = document.getElementById('closeCalendarModalBtn');
  const mainStage = document.getElementById('bookingMainStage');
  const successStage = document.getElementById('bookingSuccessStage');
  const form = document.getElementById('consultationBookingForm');

  const monthTitle = document.getElementById('calMonthTitle');
  const daysGrid = document.getElementById('calDaysGrid');
  const slotsGrid = document.getElementById('calSlotsGrid');
  const selectedDateLabel = document.getElementById('slotSelectedDateLabel');
  const bsumDisplayDate = document.getElementById('bsumDisplayDate');

  const prevBtn = document.getElementById('calPrevMonthBtn');
  const nextBtn = document.getElementById('calNextMonthBtn');

  // Format Helper
  function formatDateLabel(d) {
    const opts = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return d.toLocaleDateString('en-GB', opts);
  }

  function updateSummaryDisplay() {
    if (selectedDateLabel) selectedDateLabel.textContent = formatDateLabel(selectedDate);
    if (bsumDisplayDate) bsumDisplayDate.textContent = `${formatDateLabel(selectedDate)} at ${selectedTimeSlot}`;
  }

  // Render Calendar Grid
  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    if (monthTitle) {
      monthTitle.textContent = `${MONTH_NAMES[month]} ${year}`;
    }

    if (!daysGrid) return;
    daysGrid.innerHTML = '';

    // First day of month (1 = Monday, 0 = Sunday)
    const firstDay = new Date(year, month, 1);
    let startDay = firstDay.getDay() - 1;
    if (startDay === -1) startDay = 6; // Monday-based

    const totalDays = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Padding blank days
    for (let i = 0; i < startDay; i++) {
      const blank = document.createElement('div');
      blank.className = 'cal-day cal-day--blank';
      daysGrid.appendChild(blank);
    }

    // Days of Month
    for (let d = 1; d <= totalDays; d++) {
      const dayDate = new Date(year, month, d);
      dayDate.setHours(0, 0, 0, 0);

      const isSunday = dayDate.getDay() === 0;
      const isPast = dayDate < today;
      const isSelected = selectedDate.toDateString() === dayDate.toDateString();

      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'cal-day';
      cell.textContent = d;

      if (isPast || isSunday) {
        cell.classList.add('cal-day--disabled');
        cell.disabled = true;
      } else {
        cell.classList.add('cal-day--active');
        if (isSelected) cell.classList.add('is-selected');

        cell.addEventListener('click', () => {
          selectedDate = dayDate;
          renderCalendar();
          renderTimeSlots();
          updateSummaryDisplay();
        });
      }

      daysGrid.appendChild(cell);
    }
  }

  // Render Time Slots
  function renderTimeSlots() {
    if (!slotsGrid) return;
    slotsGrid.innerHTML = '';

    TIME_SLOTS.forEach(slot => {
      const isSelected = slot.time === selectedTimeSlot;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `slot-btn ${isSelected ? 'is-selected' : ''}`;
      btn.innerHTML = `
        <span class="slot-time">${slot.time}</span>
        <span class="slot-desc">${slot.label}</span>
      `;

      btn.addEventListener('click', () => {
        selectedTimeSlot = slot.time;
        renderTimeSlots();
        updateSummaryDisplay();
      });

      slotsGrid.appendChild(btn);
    });
  }

  // Month Navigation
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
    });
  }

  // Open Modal API
  window.openConsultationCalendar = function(prefill) {
    if (mainStage) mainStage.style.display = 'grid';
    if (successStage) successStage.style.display = 'none';

    if (prefill && prefill.service) {
      const sSelect = document.getElementById('bServiceType');
      if (sSelect) sSelect.value = prefill.service;
    }

    renderCalendar();
    renderTimeSlots();
    updateSummaryDisplay();

    if (modal && typeof modal.showModal === 'function') {
      modal.showModal();
    }
  };

  // Close Modal
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (modal) modal.close();
    });
  }

  // Close on backdrop click
  if (modal) {
    modal.addEventListener('click', (e) => {
      const rect = modal.getBoundingClientRect();
      const inDialog = (
        rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width
      );
      if (!inDialog) modal.close();
    });
  }

  // Global Trigger Interception
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a[href="#book"], a[href="index.html#book"], [data-open-consultation]');
    if (target) {
      e.preventDefault();
      window.openConsultationCalendar();
    }
  });

  // Handle Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const yearStr = selectedDate.getFullYear();
      const monthStr = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const dayStr = String(selectedDate.getDate()).padStart(2, '0');
      const isoDate = `${yearStr}-${monthStr}-${dayStr}`;

      const meetingData = {
        client: document.getElementById('bClientName').value.trim(),
        contact: document.getElementById('bClientEmail').value.trim(),
        phone: document.getElementById('bClientPhone').value.trim(),
        service: document.getElementById('bServiceType').value,
        format: document.getElementById('bMeetingFormat').value,
        location: document.getElementById('bLocation').value.trim(),
        budget: document.getElementById('bBudgetTier').value,
        notes: document.getElementById('bNotes').value.trim() || 'Consultation booked via interactive calendar scheduler.',
        date: isoDate,
        time: selectedTimeSlot,
        dateTime: `${isoDate}T${selectedTimeSlot.slice(0, 5)}`
      };

      let savedMeeting = null;
      if (window.DB && typeof window.DB.scheduleMeeting === 'function') {
        savedMeeting = window.DB.scheduleMeeting(meetingData);
      } else {
        // Fallback LocalStorage saving
        const calls = JSON.parse(localStorage.getItem('donalds_bay_calls') || '[]');
        savedMeeting = {
          id: 'MEET-' + Math.floor(100 + Math.random() * 900),
          ...meetingData,
          status: 'Pending Validation',
          createdAt: new Date().toISOString()
        };
        calls.unshift(savedMeeting);
        localStorage.setItem('donalds_bay_calls', JSON.stringify(calls));
      }

      // Render Confirmation Details
      const detailsContainer = document.getElementById('bsuccessDetails');
      if (detailsContainer && savedMeeting) {
        detailsContainer.innerHTML = `
          <div class="bsuccess-grid">
            <div class="bsuccess-item">
              <span class="bs-lbl">REFERENCE ID</span>
              <span class="bs-val" style="color:var(--accent); font-family:var(--label);">${savedMeeting.id}</span>
            </div>
            <div class="bsuccess-item">
              <span class="bs-lbl">DATE &amp; TIME</span>
              <span class="bs-val">${formatDateLabel(selectedDate)} at ${selectedTimeSlot}</span>
            </div>
            <div class="bsuccess-item">
              <span class="bs-lbl">CLIENT ENTITY</span>
              <span class="bs-val">${savedMeeting.client}</span>
            </div>
            <div class="bsuccess-item">
              <span class="bs-lbl">MEETING FORMAT</span>
              <span class="bs-val">${savedMeeting.format}</span>
            </div>
            <div class="bsuccess-item">
              <span class="bs-lbl">DISCIPLINE</span>
              <span class="bs-val">${savedMeeting.service}</span>
            </div>
            <div class="bsuccess-item">
              <span class="bs-lbl">LOCATION / REGION</span>
              <span class="bs-val">${savedMeeting.location}</span>
            </div>
          </div>
        `;
      }

      if (mainStage) mainStage.style.display = 'none';
      if (successStage) successStage.style.display = 'block';

      form.reset();
    });
  }

  // Reset or Close Handlers on Success Stage
  const bookAnotherBtn = document.getElementById('btnBookAnother');
  if (bookAnotherBtn) {
    bookAnotherBtn.addEventListener('click', () => {
      if (mainStage) mainStage.style.display = 'grid';
      if (successStage) successStage.style.display = 'none';
    });
  }

  const successCloseBtn = document.getElementById('btnSuccessClose');
  if (successCloseBtn) {
    successCloseBtn.addEventListener('click', () => {
      if (modal) modal.close();
    });
  }
})();
