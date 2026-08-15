// ==============================================
// إدارة إعلانات AdMob
// هذا الملف يعمل فقط داخل تطبيق Capacitor المبني (مو داخل المتصفح العادي)
// ==============================================

document.addEventListener('deviceready', initAds);
window.addEventListener('load', () => setTimeout(initAds, 1500));

let adsInitialized = false;

async function initAds() {
  if (adsInitialized) return;
  if (!window.Capacitor || !window.Capacitor.Plugins || !window.Capacitor.Plugins.AdMob) {
    console.log('AdMob plugin غير متوفر (تعمل الآن خارج تطبيق مبني بالكامل)');
    return;
  }
  adsInitialized = true;

  const { AdMob } = window.Capacitor.Plugins;

  try {
    await AdMob.initialize({
      testingDevices: [],
      initializeForTesting: true,
    });

    // ---------- إعلان البانر (يظهر أسفل الشاشة دائماً) ----------
    await AdMob.showBanner({
      adId: 'ca-app-pub-9756891557211625/6840488473', // معرف البانر الحقيقي
      adSize: 'BANNER',
      position: 'BOTTOM_CENTER',
      margin: 0,
    });

    // تحضير أول إعلان بيني مسبقاً
    await prepareInterstitial();
  } catch (err) {
    console.error('خطأ في تهيئة الإعلانات:', err);
  }
}

async function prepareInterstitial() {
  const { AdMob } = window.Capacitor.Plugins;
  try {
    await AdMob.prepareInterstitial({
      adId: 'ca-app-pub-3940256099942544/1033173712', // Test Interstitial ID من جوجل (مؤقت لحد ما تعطيني رقمك الحقيقي)
    });
  } catch (err) {
    console.error('خطأ في تحضير الإعلان البيني:', err);
  }
}

// دالة تُستدعى من التطبيق (كل 100 تسبيحة مثلاً)
window.showInterstitialAd = async function () {
  if (!window.Capacitor || !window.Capacitor.Plugins || !window.Capacitor.Plugins.AdMob) return;
  const { AdMob } = window.Capacitor.Plugins;
  try {
    await AdMob.showInterstitial();
    await prepareInterstitial();
  } catch (err) {
    console.error('خطأ في عرض الإعلان البيني:', err);
  }
};
