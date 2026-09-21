/* ==========================================================================
   Donalds Bay Limited — Executive Portal Controller
   ========================================================================== */

// Initial Seed Data for Call Schedules & Consultations
const SEED_CALLS = [
  {
    id: "CALL-101",
    client: "Federal Ministry of Works",
    contact: "eng.sanusi@works.gov.ng",
    service: "Road Construction",
    location: "Atlantic Coastal Corridor, Lagos",
    dateTime: "2026-09-22T10:30",
    format: "On-Site Inspection",
    budget: "₦10B+ Mega Infrastructure",
    status: "Confirmed"
  },
  {
    id: "CALL-102",
    client: "PrimeStone Real Estate Partners",
    contact: "director@primestone.ng",
    service: "Real Estate",
    location: "Eko Atlantic, Victoria Island",
    dateTime: "2026-09-23T14:00",
    format: "Google Meet (Virtual)",
    budget: "₦1B – ₦10B ($1M – $10M)",
    status: "Confirmed"
  },
  {
    id: "CALL-103",
    client: "Sterling Urban Developments",
    contact: "mgt@sterlingurban.com",
    service: "Project Management",
    location: "Sterling Heights Site, Abuja CBD",
    dateTime: "2026-09-24T11:00",
    format: "Headquarters Boardroom",
    budget: "₦1B – ₦10B ($1M – $10M)",
    status: "Pending"
  },
  {
    id: "CALL-104",
    client: "Chevron Infrastructure Logistics",
    contact: "procurement@chevroninfra.com",
    service: "Road Construction",
    location: "Escravos Access Highway",
    dateTime: "2026-09-25T15:30",
    format: "Google Meet (Virtual)",
    budget: "₦10B+ Mega Infrastructure",
    status: "Confirmed"
  },
  {
    id: "CALL-105",
    client: "Apex Civil & Marine Engineering",
    contact: "civil.leads@apexcivil.com",
    service: "Project Management",
    location: "Lekki Free Zone Bridgehead",
    dateTime: "2026-09-26T09:00",
    format: "On-Site Inspection",
    budget: "₦250M – ₦1B ($250K – $1M)",
    status: "Pending"
  }
];

// Initial Seed Data for Construction Milestone Invoices
const SEED_INVOICES = [
  {
    id: "DBL-INV-2026-088",
    client: "Federal Ministry of Works",
    category: "Road Construction",
    project: "Atlantic Coastal Expressway - Section 1",
    milestone: "Phase 1 Subgrade & Culvert Drainage Network Complete",
    amount: 120000000,
    issuedDate: "2026-08-15",
    dueDate: "2026-09-15",
    status: "Paid"
  },
  {
    id: "DBL-INV-2026-089",
    client: "PrimeStone Real Estate Partners",
    category: "Real Estate",
    project: "The Bayview Luxury Waterfront Residences",
    milestone: "Superstructure Piling & Deep Raft Foundation Handover",
    amount: 85500000,
    issuedDate: "2026-08-28",
    dueDate: "2026-09-28",
    status: "Paid"
  },
  {
    id: "DBL-INV-2026-090",
    client: "Sterling Urban Developments",
    category: "Project Management",
    project: "Sterling Heights Corporate Tower",
    milestone: "Floors 15-22 Composite Concrete & Steel Framing",
    amount: 45000000,
    issuedDate: "2026-09-05",
    dueDate: "2026-09-25",
    status: "Pending"
  },
  {
    id: "DBL-INV-2026-091",
    client: "Federal Ministry of Works",
    category: "Road Construction",
    project: "Atlantic Coastal Expressway - Section 2",
    milestone: "50% High-Tonnage Polymer Asphalt Paving Milestone",
    amount: 145000000,
    issuedDate: "2026-09-10",
    dueDate: "2026-10-10",
    status: "Pending"
  },
  {
    id: "DBL-INV-2026-085",
    client: "Apex Civil Engineering",
    category: "Project Management",
    project: "West Valley Mixed-Use Development",
    milestone: "EPC Telemetry, Cost Feasibility & QA Audit Signoff",
    amount: 87000000,
    issuedDate: "2026-07-20",
    dueDate: "2026-08-20",
    status: "Overdue"
  }
];

