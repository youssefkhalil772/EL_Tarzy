'use strict';

const bcrypt = require('bcryptjs');

function seedData(db) {
  // ─── Company Settings ────────────────────────────────────────────────────────
  const settings = db.prepare('SELECT COUNT(*) as cnt FROM company_settings').get();
  if (settings.cnt === 0) {
    db.prepare(`
      INSERT INTO company_settings (id, company_name, receipt_footer, receipt_notes, show_tailor_name, show_customer_phone, currency)
      VALUES (1, 'اسم المحل', 'شكراً لزيارتكم', '', 1, 1, 'جنيه')
    `).run();
  } else {
    try {
      db.prepare(`
        UPDATE company_settings
        SET receipt_notes       = COALESCE(receipt_notes, ''),
            show_tailor_name    = COALESCE(show_tailor_name, 1),
            show_customer_phone = COALESCE(show_customer_phone, 1)
        WHERE id = 1
      `).run();
    } catch (e) { /* columns may not exist yet in old schema */ }
  }

  // ─── Invoice Sequence ────────────────────────────────────────────────────────
  const seqRow = db.prepare('SELECT COUNT(*) as cnt FROM invoice_sequence').get();
  if (seqRow.cnt === 0) {
    const year = new Date().getFullYear();
    db.prepare('INSERT INTO invoice_sequence (id, last_number, year) VALUES (1, 0, ?)').run(year);
  }

  // ─── Default Admin Employee ──────────────────────────────────────────────────
  const empCount = db.prepare('SELECT COUNT(*) as cnt FROM employees').get();
  if (empCount.cnt === 0) {
    db.prepare(`
      INSERT INTO employees (name, job_title, employee_type, username, password, is_active, monthly_salary)
      VALUES ('مدير النظام', 'مدير', 'مدير', 'admin', 'admin', 1, 0)
    `).run();
  }

  // ─── Default Admin User (bcrypt hashed) ─────────────────────────────────────
  const userCount = db.prepare('SELECT COUNT(*) as cnt FROM users').get();
  if (userCount.cnt === 0) {
    const adminEmp = db.prepare(`SELECT id FROM employees WHERE username = 'admin' OR job_title = 'مدير' LIMIT 1`).get();
    const empId = adminEmp ? adminEmp.id : null;
    const hash = bcrypt.hashSync('1234', 10);
    db.prepare(`
      INSERT INTO users (employee_id, username, password_hash, role, is_active)
      VALUES (?, 'admin', ?, 'admin', 1)
    `).run(empId, hash);
  }

  // ─── Default Treasury (zero opening balance) ─────────────────────────────────
  const tCount = db.prepare('SELECT COUNT(*) as cnt FROM treasury').get();
  if (tCount.cnt === 0) {
    db.prepare(`
      INSERT INTO treasury (type, description, amount, balance_after, treasury_type)
      VALUES ('إيراد', 'رصيد افتتاحي', 0, 0, 'الخزينة')
    `).run();
    db.prepare(`
      INSERT INTO treasury (type, description, amount, balance_after, treasury_type)
      VALUES ('إيراد', 'رصيد افتتاحي', 0, 0, 'فودافون كاش')
    `).run();
  }

  // ─── NOTE ────────────────────────────────────────────────────────────────────
  // No demo categories, services, or expense types are seeded.
  // The client adds their own data from scratch.
}

module.exports = { seedData };
