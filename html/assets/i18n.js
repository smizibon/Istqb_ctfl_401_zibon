// CTFL Prep i18n — UI string dictionary (English default; Bangla when body.lang-bn).
// Load FIRST (before quiz/layout/progress). Engines call t(key, englishFallback).
window.CTFL_BN = {
  markRead: 'পড়া হয়েছিল বলুন',
  read: '✓ পড়া হয়েছে',
  expandAll: 'সব খুলুন ▾',
  collapseAll: 'সব বন্ধ করুন ▴',
  resetQuiz: '↺ কুইজ রিসেট',
  answered: 'উত্তর দেওয়া হয়েছে',
  correct: 'সঠিক',
  target: 'লক্ষ্য',
  targetMet: '— লক্ষ্য পূরণ হয়েছে',
  belowTarget: '— লক্ষ্যের নিচে',
  reviewThen: '। প্রতিটি ভুলের ব্যাখ্যা পড়ুন, তারপর আবার করতে ↺ রিসেট করুন।',
  chapterProgress: 'চ্যাপ্টার অগ্রগতি',
  reading: 'পড়া',
  sectionsWord: 'সেকশন',
  quizWord: 'কুইজ',
  quizTargetMet: '✅ কুইজের লক্ষ্য পূরণ — চ্যাপ্টার শেষ',
  quizBelow: '🔁 লক্ষ্যের নিচে — ভুলগুলো দেখুন, তারপর রিসেট করে আবার করুন',
  totalProgress: 'মোট অগ্রগতি',
  thChapter: 'চ্যাপ্টার',
  thProgress: 'অগ্রগতি',
  thQuiz: 'কুইজ স্কোর (লক্ষ্য)',
  completeCaption: 'চ্যাপ্টার সম্পূর্ণ · সম্পূর্ণ = সব সেকশন পড়া + প্রতিটি কুইজ প্রশ্নের উত্তর দেওয়া',
  startCaption: 'এখনো কিছু নেই — Ch 2 দিয়ে শুরু করুন, আপনার অগ্রগতি এখানে দেখা যাবে',
  persistsNote: 'এই ব্রাউজারে সংরক্ষিত'
};
window.t = function (key, en) {
  if (window.CTFL_BN && document.body && document.body.classList.contains('lang-bn')) {
    return window.CTFL_BN[key] || en;
  }
  return en;
};

// Apply stored site language IMMEDIATELY (this file loads before the UI engines,
// so their t() calls see the right language at construction time).
(function () {
  try {
    if (JSON.parse(localStorage.getItem('ctflg-lang')) === 'bn' && document.body) {
      document.body.classList.add('lang-bn');
    }
  } catch (e) {}
})();