// Initial Seed Data for Admins (Access Control)
const SEED_ADMINS = [
  {
    id: "ADM-01",
    name: "Engr. Donald Akpan",
    email: "d.akpan@donaldsbay.com",
    role: "Super Admin",
    dateAdded: "2026-01-10",
    status: "Active"
  },
  {
    id: "ADM-02",
    name: "Babatunde Sanusi",
    email: "b.sanusi@donaldsbay.com",
    role: "Project Director",
    dateAdded: "2026-02-15",
    status: "Active"
  },
  {
    id: "ADM-03",
    name: "Ngozi Okonkwo",
    email: "n.okonkwo@donaldsbay.com",
    role: "Finance & Billing",
    dateAdded: "2026-03-01",
    status: "Active"
  }
];

// LocalStorage Helpers
function getCalls() {
  const data = localStorage.getItem('donalds_bay_calls');
  return data ? JSON.parse(data) : SEED_CALLS;
}
function saveCalls(calls) {
  localStorage.setItem('donalds_bay_calls', JSON.stringify(calls));
}

function getInvoices() {
  const data = localStorage.getItem('donalds_bay_invoices');
  return data ? JSON.parse(data) : SEED_INVOICES;
}
function saveInvoices(invs) {
  localStorage.setItem('donalds_bay_invoices', JSON.stringify(invs));
}

function getAdmins() {
  const data = localStorage.getItem('donalds_bay_admins');
  return data ? JSON.parse(data) : SEED_ADMINS;
}
function saveAdmins(admins) {
  localStorage.setItem('donalds_bay_admins', JSON.stringify(admins));
}

// Initialize seed data if not present
if (!localStorage.getItem('donalds_bay_calls')) saveCalls(SEED_CALLS);
if (!localStorage.getItem('donalds_bay_invoices')) saveInvoices(SEED_INVOICES);
if (!localStorage.getItem('donalds_bay_admins')) saveAdmins(SEED_ADMINS);

// Number formatter
const fmtNgn = (n) => '₦' + Number(n).toLocaleString('en-NG');

// Clock updater
function updateAdminClock() {
  const clockEl = document.getElementById('admin-clock');
  if (!clockEl) return;
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit', hour12: false
  });
  clockEl.textContent = `WAT ${fmt.format(new Date())}`;
}
setInterval(updateAdminClock, 30000);
updateAdminClock();

/* ==========================================================================
   AUTHENTICATION GATE & ACCESS CONTROL
   ========================================================================== */
function checkAuth() {
  const authGate = document.getElementById('authGate');
  const dashboardView = document.getElementById('adminDashboardView');
  const userEmailDisplay = document.getElementById('activeUserEmailDisplay');
  const loggedInUser = sessionStorage.getItem('donalds_bay_auth_user');

  if (loggedInUser) {
    if (authGate) authGate.style.display = 'none';
    if (dashboardView) dashboardView.style.display = 'flex';
    if (userEmailDisplay) userEmailDisplay.textContent = loggedInUser;
  } else {
    if (authGate) authGate.style.display = 'flex';
    if (dashboardView) dashboardView.style.display = 'none';
  }
}

// Handle Sign In Submission
document.getElementById('formAuthLogin')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const emailInput = document.getElementById('loginEmail').value.trim().toLowerCase();
  const passkeyInput = document.getElementById('loginPasskey').value.trim();
  const errorBox = document.getElementById('authErrorMsg');

  const admins = getAdmins();
  const isAuthorizedEmail = admins.some(a => a.email.toLowerCase() === emailInput) || emailInput === 'd.akpan@donaldsbay.com';
  const isCorrectPIN = (passkeyInput === 'donald2026' || passkeyInput === 'admin2026' || passkeyInput === '1234');

  if (isAuthorizedEmail && isCorrectPIN) {
    sessionStorage.setItem('donalds_bay_auth_user', emailInput);
    if (errorBox) errorBox.style.display = 'none';
    checkAuth();
  } else {
    if (errorBox) {
      errorBox.style.display = 'block';
      if (!isAuthorizedEmail) {
        errorBox.textContent = 'Access Denied: Email is not in the authorized executive administrator directory.';
      } else {
        errorBox.textContent = 'Access Denied: Invalid executive PIN / passkey.';
      }
    }
  }
});

// Handle Sign Out
document.getElementById('btnAdminSignOut')?.addEventListener('click', () => {
  sessionStorage.removeItem('donalds_bay_auth_user');
  checkAuth();
});

// Run auth check immediately
checkAuth();

/* ==========================================================================
   TAB SWITCHING
   ========================================================================== */
