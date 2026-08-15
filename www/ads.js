document.addEventListener('deviceready', initAds);
window.addEventListener('load', () => setTimeout(initAds, 1500));

let adsInitialized = false;

async function initAds() {
  if (adsInitialized) return;
  if (!window.Capacitor || !window.Capacitor.Plugins || !window.Capacitor.Plugins.AdMob) {
    console.log('AdMob plugin غير متوفر');
    return;
  }
  adsInitialized = true;

  const { AdMob } = window.Capacitor.Plugins;

  try {
    await AdMob.initialize({
      testingDevices: [],
      initializeForTesting: true,
    });

    await AdMob.showBanner({
      adId: 'ca-app-pub-3940256099942544/6300978111',
      adSize: 'BANNER',
      position: 'BOTTOM_CENTER',
      margin: 0,
    });

    await prepareInterstitial();
  } catch (err) {
    console.error('خطأ في تهيئة الإعلانات:', err);
  }
}

async function prepareInterstitial() {
  const { AdMob } = window.Capacitor.Plugins;
  try {
    await AdMob.prepareInterstitial({
      adId: 'ca-app-pub-3940256099942544/1033173712',
    });
  } catch (err) {
    console.error('خطأ في تحضير الإعلان البيني:', err);
  }
}

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
