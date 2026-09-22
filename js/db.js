/* ==========================================================================
   Donald Bay Limited — Shared Data & Persistence Layer
   ========================================================================== */

// Initial Seed Projects
const SEED_PROJECTS = [
  {
    id: "PROJ-01",
    title: "Atlantic Coastal Expressway",
    category: "road",
    categoryLabel: "Road Construction",
    client: "Federal Ministry of Works",
    budget: "₦28.5B Budget",
    image: "media/work-01.jpg",
    desc: "42km high-tonnage multi-lane highway, dual bridges, and reinforced stormwater drainage.",
    date: "Completed 2026",
    gallery: ["media/work-01.jpg", "media/branded-trucks.jpg", "media/branded-survey.jpg"]
  },
  {
    id: "PROJ-02",
    title: "Sterling Heights Commercial Tower",
    category: "management",
    categoryLabel: "Project Management",
    client: "Sterling Urban Developments",
    budget: "₦14.2B EPC",
    image: "media/work-02.jpg",
    desc: "32-storey Grade-A corporate headquarters with parametric energy-efficient glass facade.",
    date: "Completed 2025",
    gallery: ["media/work-02.jpg", "media/work-04.jpg", "media/branded-helmet.jpg"]
  },
  {
    id: "PROJ-03",
    title: "The Bayview Waterfront Residences",
    category: "realestate",
    categoryLabel: "Real Estate",
    client: "PrimeStone Real Estate",
    budget: "₦9.8B Gated Estate",
    image: "media/work-03.jpg",
    desc: "Exclusive 24-unit luxury residential enclave featuring travertine finishes and infinity pools.",
    date: "Completed 2025",
    gallery: ["media/work-03.jpg", "media/pillar-realestate.jpg", "media/case-still-3.jpg"]
  },
  {
    id: "PROJ-04",
    title: "Metropolitan Tower Superstructure",
    category: "management",
    categoryLabel: "Building Construction",
    client: "Apex Civil Engineering",
    budget: "₦18.0B Superstructure",
    image: "media/work-04.jpg",
    desc: "Heavy raft foundation, composite structural steel framing, and crane coordination.",
    date: "Completed 2024",
    gallery: ["media/work-04.jpg", "media/hero-poster.jpg", "media/work-02.jpg"]
  },
  {
    id: "PROJ-05",
    title: "West Valley Arterial Highway",
    category: "road",
    categoryLabel: "Road Construction",
    client: "Chevron Infrastructure Logistics",
    budget: "₦11.5B Highway",
    image: "media/branded-excavator.jpg",
    desc: "Interstate bypass corridor with automated toll plazas, heavy earthwork cuttings, and high-tonnage excavator operations.",
    date: "Completed 2024",
    gallery: ["media/branded-excavator.jpg", "media/branded-trucks.jpg", "media/work-01.jpg"]
  },
  {
    id: "PROJ-06",
    title: "Apex Mixed-Use Plaza",
    category: "management",
    categoryLabel: "Project Management",
    client: "Apex Infrastructure Ltd",
    budget: "₦6.2B Mixed-Use",
    image: "media/branded-survey.jpg",
    desc: "End-to-end EPC management, robotic geomatic survey, cost engineering, and multi-contractor site coordination.",
    date: "Completed 2023",
    gallery: ["media/branded-survey.jpg", "media/branded-helmet.jpg", "media/work-04.jpg"]
  }
];

// Initial Seed Blogs & Engineering Insights
const SEED_BLOGS = [
  {
    id: "BLOG-01",
    title: "Deep Soil Stabilization & Heavy Paving in Coastal Highway Construction",
    category: "Road Engineering",
    author: "Donald Bay Road Engineering Directorate",
    date: "September 15, 2026",
    readTime: "5 min read",
    image: "media/branded-trucks.jpg",
    excerpt: "Overcoming tidal water table pressures and soft subsoils using company-owned automated asphalt paving trains and geotextile membranes."
  },
  {
    id: "BLOG-02",
    title: "Zero-Overrun EPC Governance: Real-Time Telemetry & Quality Standards",
    category: "Project Management",
    author: "Chief Civil Engineering Board",
    date: "September 08, 2026",
    readTime: "6 min read",
    image: "media/branded-helmet.jpg",
    excerpt: "How real-time 3D BIM coordination, precision geomatics, and milestone-based BoQ controls preserve structural integrity and financial budgets."
  },
  {
    id: "BLOG-03",
    title: "Travertine & Passive Biophilic Cooling in Waterfront Real Estate",
    category: "Luxury Architecture",
    author: "Donald Bay Architectural Board",
    date: "August 28, 2026",
    readTime: "4 min read",
    image: "media/pillar-realestate.jpg",
    excerpt: "Integrating thermal mass travertine cladding and cross-ventilation designs to lower HVAC energy load in ultra-luxury tropical residences."
  }
];

