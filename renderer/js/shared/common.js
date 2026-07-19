'use strict';

/**
 * دالة مشتركة لإظهار التنبيهات المنبثقة
 * @param {string} msg الرسالة
 * @param {string} type نوع التنبيه (success, error, warning, info)
 */
function showToast(msg, type = 'success') {
  if (typeof Swal !== 'undefined') {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: type,
      title: msg,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  } else {
    console.log(`[Toast ${type}] ${msg}`);
  }
}

/**
 * فتح المودال بناء على الـ ID
 * @param {string} id 
 */
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('open');
}

/**
 * إغلاق المودال بناء على الـ ID
 * @param {string} id 
 */
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
}

/**
 * الانتقال لصفحة أخرى
 * @param {string} page 
 */
function navigate(page) {
  if (window.electron && window.electron.navigate) {
    window.electron.navigate(page);
  } else {
    window.location.href = page;
  }
}

/**
 * الرجوع للصفحة الرئيسية
 */
function goBack() {
  navigate('main-dashboard.html');
}

/**
 * تنسيق الأرقام لخانة عشرية واحدة أو اثنتين
 * @param {number|string} n 
 * @returns {string}
 */
function fmt(n) {
  return Number(n || 0).toFixed(2);
}

/**
 * التحقق مما إذا كان المستخدم مديراً بناءً على الـ Session Storage
 * @returns {boolean}
 */
function checkAdmin() {
  const role = sessionStorage.getItem('elTarzy_role');
  return role === 'admin';
}

/**
 * تطبيق قيود العرض للمدير فقط
 * إخفاء أي عنصر يحمل كلاس .admin-only لو لم يكن المستخدم مديراً
 */
function enforceAdminUI() {
  if (!checkAdmin()) {
    document.querySelectorAll('.admin-only').forEach(el => {
      el.style.display = 'none';
    });
  }
}