document.querySelectorAll('.admin-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById(tab.dataset.tab);
    if (target) target.classList.add('active');
  });
});

/* ==========================================================================
   KPIs & REVENUE ANALYTICS CHART
   ========================================================================== */
function updateKPIsAndChart() {
  const calls = getCalls();
  const invoices = getInvoices();
  const admins = getAdmins();
  const projects = window.DB ? window.DB.getProjects() : [];
  const blogs = window.DB ? window.DB.getBlogs() : [];

  const kpiTotalCalls = document.getElementById('kpiTotalCalls');
  const countCallsBadge = document.getElementById('countCallsBadge');
  const kpiActiveInvoices = document.getElementById('kpiActiveInvoices');
  const countInvoicesBadge = document.getElementById('countInvoicesBadge');
  const countAdminsBadge = document.getElementById('countAdminsBadge');
  const countProjectsBadge = document.getElementById('countProjectsBadge');
  const kpiTotalProjects = document.getElementById('kpiTotalProjects');
  const countBlogsBadge = document.getElementById('countBlogsBadge');
  const kpiTotalBlogs = document.getElementById('kpiTotalBlogs');

  if (kpiTotalCalls) kpiTotalCalls.textContent = calls.length;
  if (countCallsBadge) countCallsBadge.textContent = calls.length;
  if (kpiActiveInvoices) kpiActiveInvoices.textContent = invoices.length;
  if (countInvoicesBadge) countInvoicesBadge.textContent = invoices.length;
  if (countAdminsBadge) countAdminsBadge.textContent = admins.length;
  if (countProjectsBadge) countProjectsBadge.textContent = projects.length;
  if (kpiTotalProjects) kpiTotalProjects.textContent = projects.length;
  if (countBlogsBadge) countBlogsBadge.textContent = blogs.length;
  if (kpiTotalBlogs) kpiTotalBlogs.textContent = `${blogs.length} Published Insights`;

  let collected = 0;
  let totalVolume = 0;
  let revRoad = 0;
  let revPM = 0;
  let revRE = 0;

  invoices.forEach(inv => {
    const amt = Number(inv.amount) || 0;
    totalVolume += amt;
    if (inv.status === 'Paid') {
      collected += amt;
    }

    // Category distribution
    const cat = (inv.category || '').toLowerCase();
    if (cat.includes('road')) revRoad += amt;
    else if (cat.includes('project') || cat.includes('epc') || cat.includes('management')) revPM += amt;
    else revRE += amt;
  });

  const kpiCollected = document.getElementById('kpiCollectedRevenue');
  const kpiVol = document.getElementById('kpiTotalVolume');
  const kpiRate = document.getElementById('kpiCollectionRate');
  const racGrand = document.getElementById('racGrandTotal');

  if (kpiCollected) kpiCollected.textContent = fmtNgn(collected);
  if (kpiVol) kpiVol.textContent = fmtNgn(totalVolume) + ' total volume';

  const rate = totalVolume > 0 ? ((collected / totalVolume) * 100).toFixed(1) : 0;
  if (kpiRate) kpiRate.textContent = `${rate}% collection rate`;
  if (racGrand) racGrand.textContent = 'Total Invoiced: ' + fmtNgn(totalVolume);

  const pctRoad = totalVolume > 0 ? (revRoad / totalVolume * 100) : 0;
  const pctPM = totalVolume > 0 ? (revPM / totalVolume * 100) : 0;
  const pctRE = totalVolume > 0 ? (revRE / totalVolume * 100) : 0;

  const barRoad = document.getElementById('barRoad');
  const barPM = document.getElementById('barPM');
  const barRE = document.getElementById('barRE');
  if (barRoad) barRoad.style.width = pctRoad + '%';
  if (barPM) barPM.style.width = pctPM + '%';
  if (barRE) barRE.style.width = pctRE + '%';

  const elPctRoad = document.getElementById('pctRoad');
  const elPctPM = document.getElementById('pctPM');
  const elPctRE = document.getElementById('pctRE');
  if (elPctRoad) elPctRoad.textContent = pctRoad.toFixed(1) + '%';
  if (elPctPM) elPctPM.textContent = pctPM.toFixed(1) + '%';
  if (elPctRE) elPctRE.textContent = pctRE.toFixed(1) + '%';

  const elRevRoad = document.getElementById('revRoad');
  const elRevPM = document.getElementById('revPM');
  const elRevRE = document.getElementById('revRE');
  if (elRevRoad) elRevRoad.textContent = fmtNgn(revRoad);
  if (elRevPM) elRevPM.textContent = fmtNgn(revPM);
  if (elRevRE) elRevRE.textContent = fmtNgn(revRE);
}

