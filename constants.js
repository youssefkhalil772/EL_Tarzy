'use strict';

// ═══════════════════════════════════════════════════════════════════════════════
//  ثوابت النظام — constants.js
//  تُستخدم في backend و frontend (عبر preload)
// ═══════════════════════════════════════════════════════════════════════════════

const ROLES = {
  ADMIN: 'admin',
  CASHIER: 'cashier',
};

const SHIFT_STATUS = {
  OPEN: 'مفتوح',
  CLOSED: 'مغلق',
};

const INVOICE_STATUS = {
  IN_PROGRESS: 'تحت الشغل',
  READY: 'جاهز للاستلام',
  DELIVERED: 'تم التسليم',
  RETURNED: 'مرتجع',
};

const TREASURY_TYPES = {
  CASH: 'الخزينة',
  VODAFONE: 'فودافون كاش',
};

const ENTRY_TYPES = {
  INCOME: 'إيراد',
  EXPENSE: 'مصروف',
};

const PAYMENT_METHODS = {
  CASH: 'نقدي',
  VODAFONE: 'فودافون كاش',
  DEFERRED: 'آجل',
};

const EMPLOYEE_TYPES = {
  REGULAR: 'موظف عادي',
  MANAGER: 'مدير',
  TAILOR: 'خياط',
};

const SALARY_TYPES = {
  FIXED: 'ثابت',
  COMMISSION: 'عمولة',
  MIXED: 'مختلط',
};

module.exports = {
  ROLES,
  SHIFT_STATUS,
  INVOICE_STATUS,
  TREASURY_TYPES,
  ENTRY_TYPES,
  PAYMENT_METHODS,
  EMPLOYEE_TYPES,
  SALARY_TYPES,
};
