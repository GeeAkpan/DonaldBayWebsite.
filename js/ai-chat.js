/* ==========================================================================
   Donalds Bay Limited — AI Engineering & Customer Assistant
   ========================================================================== */

(function() {
  // Knowledge Base for Donalds Bay Limited
  const KNOWLEDGE = [
    {
      keywords: ["service", "offer", "what do you do", "capabilities", "specialty"],
      response: "Donalds Bay Limited provides three core enterprise capabilities:\n\n1. **Project Management & EPC**: End-to-end site supervision, cost engineering, BoQ audits, and timeline delivery.\n2. **Road Construction**: Heavy civil infrastructure, multi-lane expressways, asphalt paving, culverts, and bridge civil works.\n3. **Real Estate**: Turnkey luxury residential developments, commercial towers, and masterplanned communities.\n\nWhich of these services are you looking to commission?"
    },
    {
      keywords: ["road", "highway", "asphalt", "paving", "bridge", "expressway", "culvert"],
      response: "Our **Road Construction** division handles high-capacity asphalt paving, subgrade compaction, dual-carriageway corridors, and bridge infrastructure. We operate a fleet of 60+ heavy earthmovers and dedicated batch plants.\n\nOur flagship Atlantic Coastal Expressway (42km) was delivered 3 months ahead of schedule with 5.2M man-hours zero LTI!"
    },
    {
      keywords: ["project management", "epc", "boq", "supervision", "cost", "feasibility"],
      response: "Our **Project Management** team provides full EPC management, on-site quality assurance, drone telemetry, and ISO 9001 compliance. We eliminate budget overruns and guarantee milestone delivery on complex civil and architectural projects."
    },
    {
      keywords: ["real estate", "property", "house", "villa", "waterfront", "tower", "residential", "commercial"],
      response: "Our **Real Estate** division specializes in luxury waterfront residences (like The Bayview Residences) and Grade-A commercial headquarters (like Sterling Heights Tower). We manage everything from architectural concept to turnkey interior handover."
    },
    {
      keywords: ["price", "cost", "quote", "rate", "how much", "budget", "pricing"],
      response: "Project costs depend on site topography, square meterage, and civil specifications. Typical scales range from ₦50M for specialized structural works to ₦10B+ for major highway and high-rise developments.\n\nWould you like to schedule an assessment or submit your BoQ for an itemized estimate?"
    },
    {
      keywords: ["contact", "phone", "email", "location", "address", "office", "headquarters"],
      response: "📍 **Headquarters**: Donalds Bay Tower, Coastal Boulevard, Lagos\n📞 **Direct Line**: +234 (0) 800 DONALDS\n✉️ **Corporate Email**: info@donaldsbay.com\n\nYou can also book a direct technical meeting via our RFP form on this page!"
    },
    {
      keywords: ["safety", "certification", "compliance", "hse", "coren", "iso"],
      response: "Donalds Bay Limited operates under strict **ISO 9001** and **HSE Level 3** safety governance. We maintain a verified 100% Zero-Loss Time Incident (Zero-LTI) track record across all active sites."
    },
    {
      keywords: ["admin", "invoice", "portal", "schedule", "meeting", "call"],
      response: "You can access our **Executive Portal** to inspect scheduled site consultations and construction milestone invoices. Click the 'Executive Portal' button in the top navigation or footer to view the dashboard."
    }
  ];

  // Helper: Find Best AI Match
  function getAIResponse(userText) {
    const lower = userText.toLowerCase();
    for (const item of KNOWLEDGE) {
      if (item.keywords.some(k => lower.includes(k))) {
        return item.response;
      }
    }
    return "Thank you for reaching out to Donalds Bay Limited. We specialize in Project Management, Road Construction, and Real Estate developments.\n\nCould you share details regarding your site location, project category, or preferred start date? You can also submit the RFP form on this page for an official technical review.";
  }

  // Inject Widget DOM
  const widgetHTML = `
    <div class="ai-widget" id="aiWidget">
      <!-- Floating Toggle Button -->
      <button class="ai-toggle-btn" id="aiToggleBtn" aria-label="Open AI Engineering Assistant">
        <div class="ai-badge-pulse"></div>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <span class="ai-toggle-label">Donalds Bay AI</span>
      </button>

      <!-- Chat Drawer / Modal Box -->
      <div class="ai-chat-box" id="aiChatBox">
        <div class="ai-chat-head">
          <div class="ai-head-info">
            <div class="ai-avatar">
              <span class="ai-online-dot"></span>
              <span>DB</span>
            </div>
            <div>
              <h4>Donalds Bay AI Assistant</h4>
              <p>Technical &amp; Engineering Support &middot; Online</p>
            </div>
          </div>
          <button class="ai-close-btn" id="aiCloseBtn" aria-label="Close Chat">&times;</button>
        </div>

        <div class="ai-chat-body" id="aiChatMessages">
          <div class="ai-msg ai-msg-bot">
            <p>Welcome to <strong>Donalds Bay Limited</strong>. I'm your AI Engineering Assistant.</p>
            <p>How can I assist you with your Project Management, Road Construction, or Real Estate requirements today?</p>
          </div>

          <!-- Quick Starter Prompts -->
          <div class="ai-quick-prompts" id="aiQuickPrompts">
            <button class="ai-prompt-btn" data-query="What services do you offer?">What services do you offer?</button>
            <button class="ai-prompt-btn" data-query="Tell me about Road Construction capabilities">Road Construction capabilities</button>
            <button class="ai-prompt-btn" data-query="How does Project Management work?">Project Management &amp; EPC</button>
            <button class="ai-prompt-btn" data-query="How do I get a cost estimate or schedule a call?">Get Cost Estimate / Schedule Call</button>
          </div>
        </div>

        <form class="ai-chat-foot" id="aiChatForm">
          <input type="text" id="aiUserInput" class="ai-input" placeholder="Ask about services, roadworks, pricing, BoQ..." autocomplete="off" required>
          <button type="submit" class="ai-send-btn" aria-label="Send message">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', widgetHTML);

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

  function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = sender === 'user' ? 'ai-msg ai-msg-user' : 'ai-msg ai-msg-bot';
    
    // Parse bold text and newlines
    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');
    
    msgDiv.innerHTML = `<p>${formatted}</p>`;
    messages.appendChild(msgDiv);
    messages.scrollTop = messages.scrollHeight;
  }

  function handleQuery(query) {
    appendMessage('user', query);
    if (quickPrompts) quickPrompts.style.display = 'none';

    // Show typing indicator
    const typing = document.createElement('div');
    typing.className = 'ai-msg ai-msg-bot ai-typing';
    typing.innerHTML = `<span></span><span></span><span></span>`;
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;

    setTimeout(() => {
      typing.remove();
      const reply = getAIResponse(query);
      appendMessage('bot', reply);
    }, 600);
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