/* ==========================================================================
   CALL SCHEDULES TAB
   ========================================================================== */
function renderCalls() {
  const calls = getCalls();
  const tbody = document.getElementById('callsTableBody');
  if (!tbody) return;
  const search = (document.getElementById('searchCalls')?.value || '').toLowerCase();
  const statusFilter = document.getElementById('filterCallStatus')?.value || 'ALL';
  const serviceFilter = document.getElementById('filterCallService')?.value || 'ALL';

  const filtered = calls.filter(c => {
    const matchSearch = (c.client + ' ' + c.location + ' ' + c.contact).toLowerCase().includes(search);
    const matchStatus = statusFilter === 'ALL' || c.status === statusFilter;
    const matchService = serviceFilter === 'ALL' || c.service === serviceFilter;
    return matchSearch && matchStatus && matchService;
  });

  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:2rem; color:var(--on-petrol-soft);">No consultations found matching your filter criteria.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(c => {
    const dt = new Date(c.dateTime);
    const dtStr = isNaN(dt.getTime()) ? c.dateTime : dt.toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }) + ' at ' + dt.toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit' });
    const statusClass = c.status === 'Confirmed' ? 'status-confirmed' : c.status === 'Completed' ? 'status-paid' : 'status-pending';

    return `
      <tr>
        <td>
          <div class="td-main">${c.client}</div>
          <div class="td-sub">${c.contact}</div>
        </td>
        <td><span class="card__tag">${c.service}</span></td>
        <td>${c.location}</td>
        <td><strong>${dtStr}</strong></td>
        <td>${c.format}</td>
        <td>${c.budget}</td>
        <td><span class="status-pill ${statusClass}">${c.status}</span></td>
        <td>
          <div class="table-actions">
            ${c.status !== 'Completed' ? `<button class="table-btn" onclick="toggleCallComplete('${c.id}')" title="Mark Consultation Completed">✓ Done</button>` : ''}
            <button class="table-btn" onclick="deleteCall('${c.id}')" title="Remove Record">✕</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

/* ==========================================================================
   MILESTONE INVOICES TAB
   ========================================================================== */
function renderInvoices() {
  const invoices = getInvoices();
  const tbody = document.getElementById('invoicesTableBody');
  if (!tbody) return;
  const search = (document.getElementById('searchInvoices')?.value || '').toLowerCase();
  const statusFilter = document.getElementById('filterInvoiceStatus')?.value || 'ALL';

  const filtered = invoices.filter(inv => {
    const matchSearch = (inv.id + ' ' + inv.client + ' ' + inv.project + ' ' + inv.milestone).toLowerCase().includes(search);
    const matchStatus = statusFilter === 'ALL' || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:2rem; color:var(--on-petrol-soft);">No milestone invoices found matching your filter.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(inv => {
    const statusClass = inv.status === 'Paid' ? 'status-paid' : inv.status === 'Overdue' ? 'status-overdue' : 'status-pending';

    return `
      <tr>
        <td><strong>${inv.id}</strong></td>
        <td>
          <div class="td-main">${inv.client}</div>
          <div class="td-sub"><span class="card__tag" style="font-size:0.62rem;">${inv.category || 'General Civil'}</span></div>
        </td>
        <td>
          <div class="td-main" style="font-size:0.88rem;">${inv.project}</div>
          <div class="td-sub">${inv.milestone}</div>
        </td>
        <td><strong style="color:var(--accent);">${fmtNgn(inv.amount)}</strong></td>
        <td>${inv.issuedDate}</td>
        <td>${inv.dueDate}</td>
        <td><span class="status-pill ${statusClass}">${inv.status}</span></td>
        <td>
          <div class="table-actions">
            <button class="table-btn" onclick="openInvoicePreview('${inv.id}')" title="View & Print Official PDF">View</button>
            <button class="table-btn" onclick="openEditInvoiceModal('${inv.id}')" title="Edit Invoice Details">Edit</button>
            ${inv.status !== 'Paid' ? `<button class="table-btn btn-pay" onclick="markInvoicePaid('${inv.id}')">Mark Paid</button>` : ''}
            <button class="table-btn" onclick="deleteInvoice('${inv.id}')" title="Delete">✕</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