// Initial Seed Consultations & Scheduled Meetings
const SEED_CALLS = [
  {
    id: "MEET-401",
    client: "Federal Ministry of Works",
    contact: "eng.sanusi@works.gov.ng",
    phone: "+234 803 123 4567",
    service: "Road Construction",
    location: "Atlantic Coastal Corridor, Lagos",
    dateTime: "2026-09-22T10:30",
    date: "2026-09-22",
    time: "10:30 AM (WAT)",
    format: "On-Site Inspection",
    budget: "₦10B+ Mega Infrastructure",
    status: "Confirmed",
    notes: "Review bridge interchange piling specifications and polymer asphalt test samples."
  },
  {
    id: "MEET-402",
    client: "PrimeStone Real Estate Partners",
    contact: "director@primestone.ng",
    phone: "+234 802 987 6543",
    service: "Real Estate",
    location: "Eko Atlantic, Victoria Island",
    dateTime: "2026-09-23T14:00",
    date: "2026-09-23",
    time: "02:00 PM (WAT)",
    format: "Google Meet (Virtual)",
    budget: "₦1B – ₦10B ($1M – $10M)",
    status: "Confirmed",
    notes: "Travertine luxury residential phase 2 structural conceptualization."
  },
  {
    id: "MEET-403",
    client: "Sterling Urban Developments",
    contact: "mgt@sterlingurban.com",
    phone: "+234 809 555 1212",
    service: "Project Management",
    location: "Sterling Heights Site, Abuja CBD",
    dateTime: "2026-09-24T11:00",
    date: "2026-09-24",
    time: "11:00 AM (WAT)",
    format: "Headquarters Boardroom",
    budget: "₦1B – ₦10B ($1M – $10M)",
    status: "Pending Validation",
    notes: "EPC governance and BoQ reconciliation for 32-storey commercial tower foundation."
  },
  {
    id: "MEET-404",
    client: "Chevron Infrastructure Logistics",
    contact: "procurement@chevroninfra.com",
    phone: "+234 805 777 8899",
    service: "Road Construction",
    location: "Escravos Access Highway",
    dateTime: "2026-09-25T15:30",
    date: "2026-09-25",
    time: "03:30 PM (WAT)",
    format: "Google Meet (Virtual)",
    budget: "₦10B+ Mega Infrastructure",
    status: "Confirmed",
    notes: "Heavy haulage bypass soil stabilization and culvert design."
  }
];

// Data Store Accessors
window.DB = {
  getProjects: function() {
    const data = localStorage.getItem('donalds_bay_projects');
    return data ? JSON.parse(data) : SEED_PROJECTS;
  },
  saveProjects: function(projects) {
    localStorage.setItem('donalds_bay_projects', JSON.stringify(projects));
  },
  getBlogs: function() {
    const data = localStorage.getItem('donalds_bay_blogs');
    return data ? JSON.parse(data) : SEED_BLOGS;
  },
  saveBlogs: function(blogs) {
    localStorage.setItem('donalds_bay_blogs', JSON.stringify(blogs));
  },
  getCalls: function() {
    const data = localStorage.getItem('donalds_bay_calls');
    return data ? JSON.parse(data) : SEED_CALLS;
  },
  saveCalls: function(calls) {
    localStorage.setItem('donalds_bay_calls', JSON.stringify(calls));
  },
  scheduleMeeting: function(meetingData) {
    const calls = this.getCalls();
    const idNum = Math.floor(100 + Math.random() * 900);
    const newMeeting = {
      id: "MEET-" + idNum,
      client: meetingData.client || "Prospective Client",
      contact: meetingData.contact || "client@company.com",
      phone: meetingData.phone || "+234",
      service: meetingData.service || "Road Construction",
      location: meetingData.location || "Victoria Island, Lagos",
      dateTime: meetingData.dateTime || new Date().toISOString().slice(0, 16),
      date: meetingData.date || new Date().toISOString().slice(0, 10),
      time: meetingData.time || "10:00 AM (WAT)",
      format: meetingData.format || "Google Meet (Virtual)",
      budget: meetingData.budget || "₦1B – ₦10B ($1M – $10M)",
      status: "Pending Validation",
      notes: meetingData.notes || "Requested via online calendar consultation scheduler.",
      createdAt: new Date().toISOString()
    };
    calls.unshift(newMeeting);
    this.saveCalls(calls);
    return newMeeting;
  },
  validateMeeting: function(meetingId, validator) {
    const calls = this.getCalls();
    const target = calls.find(c => c.id === meetingId);
    if (target) {
      target.status = "Confirmed";
      target.validatedBy = validator || "Executive Admin";
      target.validatedAt = new Date().toISOString();
      this.saveCalls(calls);
      return target;
    }
    return null;
  }
};

// Seed LocalStorage if not present
if (!localStorage.getItem('donalds_bay_projects')) window.DB.saveProjects(SEED_PROJECTS);
if (!localStorage.getItem('donalds_bay_blogs')) window.DB.saveBlogs(SEED_BLOGS);
if (!localStorage.getItem('donalds_bay_calls')) window.DB.saveCalls(SEED_CALLS);
