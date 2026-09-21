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

// Tab Switching
document.querySelectorAll('.admin-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById(tab.dataset.tab);
    if (target) target.classList.add('active');
  });
});

// Calculate and Update KPI Metrics & Revenue Distribution Chart
function updateKPIsAndChart() {
  const calls = getCalls();
  const invoices = getInvoices();
  const admins = getAdmins();

  document.getElementById('kpiTotalCalls').textContent = calls.length;
  document.getElementById('countCallsBadge').textContent = calls.length;
  document.getElementById('kpiActiveInvoices').textContent = invoices.length;
  document.getElementById('countInvoicesBadge').textContent = invoices.length;
  document.getElementById('countAdminsBadge').textContent = admins.length;

  let collected = 0;
  let pending = 0;
  let totalVolume = 0;
  let pendingCount = 0;

  let revRoad = 0;
  let revPM = 0;
  let revRE = 0;

  invoices.forEach(inv => {
    const amt = Number(inv.amount) || 0;
    totalVolume += amt;
    if (inv.status === 'Paid') {
      collected += amt;
    } else {
      pending += amt;
      pendingCount++;
    }

    // Category distribution
    const cat = (inv.category || '').toLowerCase();
    if (cat.includes('road')) revRoad += amt;
    else if (cat.includes('project') || cat.includes('epc')) revPM += amt;
    else revRE += amt;
  });

  document.getElementById('kpiCollectedRevenue').textContent = fmtNgn(collected);
  document.getElementById('kpiPendingRevenue').textContent = fmtNgn(pending);
  document.getElementById('kpiTotalVolume').textContent = fmtNgn(totalVolume) + ' total volume';
  document.getElementById('kpiPendingCount').textContent = `${pendingCount} invoices pending / overdue`;

  const rate = totalVolume > 0 ? ((collected / totalVolume) * 100).toFixed(1) : 0;
  document.getElementById('kpiCollectionRate').textContent = `${rate}% collection rate`;

  // Update Revenue Breakdown Chart
  document.getElementById('racGrandTotal').textContent = 'Total Invoiced: ' + fmtNgn(totalVolume);

  const pctRoad = totalVolume > 0 ? (revRoad / totalVolume * 100) : 0;
  const pctPM = totalVolume > 0 ? (revPM / totalVolume * 100) : 0;
  const pctRE = totalVolume > 0 ? (revRE / totalVolume * 100) : 0;

  document.getElementById('barRoad').style.width = pctRoad + '%';
  document.getElementById('barPM').style.width = pctPM + '%';
  document.getElementById('barRE').style.width = pctRE + '%';

  document.getElementById('pctRoad').textContent = pctRoad.toFixed(1) + '%';
  document.getElementById('pctPM').textContent = pctPM.toFixed(1) + '%';
  document.getElementById('pctRE').textContent = pctRE.toFixed(1) + '%';

  document.getElementById('revRoad').textContent = fmtNgn(revRoad);
  document.getElementById('revPM').textContent = fmtNgn(revPM);
  document.getElementById('revRE').textContent = fmtNgn(revRE);
}

// Render Calls Table
function renderCalls() {
  const calls = getCalls();
  const tbody = document.getElementById('callsTableBody');
  const search = document.getElementById('searchCalls').value.toLowerCase();
  const statusFilter = document.getElementById('filterCallStatus').value;
  const serviceFilter = document.getElementById('filterCallService').value;

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
    const dtStr = dt.toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }) + ' at ' + dt.toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit' });
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

// Render Invoices Table
function renderInvoices() {
  const invoices = getInvoices();
  const tbody = document.getElementById('invoicesTableBody');
  const search = document.getElementById('searchInvoices').value.toLowerCase();
  const statusFilter = document.getElementById('filterInvoiceStatus').value;

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

// Render Admin Team Table
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

// Actions for Calls
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

// Actions for Invoices (Edit, Delete, Mark Paid)
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

// Actions for Admin Management
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

// Printable Invoice Viewer
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

// Modal Open / Close Handlers
const modalInv = document.getElementById('modalInvoice');
const modalEditInv = document.getElementById('modalEditInvoice');
const modalCall = document.getElementById('modalCall');
const modalAddAdmin = document.getElementById('modalAddAdmin');

document.getElementById('btnNewInvoiceModal')?.addEventListener('click', () => modalInv.showModal());
document.getElementById('btnCreateInvoiceQuick')?.addEventListener('click', () => modalInv.showModal());
document.getElementById('btnNewCallModal')?.addEventListener('click', () => modalCall.showModal());
document.getElementById('btnAddAdminModal')?.addEventListener('click', () => modalAddAdmin.showModal());

document.querySelectorAll('[data-close-modal]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.admin-modal').forEach(m => m.close());
  });
});

// Modal Outside Click Close
document.querySelectorAll('.admin-modal').forEach(m => {
  m.addEventListener('click', (e) => {
    if (e.target === m) m.close();
  });
});

// Handle New Invoice Form Submission
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

// Handle Edit Invoice Form Submission
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

// Handle Add Admin Form Submission
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

// Handle New Call Schedule Form Submission
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

// CSV Exporter
document.getElementById('btnExportData')?.addEventListener('click', () => {
  const calls = getCalls();
  const invoices = getInvoices();
  const admins = getAdmins();

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

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Donalds_Bay_Executive_Report_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
});

// Filter Event Listeners
document.getElementById('searchCalls')?.addEventListener('input', renderCalls);
document.getElementById('filterCallStatus')?.addEventListener('change', renderCalls);
document.getElementById('filterCallService')?.addEventListener('change', renderCalls);

document.getElementById('searchInvoices')?.addEventListener('input', renderInvoices);
document.getElementById('filterInvoiceStatus')?.addEventListener('change', renderInvoices);

// Initial Render
renderCalls();
renderInvoices();
renderAdmins();
updateKPIsAndChart();