/* ==========================================================================
   PORTFOLIO PROJECTS TAB (ADD / DELETE EXECUTED PROJECTS)
   ========================================================================== */
function renderProjects() {
  const projects = window.DB ? window.DB.getProjects() : [];
  const tbody = document.getElementById('projectsTableBody');
  if (!tbody) return;

  if (!projects.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem; color:var(--on-petrol-soft);">No executed projects currently in portfolio.</td></tr>`;
    return;
  }

  tbody.innerHTML = projects.map(p => `
    <tr>
      <td>
        <div style="display:flex; align-items:center; gap:0.75rem;">
          <img src="${p.image}" alt="${p.title}" style="width:44px; height:32px; object-fit:cover; border-radius:3px; border:1px solid rgba(255,255,255,0.1);">
          <div>
            <div class="td-main">${p.title}</div>
            <div class="td-sub">${p.desc.substring(0, 50)}...</div>
          </div>
        </div>
      </td>
      <td><span class="card__tag">${p.categoryLabel || p.category}</span></td>
      <td>${p.client}</td>
      <td><strong style="color:var(--accent);">${p.budget}</strong></td>
      <td>${p.date}</td>
      <td>
        <div class="table-actions">
          <button class="table-btn" onclick="deleteProject('${p.id}')" title="Remove from Portfolio">Delete ✕</button>
        </div>
      </td>
    </tr>
  `).join('');
}

window.deleteProject = function(id) {
  if (!confirm('Are you sure you want to remove this project from the portfolio?')) return;
  let projects = window.DB.getProjects();
  projects = projects.filter(p => p.id !== id);
  window.DB.saveProjects(projects);
  renderProjects();
  updateKPIsAndChart();
};

/* ==========================================================================
   BLOGS & INSIGHTS TAB (ADD / DELETE ARTICLES)
   ========================================================================== */
function renderBlogs() {
  const blogs = window.DB ? window.DB.getBlogs() : [];
  const tbody = document.getElementById('blogsTableBody');
  if (!tbody) return;

  if (!blogs.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem; color:var(--on-petrol-soft);">No engineering insights published.</td></tr>`;
    return;
  }

  tbody.innerHTML = blogs.map(b => `
    <tr>
      <td>
        <div style="display:flex; align-items:center; gap:0.75rem;">
          <img src="${b.image}" alt="${b.title}" style="width:44px; height:32px; object-fit:cover; border-radius:3px; border:1px solid rgba(255,255,255,0.1);">
          <div>
            <div class="td-main">${b.title}</div>
            <div class="td-sub">${b.excerpt.substring(0, 50)}...</div>
          </div>
        </div>
      </td>
      <td><span class="card__tag" style="color:var(--accent); border:1px solid rgba(0,229,153,0.3);">${b.category}</span></td>
      <td>${b.author}</td>
      <td>${b.readTime || '5 min read'}</td>
      <td>${b.date}</td>
      <td>
        <div class="table-actions">
          <button class="table-btn" onclick="deleteBlog('${b.id}')" title="Delete Article">Delete ✕</button>
        </div>
      </td>
    </tr>
  `).join('');
}

window.deleteBlog = function(id) {
  if (!confirm('Are you sure you want to delete this engineering insight?')) return;
  let blogs = window.DB.getBlogs();
  blogs = blogs.filter(b => b.id !== id);
  window.DB.saveBlogs(blogs);
  renderBlogs();
  updateKPIsAndChart();
};

/* ==========================================================================
   ADMIN ACCESS CONTROL TAB
   ========================================================================== */
function renderAdmins() {
  const admins = getAdmins();
  const tbody = document.getElementById('adminsTableBody');
  if (!tbody) return;

  tbody.innerHTML = admins.map(a => `
    <tr>
      <td>
        <div class="td-main">${a.name}</div>
      </td>
      <td><strong>${a.email}</strong></td>
      <td><span class="card__tag" style="color:var(--accent); border:1px solid rgba(0,229,153,0.3); padding:0.2rem 0.6rem; border-radius:4px;">${a.role}</span></td>
      <td>${a.dateAdded}</td>
      <td><span class="status-pill status-paid">${a.status}</span></td>
      <td>
        <div class="table-actions">
          <button class="table-btn" onclick="deleteAdmin('${a.id}')" title="Revoke Administrator Access">Revoke Access ✕</button>
        </div>
      </td>
    </tr>
  `).join('');
}

