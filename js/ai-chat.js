/* ==========================================================================
   Donald Bay Limited — Advanced AI Engineering & Support Assistant
   ========================================================================== */

(function() {
  // Comprehensive Knowledge Engine for Donald Bay Limited
  const KNOWLEDGE_BASE = [
    {
      intent: "services_overview",
      keywords: ["service", "offer", "what do you do", "capabilities", "specialty", "about", "overview", "what are your services"],
      response: "Donald Bay Limited is an integrated civil engineering, project management, and luxury real estate enterprise. We operate across three primary divisions:\n\n1. 🏗️ **Project Management & EPC**: End-to-end site oversight, Bill of Quantities (BoQ), cost engineering, and QA/QC compliance.\n2. 🛣️ **Road Construction**: Heavy civil expressways, high-tonnage asphalt paving, drainage networks, and bridge infrastructure.\n3. 🏙️ **Real Estate & Commercial Towers**: Turnkey luxury residential estates, waterfront villas, and Grade-A commercial office skyscrapers.\n\nWhich division would you like more technical details on?",
      followUps: ["Tell me about Road Construction", "Project Management EPC details", "Explore Real Estate portfolio", "Request Cost Estimate"]
    },
    {
      intent: "road_construction",
      keywords: ["road", "highway", "asphalt", "paving", "bridge", "expressway", "culvert", "earthwork", "dual carriageway", "pave", "drainage"],
      response: "Our **Road Construction & Civil Division** delivers major national corridors:\n\n• **Asphalt Paving**: High-capacity polymer asphalt laying and subgrade compaction.\n• **Bridge Engineering**: Precast and in-situ reinforced concrete bridge spans and flyovers.\n• **Drainage Networks**: Deep storm sewer culverts and hydraulic flood control.\n• **Heavy Fleet**: Over 60 heavy earthmovers (Caterpillar, Bomag, Komatsu excavators, graders, pavers, and mobile concrete batch plants).\n\n**Flagship**: The *Atlantic Coastal Expressway* (42km corridor) was delivered 3 months ahead of schedule with zero safety incidents.",
      followUps: ["What equipment do you use?", "View Atlantic Expressway case study", "Book Road Feasibility Study"]
    },
    {
      intent: "project_management",
      keywords: ["project management", "epc", "boq", "supervision", "cost", "feasibility", "audit", "drone", "telemetry", "schedule", "contractor"],
      response: "Our **Project Management & EPC Division** provides turnkey governance:\n\n• **Financial Controls**: Comprehensive Bill of Quantities (BoQ) and milestone forecasting to eliminate budget overruns.\n• **Engineering Oversight**: Resident COREN-certified chief engineers and QA/QC officers on-site.\n• **Site Telemetry**: Real-time drone aerial mapping, 3D BIM coordination, and automated milestone reporting.\n• **Safety Compliance**: ISO 9001 and HSE Level 3 certified (5.2M man-hours Zero LTI).",
      followUps: ["How do I get a BoQ audit?", "Consult with Chief Engineer", "View Executive Portal"]
    },
    {
      intent: "real_estate",
      keywords: ["real estate", "property", "house", "villa", "waterfront", "tower", "residential", "commercial", "bayview", "sterling", "apartment", "estate"],
      response: "Our **Real Estate & Commercial Towers Division** develops high-value landmarks:\n\n• **The Bayview Waterfront Residences**: 24-unit luxury gated estate featuring travertine facades, infinity pools, and oceanfront terraces.\n• **Sterling Heights Corporate Tower**: 32-storey Grade-A commercial skyscraper with parametric energy-efficient glass facade.\n• **Turnkey Handover**: From land reclamation and structural build to bespoke MEP and luxury interior finishes.",
      followUps: ["Inquire about Bayview Residences", "Commercial Tower Specifications", "Schedule Private Viewing"]
    },
    {
      intent: "pricing_quotes",
      keywords: ["price", "cost", "quote", "rate", "how much", "budget", "pricing", "fee", "estimate", "bill of quantities"],
      response: "Project pricing is determined by site topography, square meterage, and civil specifications:\n\n• **Specialized Structural & Civil Works**: Starting from ₦50M – ₦250M ($50K – $250K)\n• **Commercial Developments & Estate Phase Builds**: ₦250M – ₦1B ($250K – $1M)\n• **Mega Infrastructure & Highways**: ₦1B – ₦10B+ ($1M – $10M+)\n\nYou can fill out our on-page RFP form or tell me your site location and scope to get a preliminary consultation scheduled!",
      followUps: ["Submit RFP Specifications", "Book Site Inspection", "Contact Estimation Team"]
    },
    {
      intent: "safety_certification",
      keywords: ["safety", "certification", "compliance", "hse", "coren", "iso", "lti", "loss time", "standards", "quality"],
      response: "Safety and quality governance at Donald Bay Limited are benchmarked to international standards:\n\n• **ISO 9001:2015**: Certified Quality Management System.\n• **HSE Level 3**: 100% Zero-Loss Time Incident (Zero-LTI) track record over 5,200,000 operational hours.\n• **COREN & NSE Compliant**: All structural and civil designs are stamped by registered professional engineers.",
      followUps: ["What services do you offer?", "Request Company Credentials"]
    },
    {
      intent: "contact_location",
      keywords: ["contact", "phone", "email", "location", "address", "office", "headquarters", "where", "reach", "call", "whatsapp"],
      response: "📍 **Headquarters**: Donald Bay Tower, Coastal Boulevard, Victoria Island / Lekki, Lagos, Nigeria\n📞 **Direct Line**: +234 (0) 800 DONALDS (+234 800 366 2537)\n✉️ **Corporate Inquiries**: info@donaldbay.com\n⏰ **Operational Hours**: Mon – Sat: 07:00 – 18:00 (WAT)\n\nYou can also use the RFP form right on this page to request an immediate callback from our project director!",
      followUps: ["Schedule Technical Consultation", "Talk to Chief Estimator"]
    },
    {
      intent: "leadership_team",
      keywords: ["founder", "ceo", "director", "who owns", "leadership", "management team", "donald", "babatunde", "team"],
      response: "Donald Bay Limited is led by a distinguished executive board:\n\n• **Engr. Donald Akpan** — Chief Executive & Managing Director\n• **Engr. Babatunde Sanusi, FNSE** — Director of Highway Planning & Civil Infrastructure\n• **Ngozi Okonkwo** — Chief Financial & Commercial Officer\n\nSupported by over 250 resident civil engineers, architects, survey specialists, and heavy plant operators.",
      followUps: ["Contact the Executive Board", "Schedule Technical Meeting"]
    },
    {
      intent: "mission_vision_values",
      keywords: ["mission", "vision", "core values", "values", "philosophy", "principles", "culture", "motto", "purpose"],
      response: "Here is what defines **Donald Bay Limited**:\n\n🎯 **Our Mission**: To engineer, manage, and construct high-impact road corridors, civil infrastructure, and premier real estate landmarks through uncompromising structural precision, rigorous EPC governance, and sustainable technologies built to last generations.\n\n🌐 **Our Vision**: To be the foremost civil engineering and infrastructure development authority in West Africa—recognized for structural integrity, innovation, zero-loss time safety, and resilient urban environments.\n\n⭐ **Our Core Values**:\n1. **Structural Integrity & Quality**: Zero compromise on testing and civil standards.\n2. **Uncompromising Safety**: 5.2M+ hours Zero-Loss Time Incidents (HSE Level 3).\n3. **Precision Project Governance**: Transparent BoQ milestone control.\n4. **Generational Sustainability**: Biophilic design & durable eco-materials.",
      followUps: ["Explore Road Construction", "View Executed Portfolio", "Request Consultation"]
    },
    {
      intent: "admin_portal",
      keywords: ["admin", "invoice", "portal", "schedule", "meeting", "call logs", "billing", "revenue", "executive"],
      response: "Authorized executives can access the **Executive Portal** to:\n\n• Inspect and manage **Call Schedules & Technical Site Consultations**.\n• Issue, edit, or track **Construction Milestone Invoices**.\n• Publish new projects to the **Portfolio Page** and articles to **Blogs & Insights**.\n• Authorize or revoke **Admin Credentials by Email**.\n• View real-time **Service Revenue Breakdown & Market Share Analytics**.\n\nVisit the Executive Portal link in the footer or navigate to `/admin.html` (Authentication required: `d.akpan@donaldbay.com` / PIN: `donald2026`).",
      followUps: ["Go to Executive Portal", "How do I add an Admin?"]
    }
  ];

  // Smart Matching Algorithm
  function matchIntent(userText) {
    const text = userText.toLowerCase();
    let bestMatch = null;
    let highestScore = 0;

    for (const item of KNOWLEDGE_BASE) {
      let score = 0;
      for (const kw of item.keywords) {
        if (text.includes(kw)) {
          score += kw.split(' ').length * 2; // Weight multi-word keywords higher
        }
      }
      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }

    if (bestMatch && highestScore > 0) {
      return bestMatch;
    }

    return {
      response: "Thank you for asking! **Donald Bay Limited** provides enterprise civil solutions across **Project Management**, **Road Construction**, and **Real Estate Development**.\n\nWould you like to speak directly with our chief estimation engineer or submit your project scope for a free technical assessment?",
      followUps: ["What services do you offer?", "Request Cost Estimate", "Contact Headquarters", "Schedule Site Inspection"]
    };
  }

  // Inject AI Assistant Widget UI
  const widgetHTML = `
    <div class="ai-widget" id="aiWidget">
      <!-- Floating Toggle Button -->
      <button class="ai-toggle-btn" id="aiToggleBtn" aria-label="Open Ask Donald Assistant">
        <div class="ai-badge-pulse"></div>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <span class="ai-toggle-label">Ask Donald</span>
      </button>

      <!-- Chat Box Panel -->
      <div class="ai-chat-box" id="aiChatBox">
        <div class="ai-chat-head">
          <div class="ai-head-info">
            <div class="ai-avatar">
              <span class="ai-online-dot"></span>
              <span>DB</span>
            </div>
            <div>
              <h4>Ask Donald</h4>
            </div>
          </div>
          <button class="ai-close-btn" id="aiCloseBtn" aria-label="Close Chat">&times;</button>
        </div>

        <div class="ai-chat-body" id="aiChatMessages">
          <div class="ai-msg ai-msg-bot">
            <p>Welcome to <strong>Donald Bay Limited</strong>! Ask Donald anything about our civil projects, road engineering, EPC management, or real estate developments.</p>
          </div>

          <div class="ai-quick-prompts" id="aiQuickPrompts">
            <button class="ai-prompt-btn" data-query="What services do you offer?">What services do you offer?</button>
            <button class="ai-prompt-btn" data-query="Tell me about Road Construction capabilities">Road Construction capabilities</button>
            <button class="ai-prompt-btn" data-query="How does Project Management EPC work?">Project Management &amp; EPC</button>
            <button class="ai-prompt-btn" data-query="How do I get a cost estimate or schedule a call?">Get Cost Estimate / Schedule Call</button>
          </div>
        </div>

        <form class="ai-chat-foot" id="aiChatForm">
          <input type="text" id="aiUserInput" class="ai-input" placeholder="Ask Donald anything about Donald Bay Limited..." autocomplete="off" required>
          <button type="submit" class="ai-send-btn" aria-label="Send message">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </form>
      </div>
    </div>
  `;

  // Avoid duplicate injection
  if (!document.getElementById('aiWidget')) {
    document.body.insertAdjacentHTML('beforeend', widgetHTML);
  }

  const toggleBtn = document.getElementById('aiToggleBtn');
  const chatBox = document.getElementById('aiChatBox');
  const closeBtn = document.getElementById('aiCloseBtn');
  const form = document.getElementById('aiChatForm');
  const input = document.getElementById('aiUserInput');
  const messages = document.getElementById('aiChatMessages');
  const quickPrompts = document.getElementById('aiQuickPrompts');

  function openChat() {
    chatBox.classList.add('is-active');
    input.focus();
  }
  function closeChat() {
    chatBox.classList.remove('is-active');
  }

  toggleBtn.addEventListener('click', () => {
    if (chatBox.classList.contains('is-active')) closeChat();
    else openChat();
  });
  closeBtn.addEventListener('click', closeChat);

  function appendMessage(sender, text, followUps = []) {
    const msgDiv = document.createElement('div');
    msgDiv.className = sender === 'user' ? 'ai-msg ai-msg-user' : 'ai-msg ai-msg-bot';

    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/• (.*?)(?=(\n|$))/g, '<li style="margin-left:1rem; list-style-type:disc;">$1</li>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');

    msgDiv.innerHTML = `<p>${formatted}</p>`;
    messages.appendChild(msgDiv);

    // Dynamic Follow-Up Buttons
    if (followUps && followUps.length && sender === 'bot') {
      const followUpWrap = document.createElement('div');
      followUpWrap.className = 'ai-quick-prompts';
      followUpWrap.style.marginTop = '0.4rem';
      followUps.forEach(fText => {
        const btn = document.createElement('button');
        btn.className = 'ai-prompt-btn';
        btn.textContent = fText;
        btn.onclick = () => handleQuery(fText);
        followUpWrap.appendChild(btn);
      });
      messages.appendChild(followUpWrap);
    }

    messages.scrollTop = messages.scrollHeight;
  }

  function handleQuery(query) {
    appendMessage('user', query);
    if (quickPrompts) quickPrompts.style.display = 'none';

    // Typing indicator
    const typing = document.createElement('div');
    typing.className = 'ai-msg ai-msg-bot ai-typing';
    typing.innerHTML = `<span></span><span></span><span></span>`;
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;

    setTimeout(() => {
      typing.remove();
      const matched = matchIntent(query);
      appendMessage('bot', matched.response, matched.followUps);
    }, 500);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;
    input.value = '';
    handleQuery(query);
  });

  document.querySelectorAll('.ai-prompt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.dataset.query;
      handleQuery(q);
    });
  });
})();
