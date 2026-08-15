# تطبيق سُبحان — تحويل إلى APK

هذا المجلد مشروع **Capacitor** جاهز، يحتوي تطبيق الويب (`www/index.html`) الذي بنيناه، بالإضافة إلى إعدادات AdMob. لا يمكن إنشاء ملف APK داخل هذه البيئة (لا يوجد اتصال إنترنت ولا Android SDK هنا)، لكن هذا المشروع جاهز لتبنيه محليًا على جهازك خلال دقائق.

## المتطلبات على جهازك
1. **Node.js** (نسخة 18 أو أحدث) — https://nodejs.org
2. **Android Studio** (يثبّت معه Android SDK) — https://developer.android.com/studio
3. **Java JDK 17**

## خطوات البناء

### 1) فك الضغط وتثبيت الحزم
```bash
cd tasbih-capacitor
npm install
```

### 2) إضافة منصة أندرويد
```bash
npx cap add android
```
هذا يُنشئ مجلد `android/` كمشروع أندرويد كامل.

### 3) مزامنة ملفات الويب والإضافات مع مشروع أندرويد
```bash
npx cap sync android
```

### 4) تفعيل AdMob App ID داخل AndroidManifest (خطوة تأكيد)
افتح الملف:
```
android/app/src/main/AndroidManifest.xml
```
وتأكد من وجود هذا السطر داخل `<application>` (عادة يضيفه plugin تلقائيًا، وإن لم يكن موجودًا أضفه يدويًا):
```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-9756891557211625~8153570143"/>
```

### 5) بناء ملف APK
**الطريقة الأولى — عبر Android Studio (الأسهل):**
```bash
npx cap open android
```
ثم من داخل Android Studio: `Build → Build Bundle(s) / APK(s) → Build APK(s)`
سيظهر ملف APK داخل: `android/app/build/outputs/apk/debug/app-debug.apk`

**الطريقة الثانية — عبر سطر الأوامر مباشرة:**
```bash
cd android
./gradlew assembleDebug
```
الملف الناتج: `android/app/build/outputs/apk/debug/app-debug.apk`

### 6) نسخة الإصدار النهائي (Release) للنشر على المتجر
لبناء نسخة موقّعة وجاهزة للنشر على Google Play، تحتاج لإنشاء مفتاح توقيع (Keystore) ثم:
```bash
cd android
./gradlew assembleRelease
```
راجع توثيق Capacitor لتفاصيل التوقيع: https://capacitorjs.com/docs/android/deploying-to-google-play

## ملاحظات حول إعلانات AdMob
- الكود داخل `www/index.html` يحاول تفعيل بانر AdMob حقيقي تلقائيًا فور تشغيل التطبيق كتطبيق أندرويد (باستخدام `@capacitor-community/admob`)، ويُخفي الشريط النائب (Placeholder) تلقائيًا عند نجاح ذلك.
- إذا فتحت `www/index.html` مباشرة في متصفح، سيبقى الشريط النائب ظاهرًا لأن AdMob لا يعمل خارج تطبيق أندرويد حقيقي.
- **مهم:** إعلانات AdMob الحقيقية (المرتبطة بحساب AdSense/AdMob الخاص بك) تحتاج أن يكون حساب AdMob لديك مفعّلاً والتطبيق منشورًا أو في وضع الاختبار، وإلا فلن تُعرض إعلانات فعلية. يمكنك استخدام معرّفات AdMob التجريبية للاختبار أولًا:
  - App ID تجريبي: `ca-app-pub-3940256099942544~3347511713`
  - Banner Unit تجريبي: `ca-app-pub-3940256099942544/6300978111`

## هيكل المشروع
```
tasbih-capacitor/
├── package.json          ← الحزم المطلوبة (Capacitor + AdMob)
├── capacitor.config.json ← إعدادات التطبيق (الاسم، appId، AdMob)
├── www/
│   └── index.html        ← التطبيق كاملاً (HTML/CSS/JS)
└── README.md              ← هذا الملف
```

## تخصيص إضافي
- **اسم التطبيق وأيقونته:** غيّر `appName` في `capacitor.config.json`، وأضف الأيقونات عبر أداة `npx @capacitor/assets generate` بعد وضع أيقونة `icon.png` (1024×1024) في مجلد `resources/`.
- **معرّف الحزمة (Package Name):** غيّر `appId` في `capacitor.config.json` قبل تنفيذ `npx cap add android` (لا يمكن تغييره بسهولة بعد إنشاء مشروع أندرويد).