window.deleteAdmin = function(id) {
  const admins = getAdmins();
  if (admins.length <= 1) {
    alert('Action Refused: You must retain at least one Super Admin in the system.');
    return;
  }
  if (!confirm('Are you sure you want to revoke administrative access for this email?')) return;
  const updated = admins.filter(a => a.id !== id);
  saveAdmins(updated);
  renderAdmins();
  updateKPIsAndChart();
};

/* ==========================================================================
   ACTIONS FOR CALLS & INVOICES
   ========================================================================== */
window.toggleCallComplete = function(id) {
  const calls = getCalls();
  const call = calls.find(c => c.id === id);
  if (call) {
    call.status = 'Completed';
    saveCalls(calls);
    renderCalls();
    updateKPIsAndChart();
  }
};

window.deleteCall = function(id) {
  if (!confirm('Are you sure you want to remove this consultation schedule?')) return;
  let calls = getCalls();
  calls = calls.filter(c => c.id !== id);
  saveCalls(calls);
  renderCalls();
  updateKPIsAndChart();
};

window.markInvoicePaid = function(id) {
  const invoices = getInvoices();
  const inv = invoices.find(i => i.id === id);
  if (inv) {
    inv.status = 'Paid';
    saveInvoices(invoices);
    renderInvoices();
    updateKPIsAndChart();
  }
};

window.deleteInvoice = function(id) {
  if (!confirm('Are you sure you want to delete invoice ' + id + '? This will permanently remove the record.')) return;
  let invoices = getInvoices();
  invoices = invoices.filter(i => i.id !== id);
  saveInvoices(invoices);
  renderInvoices();
  updateKPIsAndChart();
};

window.openEditInvoiceModal = function(id) {
  const invoices = getInvoices();
  const inv = invoices.find(i => i.id === id);
  if (!inv) return;

  document.getElementById('editInvOriginalId').value = inv.id;
  document.getElementById('editInvNumber').value = inv.id;
  document.getElementById('editInvClient').value = inv.client;
  document.getElementById('editInvCategory').value = inv.category || 'Road Construction';
  document.getElementById('editInvProject').value = inv.project;
  document.getElementById('editInvMilestone').value = inv.milestone;
  document.getElementById('editInvAmount').value = inv.amount;
  document.getElementById('editInvDueDate').value = inv.dueDate;
  document.getElementById('editInvStatus').value = inv.status;

  const modal = document.getElementById('modalEditInvoice');
  if (modal) modal.showModal();
};

window.openInvoicePreview = function(id) {
  const invoices = getInvoices();
  const inv = invoices.find(i => i.id === id);
  if (!inv) return;

  document.getElementById('printInvNumber').textContent = inv.id;
  document.getElementById('printInvClient').textContent = inv.client;
  document.getElementById('printInvProject').textContent = 'Project: ' + inv.project;
  document.getElementById('printInvDate').textContent = inv.issuedDate;
  document.getElementById('printInvDue').textContent = inv.dueDate;
  document.getElementById('printInvMilestone').textContent = inv.milestone;
  document.getElementById('printInvAmount').textContent = fmtNgn(inv.amount);
  document.getElementById('printInvTotal').textContent = fmtNgn(inv.amount);

  const statusEl = document.getElementById('printInvStatus');
  statusEl.textContent = inv.status.toUpperCase();
  statusEl.className = 'status-pill ' + (inv.status === 'Paid' ? 'status-paid' : inv.status === 'Overdue' ? 'status-overdue' : 'status-pending');

  const modal = document.getElementById('modalPrintInvoice');
  if (modal) modal.showModal();
};

/* ==========================================================================
   MODAL CONTROLLERS & FORM SUBMISSIONS
   ========================================================================== */
const modalInv = document.getElementById('modalInvoice');
const modalEditInv = document.getElementById('modalEditInvoice');
const modalCall = document.getElementById('modalCall');
const modalAddAdmin = document.getElementById('modalAddAdmin');
const modalAddProject = document.getElementById('modalAddProject');
const modalAddBlog = document.getElementById('modalAddBlog');

document.getElementById('btnNewInvoiceModal')?.addEventListener('click', () => modalInv?.showModal());
document.getElementById('btnCreateInvoiceQuick')?.addEventListener('click', () => modalInv?.showModal());
document.getElementById('btnNewCallModal')?.addEventListener('click', () => modalCall?.showModal());
document.getElementById('btnAddAdminModal')?.addEventListener('click', () => modalAddAdmin?.showModal());
document.getElementById('btnAddProjectModal')?.addEventListener('click', () => modalAddProject?.showModal());
document.getElementById('btnAddBlogModal')?.addEventListener('click', () => modalAddBlog?.showModal());

document.querySelectorAll('[data-close-modal]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.admin-modal').forEach(m => m.close());
  });
});

document.querySelectorAll('.admin-modal').forEach(m => {
  m.addEventListener('click', (e) => {
    if (e.target === m) m.close();
  });
});

// Submit: Add New Executed Project
document.getElementById('formAddProject')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('projTitle').value.trim();
  const client = document.getElementById('projClient').value.trim();
  const category = document.getElementById('projCategory').value;
  const budget = document.getElementById('projBudget').value.trim();
  const image = document.getElementById('projImage').value;
  const date = document.getElementById('projDate').value.trim();
  const desc = document.getElementById('projDesc').value.trim();

  const categoryLabels = {
    road: "Road Construction",
    management: "Project Management",
    realestate: "Real Estate"
  };

  const projects = window.DB.getProjects();
  const newProject = {
    id: "PROJ-0" + (projects.length + 1),
    title: title,
    category: category,
    categoryLabel: categoryLabels[category] || "Civil Engineering",
    client: client,
    budget: budget,
    image: image,
    desc: desc,
    date: date,
    gallery: [image, "media/pillar-roads.jpg", "media/case-flagship.jpg"]
  };

  projects.unshift(newProject);
  window.DB.saveProjects(projects);

  modalAddProject.close();
  e.target.reset();
  renderProjects();
  updateKPIsAndChart();
  alert(`Executed Project "${title}" published to portfolio!`);
});

// Submit: Publish New Blog / Insight
document.getElementById('formAddBlog')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('blogTitle').value.trim();
  const category = document.getElementById('blogCategory').value;
  const author = document.getElementById('blogAuthor').value.trim();
  const image = document.getElementById('blogImage').value;
  const readTime = document.getElementById('blogReadTime').value.trim();
  const excerpt = document.getElementById('blogExcerpt').value.trim();

  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const blogs = window.DB.getBlogs();
  const newBlog = {
    id: "BLOG-0" + (blogs.length + 1),
    title: title,
    category: category,
    author: author,
    date: today,
    readTime: readTime || "5 min read",
    image: image,
    excerpt: excerpt
  };

  blogs.unshift(newBlog);
  window.DB.saveBlogs(blogs);

  modalAddBlog.close();
  e.target.reset();
  renderBlogs();
  updateKPIsAndChart();
  alert(`Engineering Insight "${title}" published to landing page!`);
});

// Submit: New Invoice
document.getElementById('formNewInvoice')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const newInv = {
    id: document.getElementById('invNumber').value.trim(),
    client: document.getElementById('invClient').value.trim(),
    category: document.getElementById('invCategory').value,
    project: document.getElementById('invProject').value.trim(),
    milestone: document.getElementById('invMilestone').value.trim(),
    amount: Number(document.getElementById('invAmount').value),
    issuedDate: new Date().toISOString().split('T')[0],
    dueDate: document.getElementById('invDueDate').value,
    status: document.getElementById('invStatus').value
  };

  const invoices = getInvoices();
  invoices.unshift(newInv);
  saveInvoices(invoices);

  modalInv.close();
  e.target.reset();
  renderInvoices();
  updateKPIsAndChart();
  alert(`Milestone Invoice ${newInv.id} issued successfully!`);
});

// Submit: Edit Invoice
document.getElementById('formEditInvoice')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = document.getElementById('editInvOriginalId').value;
  const invoices = getInvoices();
  const inv = invoices.find(i => i.id === id);

  if (inv) {
    inv.client = document.getElementById('editInvClient').value.trim();
    inv.category = document.getElementById('editInvCategory').value;
    inv.project = document.getElementById('editInvProject').value.trim();
    inv.milestone = document.getElementById('editInvMilestone').value.trim();
    inv.amount = Number(document.getElementById('editInvAmount').value);
    inv.dueDate = document.getElementById('editInvDueDate').value;
    inv.status = document.getElementById('editInvStatus').value;

    saveInvoices(invoices);
    modalEditInv.close();
    renderInvoices();
    updateKPIsAndChart();
    alert(`Milestone Invoice ${id} updated successfully!`);
  }
});

// Submit: Add Admin
document.getElementById('formAddAdmin')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('adminNewEmail').value.trim().toLowerCase();
  const name = document.getElementById('adminNewName').value.trim();
  const role = document.getElementById('adminNewRole').value;

  const admins = getAdmins();
  if (admins.some(a => a.email.toLowerCase() === email)) {
    alert('An administrator with this corporate email address already exists.');
    return;
  }

  const newAdmin = {
    id: 'ADM-' + Math.floor(10 + Math.random() * 90),
    name: name,
    email: email,
    role: role,
    dateAdded: new Date().toISOString().split('T')[0],
    status: 'Active'
  };

  admins.push(newAdmin);
  saveAdmins(admins);

  modalAddAdmin.close();
  e.target.reset();
  renderAdmins();
  updateKPIsAndChart();
  alert(`Administrative access granted to ${email} (${role})!`);
});

// Submit: New Call
document.getElementById('formNewCall')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const newCall = {
    id: 'CALL-' + Math.floor(100 + Math.random() * 900),
    client: document.getElementById('callClient').value.trim(),
    contact: document.getElementById('callContact').value.trim(),
    service: document.getElementById('callService').value,
    location: document.getElementById('callLocation').value.trim(),
    dateTime: document.getElementById('callDateTime').value,
    format: document.getElementById('callFormat').value,
    budget: document.getElementById('callBudget').value,
    status: 'Confirmed'
  };

  const calls = getCalls();
  calls.unshift(newCall);
  saveCalls(calls);

  modalCall.close();
  e.target.reset();
  renderCalls();
  updateKPIsAndChart();
  alert(`Technical consultation scheduled with ${newCall.client}!`);
});

// Export CSV
document.getElementById('btnExportData')?.addEventListener('click', () => {
  const calls = getCalls();
  const invoices = getInvoices();
  const admins = getAdmins();
  const projects = window.DB ? window.DB.getProjects() : [];

  let csv = '=== DONALDS BAY LIMITED — CALL SCHEDULES ===\n';
  csv += 'ID,Client,Contact,Service,Location,Date_Time,Format,Budget,Status\n';
  calls.forEach(c => {
    csv += `"${c.id}","${c.client}","${c.contact}","${c.service}","${c.location}","${c.dateTime}","${c.format}","${c.budget}","${c.status}"\n`;
  });

  csv += '\n=== DONALDS BAY LIMITED — MILESTONE INVOICE LOGS ===\n';
  csv += 'Invoice_ID,Client,Category,Project,Milestone,Amount_NGN,Issued_Date,Due_Date,Status\n';
  invoices.forEach(i => {
    csv += `"${i.id}","${i.client}","${i.category || ''}","${i.project}","${i.milestone}",${i.amount},"${i.issuedDate}","${i.dueDate}","${i.status}"\n`;
  });

  csv += '\n=== DONALDS BAY LIMITED — AUTHORIZED ADMINISTRATORS ===\n';
  csv += 'ID,Name,Email,Role,Date_Added,Status\n';
  admins.forEach(a => {
    csv += `"${a.id}","${a.name}","${a.email}","${a.role}","${a.dateAdded}","${a.status}"\n`;
  });

  csv += '\n=== DONALDS BAY LIMITED — EXECUTED PORTFOLIO PROJECTS ===\n';
  csv += 'ID,Title,Category,Client,Budget,Date\n';
  projects.forEach(p => {
    csv += `"${p.id}","${p.title}","${p.categoryLabel || p.category}","${p.client}","${p.budget}","${p.date}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Donalds_Bay_Executive_Report_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
});

// Search & Filter Listeners
document.getElementById('searchCalls')?.addEventListener('input', renderCalls);
document.getElementById('filterCallStatus')?.addEventListener('change', renderCalls);
document.getElementById('filterCallService')?.addEventListener('change', renderCalls);

document.getElementById('searchInvoices')?.addEventListener('input', renderInvoices);
document.getElementById('filterInvoiceStatus')?.addEventListener('change', renderInvoices);

// Initial Invocations
renderCalls();
renderInvoices();
renderProjects();
renderBlogs();
renderAdmins();
updateKPIsAndChart();
