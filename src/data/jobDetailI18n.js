const EN = {
  back: "Back to Jobs",
  about: "About this Recruitment",
  ageLimit: "Age Limit",
  min: "Minimum",
  max: "Maximum",
  years: "years",
  ageNote: "Age relaxation applicable for SC/ST/OBC/PwD as per Govt. norms.",
  appFee: "Application Fee",
  howToApply: "How to Apply",
  dates: "Important Dates",
  notifDate: "Notification Date",
  lastDate: "Last Date to Apply",
  examDate: "Exam Date",
  totalPosts: "Total Posts",
  salary: "Salary",
  education: "Education",
  lastDateShort: "Last Date",
  examDateShort: "Exam Date",
  officialSite: "Apply on Official Site",
  officialWebsite: "Apply on Official Website",
  langNotice: "Advertisement view language",
  general: "General",
  scst: "SC/ST",
  female: "Female",
  free: "FREE",
  desc: (job) =>
    `${job.org} has released recruitment for ${job.title}. Department: ${job.dept}. Total posts: ${job.posts.toLocaleString("en-IN")}. Salary range: ${job.salary}. Candidates should complete the application process before ${job.deadline}.`,
  steps: (job) => [
    `Visit official portal: ${job.link}`,
    `Complete one-time registration for ${job.org}`,
    "Fill personal, education and category details",
    "Upload required photo, signature and documents",
    "Pay fee (if applicable) and submit form",
    "Download and save final application copy",
  ],
};

const HI = {
  ...EN,
  back: "नौकरियों पर वापस जाएं",
  about: "इस भर्ती के बारे में",
  ageLimit: "आयु सीमा",
  min: "न्यूनतम",
  max: "अधिकतम",
  years: "वर्ष",
  ageNote: "SC/ST/OBC/PwD के लिए आयु में छूट सरकारी नियमों के अनुसार लागू है।",
  appFee: "आवेदन शुल्क",
  howToApply: "आवेदन कैसे करें",
  dates: "महत्वपूर्ण तिथियां",
  notifDate: "अधिसूचना तिथि",
  lastDate: "आवेदन की अंतिम तिथि",
  examDate: "परीक्षा तिथि",
  totalPosts: "कुल पद",
  salary: "वेतन",
  education: "शैक्षणिक योग्यता",
  lastDateShort: "अंतिम तिथि",
  examDateShort: "परीक्षा तिथि",
  officialSite: "आधिकारिक साइट पर आवेदन करें",
  officialWebsite: "आधिकारिक वेबसाइट पर आवेदन करें",
  langNotice: "विज्ञापन भाषा",
  general: "सामान्य",
  scst: "एससी/एसटी",
  female: "महिला",
  free: "मुफ्त",
  desc: (job) =>
    `${job.org} ने ${job.title} के लिए भर्ती जारी की है। विभाग: ${job.dept}। कुल पद: ${job.posts.toLocaleString("en-IN")}। वेतन सीमा: ${job.salary}। उम्मीदवारों को ${job.deadline} से पहले आवेदन प्रक्रिया पूरी करनी चाहिए।`,
  steps: (job) => [
    `आधिकारिक पोर्टल पर जाएं: ${job.link}`,
    `${job.org} के लिए पंजीकरण पूरा करें`,
    "व्यक्तिगत, शैक्षणिक और श्रेणी विवरण भरें",
    "फोटो, हस्ताक्षर और दस्तावेज अपलोड करें",
    "शुल्क (यदि लागू हो) जमा करके फॉर्म सबमिट करें",
    "अंतिम आवेदन प्रति डाउनलोड करके सुरक्षित रखें",
  ],
};

const TE = {
  ...EN,
  back: "ఉద్యోగాలకు తిరిగి వెళ్ళండి",
  about: "ఈ నియామకం గురించి",
  ageLimit: "వయో పరిమితి",
  appFee: "దరఖాస్తు రుసుము",
  howToApply: "ఎలా దరఖాస్తు చేయాలి",
  dates: "ముఖ్యమైన తేదీలు",
  officialSite: "అధికారిక సైట్‌లో దరఖాస్తు చేయండి",
  officialWebsite: "అధికారిక వెబ్‌సైట్‌లో దరఖాస్తు చేయండి",
  langNotice: "ప్రకటన భాష",
  desc: (job) =>
    `${job.org} ద్వారా ${job.title} నియామక ప్రకటన విడుదలైంది. మొత్తం ఖాళీలు: ${job.posts.toLocaleString("en-IN")}। వేతనం: ${job.salary}। చివరి తేది: ${job.deadline}।`,
  steps: (job) => [
    `అధికారిక వెబ్‌సైట్‌కు వెళ్లండి: ${job.link}`,
    "రిజిస్ట్రేషన్ పూర్తి చేయండి",
    "దరఖాస్తు ఫారమ్ నింపండి",
    "ఫోటో/సంతకం/పత్రాలు అప్లోడ్ చేయండి",
    "ఫీజు చెల్లించి ఫారమ్ సమర్పించండి",
    "ఫైనల్ కాపీ డౌన్‌లోడ్ చేసుకోండి",
  ],
};

const TA = {
  ...EN,
  back: "வேலைகளுக்கு திரும்பவும்",
  about: "இந்த ஆட்சேர்ப்பு பற்றி",
  ageLimit: "வயது வரம்பு",
  appFee: "விண்ணப்பக் கட்டணம்",
  howToApply: "எப்படி விண்ணப்பிப்பது",
  dates: "முக்கிய தேதிகள்",
  officialSite: "அதிகாரப்பூர்வ தளத்தில் விண்ணப்பிக்கவும்",
  officialWebsite: "அதிகாரப்பூர்வ இணையதளத்தில் விண்ணப்பிக்கவும்",
  langNotice: "அறிவிப்பு மொழி",
  desc: (job) =>
    `${job.org} நிறுவனம் ${job.title} பணியிடங்களுக்கு அறிவிப்பு வெளியிட்டுள்ளது. மொத்த காலியிடங்கள்: ${job.posts.toLocaleString("en-IN")}। சம்பளம்: ${job.salary}। கடைசி தேதி: ${job.deadline}।`,
  steps: (job) => [
    `அதிகாரப்பூர்வ தளத்திற்குச் செல்லவும்: ${job.link}`,
    `${job.org} பதிவு செயல்முறையை முடிக்கவும்`,
    "தனிப்பட்ட மற்றும் கல்வி விவரங்களை நிரப்பவும்",
    "புகைப்படம், கையொப்பம் மற்றும் ஆவணங்களை பதிவேற்றவும்",
    "கட்டணம் (தேவையெனில்) செலுத்தி படிவத்தை சமர்ப்பிக்கவும்",
    "இறுதி விண்ணப்பத்தின் நகலை பதிவிறக்கம் செய்து சேமிக்கவும்",
  ],
};

const BN = {
  ...EN,
  back: "চাকরির তালিকায় ফিরে যান",
  about: "এই নিয়োগ সম্পর্কে",
  ageLimit: "বয়সসীমা",
  appFee: "আবেদন ফি",
  howToApply: "কীভাবে আবেদন করবেন",
  dates: "গুরুত্বপূর্ণ তারিখ",
  officialSite: "অফিসিয়াল সাইটে আবেদন করুন",
  officialWebsite: "অফিসিয়াল ওয়েবসাইটে আবেদন করুন",
  langNotice: "বিজ্ঞপ্তির ভাষা",
  desc: (job) =>
    `${job.org} এর ${job.title} নিয়োগ বিজ্ঞপ্তি প্রকাশিত হয়েছে। মোট পদ: ${job.posts.toLocaleString("en-IN")}। বেতন: ${job.salary}। শেষ তারিখ: ${job.deadline}।`,
  steps: (job) => [
    `অফিসিয়াল পোর্টালে যান: ${job.link}`,
    `${job.org} এর জন্য রেজিস্ট্রেশন সম্পূর্ণ করুন`,
    "ব্যক্তিগত, শিক্ষাগত ও শ্রেণির তথ্য পূরণ করুন",
    "ছবি, স্বাক্ষর ও প্রয়োজনীয় নথি আপলোড করুন",
    "ফি (যদি প্রযোজ্য হয়) দিয়ে ফর্ম জমা দিন",
    "চূড়ান্ত আবেদন কপি ডাউনলোড করে রাখুন",
  ],
};

const MR = {
  ...EN,
  back: "नोकऱ्यांकडे परत जा",
  about: "या भरतीबद्दल",
  ageLimit: "वयोमर्यादा",
  appFee: "अर्ज शुल्क",
  howToApply: "अर्ज कसा करावा",
  dates: "महत्वाच्या तारखा",
  officialSite: "अधिकृत साइटवर अर्ज करा",
  officialWebsite: "अधिकृत वेबसाइटवर अर्ज करा",
  langNotice: "जाहिरात भाषा",
  desc: (job) =>
    `${job.org} ने ${job.title} साठी भरती जाहीर केली आहे. एकूण पदे: ${job.posts.toLocaleString("en-IN")}। पगार: ${job.salary}। अंतिम तारीख: ${job.deadline}।`,
  steps: (job) => [
    `अधिकृत पोर्टलला भेट द्या: ${job.link}`,
    `${job.org} साठी नोंदणी पूर्ण करा`,
    "वैयक्तिक, शैक्षणिक आणि प्रवर्ग तपशील भरा",
    "फोटो, सही आणि आवश्यक कागदपत्रे अपलोड करा",
    "शुल्क (लागू असल्यास) भरून फॉर्म सबमिट करा",
    "अंतिम अर्जाची प्रत डाउनलोड करून जतन करा",
  ],
};

const GU = {
  ...EN,
  back: "નોકરીઓ પર પાછા જાઓ",
  about: "આ ભરતી વિશે",
  ageLimit: "વય મર્યાદા",
  appFee: "અરજી ફી",
  howToApply: "કેવી રીતે અરજી કરવી",
  dates: "મહત્વપૂર્ણ તારીખો",
  officialSite: "અધિકૃત સાઇટ પર અરજી કરો",
  officialWebsite: "અધિકૃત વેબસાઇટ પર અરજી કરો",
  langNotice: "જાહેરાત ભાષા",
  desc: (job) =>
    `${job.org} દ્વારા ${job.title} માટે ભરતી જાહેર કરવામાં આવી છે. કુલ જગ્યાઓ: ${job.posts.toLocaleString("en-IN")}। પગાર: ${job.salary}। છેલ્લી તારીખ: ${job.deadline}।`,
  steps: (job) => [
    `અધિકૃત પોર્ટલ પર જાઓ: ${job.link}`,
    `${job.org} માટે નોંધણી પૂર્ણ કરો`,
    "વ્યક્તિગત, શૈક્ષણિક અને વર્ગ વિગતો ભરો",
    "ફોટો, સહી અને જરૂરી દસ્તાવેજો અપલોડ કરો",
    "ફી (લાગુ હોય તો) ભરી ફોર્મ સબમિટ કરો",
    "અંતિમ અરજીની નકલ ડાઉનલોડ કરીને સાચવો",
  ],
};

const KN = {
  ...EN,
  back: "ಉದ್ಯೋಗಗಳಿಗೆ ಹಿಂತಿರುಗಿ",
  about: "ಈ ನೇಮಕಾತಿ ಕುರಿತು",
  ageLimit: "ವಯೋಮಿತಿ",
  appFee: "ಅರ್ಜಿಶುಲ್ಕ",
  howToApply: "ಹೇಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸುವುದು",
  dates: "ಪ್ರಮುಖ ದಿನಾಂಕಗಳು",
  officialSite: "ಅಧಿಕೃತ ತಾಣದಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
  officialWebsite: "ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
  langNotice: "ಜಾಹೀರಾತು ಭಾಷೆ",
  desc: (job) =>
    `${job.org} ವತಿಯಿಂದ ${job.title} ನೇಮಕಾತಿ ಪ್ರಕಟಿಸಲಾಗಿದೆ. ಒಟ್ಟು ಹುದ್ದೆಗಳು: ${job.posts.toLocaleString("en-IN")}। ವೇತನ: ${job.salary}। ಕೊನೆಯ ದಿನಾಂಕ: ${job.deadline}।`,
  steps: (job) => [
    `ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ಗೆ ಭೇಟಿ ನೀಡಿ: ${job.link}`,
    `${job.org}ಗಾಗಿ ನೋಂದಣಿ ಪೂರ್ಣಗೊಳಿಸಿ`,
    "ವೈಯಕ್ತಿಕ, ಶೈಕ್ಷಣಿಕ ಮತ್ತು ವರ್ಗ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ",
    "ಫೋಟೋ, ಸಹಿ ಮತ್ತು ಅಗತ್ಯ ದಾಖಲೆಗಳನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ",
    "ಅಗತ್ಯವಿದ್ದರೆ ಶುಲ್ಕ ಪಾವತಿಸಿ ಫಾರ್ಮ್ ಸಲ್ಲಿಸಿ",
    "ಅಂತಿಮ ಅರ್ಜಿಯ ಪ್ರತಿಯನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ ಉಳಿಸಿ",
  ],
};

const ML = {
  ...EN,
  back: "ജോലികളിലേക്ക് മടങ്ങുക",
  about: "ഈ നിയമനത്തെക്കുറിച്ച്",
  ageLimit: "പ്രായപരിധി",
  appFee: "അപേക്ഷ ഫീസ്",
  howToApply: "എങ്ങനെ അപേക്ഷിക്കാം",
  dates: "പ്രധാന തീയതികൾ",
  officialSite: "ഔദ്യോഗിക സൈറ്റിൽ അപേക്ഷിക്കുക",
  officialWebsite: "ഔദ്യോഗിക വെബ്സൈറ്റിൽ അപേക്ഷിക്കുക",
  langNotice: "വിജ്ഞാപന ഭാഷ",
  desc: (job) =>
    `${job.org} ${job.title} നിയമന വിജ്ഞാപനം പുറത്തിറക്കിയിരിക്കുന്നു. ആകെ ഒഴിവുകൾ: ${job.posts.toLocaleString("en-IN")}। ശമ്പളം: ${job.salary}। അവസാന തീയതി: ${job.deadline}।`,
  steps: (job) => [
    `ഔദ്യോഗിക പോർട്ടലിൽ പോകുക: ${job.link}`,
    `${job.org} രജിസ്ട്രേഷൻ പൂർത്തിയാക്കുക`,
    "സ്വകാര്യ, വിദ്യാഭ്യാസ, വിഭാഗ വിവരങ്ങൾ പൂരിപ്പിക്കുക",
    "ഫോട്ടോ, ഒപ്പ്, ആവശ്യമായ രേഖകൾ അപ്‌ലോഡ് ചെയ്യുക",
    "ഫീസ് (ആവശ്യമായാൽ) അടച്ച് ഫോം സമർപ്പിക്കുക",
    "അന്തിമ അപേക്ഷയുടെ പകർപ്പ് ഡൗൺലോഡ് ചെയ്ത് സൂക്ഷിക്കുക",
  ],
};

const PA = {
  ...EN,
  back: "ਨੌਕਰੀਆਂ ਵੱਲ ਵਾਪਸ ਜਾਓ",
  about: "ਇਸ ਭਰਤੀ ਬਾਰੇ",
  ageLimit: "ਉਮਰ ਸੀਮਾ",
  appFee: "ਅਰਜ਼ੀ ਫੀਸ",
  howToApply: "ਅਰਜ਼ੀ ਕਿਵੇਂ ਦੇਣੀ ਹੈ",
  dates: "ਮਹੱਤਵਪੂਰਨ ਤਾਰੀਖਾਂ",
  officialSite: "ਅਧਿਕਾਰਿਕ ਸਾਈਟ 'ਤੇ ਅਰਜ਼ੀ ਦਿਓ",
  officialWebsite: "ਅਧਿਕਾਰਿਕ ਵੈੱਬਸਾਈਟ 'ਤੇ ਅਰਜ਼ੀ ਦਿਓ",
  langNotice: "ਵਿਗਿਆਪਨ ਭਾਸ਼ਾ",
  desc: (job) =>
    `${job.org} ਵੱਲੋਂ ${job.title} ਲਈ ਭਰਤੀ ਜਾਰੀ ਕੀਤੀ ਗਈ ਹੈ। ਕੁੱਲ ਅਸਾਮੀਆਂ: ${job.posts.toLocaleString("en-IN")}। ਤਨਖਾਹ: ${job.salary}। ਆਖਰੀ ਮਿਤੀ: ${job.deadline}।`,
  steps: (job) => [
    `ਅਧਿਕਾਰਿਕ ਪੋਰਟਲ 'ਤੇ ਜਾਓ: ${job.link}`,
    `${job.org} ਲਈ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਪੂਰਾ ਕਰੋ`,
    "ਨਿੱਜੀ, ਸ਼ੈਖਸਿਕ ਅਤੇ ਵਰਗ ਦੀ ਜਾਣਕਾਰੀ ਭਰੋ",
    "ਫੋਟੋ, ਦਸਤਖਤ ਅਤੇ ਦਸਤਾਵੇਜ਼ ਅਪਲੋਡ ਕਰੋ",
    "ਫੀਸ (ਜੇ ਲਾਗੂ ਹੋਵੇ) ਭਰ ਕੇ ਫਾਰਮ ਜਮ੍ਹਾ ਕਰੋ",
    "ਅੰਤਿਮ ਅਰਜ਼ੀ ਦੀ ਕਾਪੀ ਡਾਊਨਲੋਡ ਕਰਕੇ ਸੰਭਾਲੋ",
  ],
};

const UR = {
  ...EN,
  back: "نوکریوں پر واپس جائیں",
  about: "اس بھرتی کے بارے میں",
  ageLimit: "عمر کی حد",
  appFee: "درخواست فیس",
  howToApply: "درخواست کیسے دیں",
  dates: "اہم تاریخیں",
  officialSite: "آفیشل سائٹ پر درخواست دیں",
  officialWebsite: "آفیشل ویب سائٹ پر درخواست دیں",
  langNotice: "اشتہار کی زبان",
  desc: (job) =>
    `${job.org} نے ${job.title} کے لئے بھرتی جاری کی ہے۔ کل آسامیوں کی تعداد: ${job.posts.toLocaleString("en-IN")}۔ تنخواہ: ${job.salary}۔ آخری تاریخ: ${job.deadline}۔`,
  steps: (job) => [
    `آفیشل پورٹل پر جائیں: ${job.link}`,
    `${job.org} کے لئے رجسٹریشن مکمل کریں`,
    "ذاتی، تعلیمی اور زمرہ کی تفصیلات بھریں",
    "تصویر، دستخط اور ضروری دستاویزات اپلوڈ کریں",
    "فیس (اگر لاگو ہو) ادا کرکے فارم جمع کریں",
    "حتمی درخواست کی کاپی ڈاؤن لوڈ کرکے محفوظ کریں",
  ],
};

const OR = {
  ...EN,
  back: "ଚାକିରିକୁ ଫେରନ୍ତୁ",
  about: "ଏହି ନିଯୁକ୍ତି ବିଷୟରେ",
  ageLimit: "ବୟସ ସୀମା",
  appFee: "ଆବେଦନ ଶୁଳ୍କ",
  howToApply: "କିପରି ଆବେଦନ କରିବେ",
  dates: "ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ତାରିଖ",
  officialSite: "ଅଧିକୃତ ସାଇଟରେ ଆବେଦନ କରନ୍ତୁ",
  officialWebsite: "ଅଧିକୃତ ୱେବସାଇଟରେ ଆବେଦନ କରନ୍ତୁ",
  langNotice: "ବିଜ୍ଞପ୍ତି ଭାଷା",
  desc: (job) =>
    `${job.org} ଦ୍ୱାରା ${job.title} ପାଇଁ ନିଯୁକ୍ତି ଜାରି ହୋଇଛି। ମୋଟ ପଦ: ${job.posts.toLocaleString("en-IN")}। ବେତନ: ${job.salary}। ଶେଷ ତାରିଖ: ${job.deadline}।`,
  steps: (job) => [
    `ଅଧିକୃତ ପୋର୍ଟାଲକୁ ଯାଆନ୍ତୁ: ${job.link}`,
    `${job.org} ପାଇଁ ପଞ୍ଜୀକରଣ ସମାପ୍ତ କରନ୍ତୁ`,
    "ବ୍ୟକ୍ତିଗତ, ଶିକ୍ଷାଗତ ଓ ଶ୍ରେଣୀ ବିବରଣୀ ଭରନ୍ତୁ",
    "ଫଟୋ, ସହି ଏବଂ ଆବଶ୍ୟକ ଦଳିଲ ଅପଲୋଡ୍ କରନ୍ତୁ",
    "ଶୁଳ୍କ (ଲାଗୁ ହେଲେ) ଦେଇ ଫର୍ମ ଦାଖଲ କରନ୍ତୁ",
    "ଅନ୍ତିମ ଆବେଦନ ପ୍ରତି ଡାଉନଲୋଡ୍ କରି ସଂରକ୍ଷଣ କରନ୍ତୁ",
  ],
};

const AS = {
  ...EN,
  back: "চাকৰিলৈ উভতি যাওক",
  about: "এই নিযুক্তিৰ বিষয়ে",
  ageLimit: "বয়স সীমা",
  appFee: "আবেদন মাচুল",
  howToApply: "কিদৰে আবেদন কৰিব",
  dates: "গুৰুত্বপূর্ণ তাৰিখ",
  officialSite: "অফিচিয়েল চাইটত আবেদন কৰক",
  officialWebsite: "অফিচিয়েল ৱেবছাইটত আবেদন কৰক",
  langNotice: "বিজ্ঞপ্তিৰ ভাষা",
  desc: (job) =>
    `${job.org} এ ${job.title} ৰ বাবে নিযুক্তি ঘোষণা কৰিছে। মুঠ পদ: ${job.posts.toLocaleString("en-IN")}। বেতন: ${job.salary}। অন্তিম তাৰিখ: ${job.deadline}।`,
  steps: (job) => [
    `অফিচিয়েল প'ৰ্টেললৈ যাওক: ${job.link}`,
    `${job.org} ৰ বাবে পঞ্জীয়ন সম্পূৰ্ণ কৰক`,
    "ব্যক্তিগত, শিক্ষাগত আৰু শ্ৰেণীৰ তথ্য পূৰণ কৰক",
    "ফটো, স্বাক্ষৰ আৰু প্ৰয়োজনীয় নথি আপলোড কৰক",
    "মাচুল (যদি প্ৰযোজ্য) দি ফৰ্ম জমা কৰক",
    "চূড়ান্ত আবেদন কপি ডাউনলোড কৰি সংৰক্ষণ কৰক",
  ],
};

const NE = {
  ...EN,
  back: "जागिर सूचीमा फर्कनुहोस्",
  about: "यो भर्तीबारे",
  ageLimit: "उमेर सीमा",
  appFee: "आवेदन शुल्क",
  howToApply: "कसरी आवेदन गर्ने",
  dates: "महत्वपूर्ण मितिहरू",
  officialSite: "आधिकारिक साइटमा आवेदन गर्नुहोस्",
  officialWebsite: "आधिकारिक वेबसाइटमा आवेदन गर्नुहोस्",
  langNotice: "विज्ञापन भाषा",
  desc: (job) =>
    `${job.org} ले ${job.title} को लागि भर्ती जारी गरेको छ। कुल पद: ${job.posts.toLocaleString("en-IN")}। तलब: ${job.salary}। अन्तिम मिति: ${job.deadline}।`,
  steps: (job) => [
    `आधिकारिक पोर्टलमा जानुहोस्: ${job.link}`,
    `${job.org} को दर्ता पूरा गर्नुहोस्`,
    "व्यक्तिगत, शैक्षिक र श्रेणी विवरण भर्नुहोस्",
    "फोटो, हस्ताक्षर र आवश्यक कागजात अपलोड गर्नुहोस्",
    "शुल्क (लागू भएमा) तिरेर फारम बुझाउनुहोस्",
    "अन्तिम आवेदन प्रतिलिपि डाउनलोड गरी सुरक्षित राख्नुहोस्",
  ],
};

const SD = {
  ...EN,
  back: "نوڪرين ڏانهن واپس وڃو",
  about: "هن ڀرتي بابت",
  ageLimit: "عمر جي حد",
  appFee: "درخواست فيس",
  howToApply: "ڪيئن درخواست ڪجي",
  dates: "اهم تاريخون",
  officialSite: "سرڪاري سائيٽ تي درخواست ڏيو",
  officialWebsite: "سرڪاري ويب سائيٽ تي درخواست ڏيو",
  langNotice: "اشتهار جي ٻولي",
  desc: (job) =>
    `${job.org} پاران ${job.title} لاءِ ڀرتي جاري ڪئي وئي آهي. ڪل جايون: ${job.posts.toLocaleString("en-IN")}۔ پگهار: ${job.salary}۔ آخري تاريخ: ${job.deadline}۔`,
};

const KOK = {
  ...MR,
  back: "नोकऱ्यांक वळी वता",
  about: "ह्या भरती बाबत",
  langNotice: "जाहिरात भास",
};

const DOI = {
  ...HI,
  back: "नौकरियें बापस जाओ",
  about: "इस भर्ती बारे",
  langNotice: "इश्तिहार दी भाषा",
};

const MNI = {
  ...EN,
  back: "ꯊꯧꯔꯥꯡꯁꯤꯡꯗ ꯍꯟꯊꯔꯛꯎ",
  about: "ꯁꯤ ꯃꯔꯨꯝꯗ ꯄꯥꯝꯕ",
  ageLimit: "ꯃꯍꯥꯛ ꯍꯣꯡꯕ",
  appFee: "ꯑꯦꯄ꯭ꯂꯤꯀꯦꯁꯟ ꯐꯤ",
  howToApply: "ꯀꯩꯁꯨ ꯑꯦꯄ꯭ꯂꯥꯏ ꯇꯧꯔꯤ",
  dates: "ꯃꯔꯨꯑꯣꯟ ꯇꯥꯔꯤꯛ",
  officialSite: "ꯑꯣꯐꯤꯁꯤꯌꯦꯜ ꯁꯥꯏꯠꯇ ꯑꯦꯄ꯭ꯂꯥꯏ ꯇꯧꯔꯨ",
  officialWebsite: "ꯑꯣꯐꯤꯁꯤꯌꯦꯜ ꯋꯦꯕꯁꯥꯏꯠꯇ ꯑꯦꯄ꯭ꯂꯥꯏ ꯇꯧꯔꯨ",
  langNotice: "ꯃꯤꯄꯨꯟ ꯂꯣꯟ",
};

const SA = {
  ...HI,
  back: "नौकरीषु प्रतिगच्छतु",
  about: "अस्य नियुक्तेः विषये",
  howToApply: "कथम् आवेदनं करोतु",
  dates: "महत्वपूर्ण-तिथयः",
  langNotice: "विज्ञापन-भाषा",
};

const SAT = {
  ...EN,
  back: "ᱠᱟᱹᱢᱤ ᱨᱮ ᱞᱟᱹᱫᱟᱹᱭ",
  about: "ᱱᱚᱣᱟ ᱱᱤᱭᱩᱠᱛᱤ ᱵᱟᱵᱟᱛ",
  ageLimit: "ᱚᱢᱚᱨ ᱥᱤᱢᱟ",
  appFee: "ᱟᱵᱮᱫᱚᱱ ᱯᱷᱤ",
  howToApply: "ᱪᱮᱫ ᱞᱮᱠᱟ ᱟᱵᱮᱫᱚᱱ",
  dates: "ᱢᱟᱨᱟᱝ ᱢᱟᱦᱤᱛ",
  officialSite: "ᱚᱯᱷᱤᱥᱤᱭᱟᱞ ᱥᱟᱭᱤᱛ ᱨᱮ ᱟᱵᱮᱫᱚᱱ",
  officialWebsite: "ᱚᱯᱷᱤᱥᱤᱭᱟᱞ ᱣᱮᱵᱥᱟᱭᱤᱛ ᱨᱮ ᱟᱵᱮᱫᱚᱱ",
  langNotice: "ᱵᱤᱡᱚᱡᱯᱚᱱ ᱯᱟᱹᱨᱥᱤ",
};

const KS = {
  ...UR,
  back: "روزگارس پٮ۪ٹھ واپس گژھیو",
  about: "یِم بھرتی متعلق",
  langNotice: "اشتہارٕچ زبان",
};

const BRX = {
  ...AS,
  back: "खामानिनो फैदों",
  about: "बे भार्ति सम",
  langNotice: "बिजांनाय राव",
};

const MAI = {
  ...HI,
  back: "नोकरी पर फेर जाउ",
  about: "ई भर्ती के बारे में",
  langNotice: "विज्ञापन भाषा",
};

const GOM = {
  ...KOK,
  langNotice: "जाहिरात भास",
};

const LUS = {
  ...EN,
  back: "Hnathawh lamah kir leh rawh",
  about: "He recruitment chungchang",
  ageLimit: "Kum bituk",
  appFee: "Dilna fee",
  howToApply: "Engtin nge apply ang",
  dates: "Ni pawimawhte",
  officialSite: "Official site-ah apply rawh",
  officialWebsite: "Official website-ah apply rawh",
  langNotice: "Advertisement tawng",
  desc: (job) =>
    `${job.org} chuan ${job.title} atan recruitment a siam tawh a ni. Post zawng zawng: ${job.posts.toLocaleString("en-IN")}। Salary: ${job.salary}। Ni hnuhnung: ${job.deadline}।`,
};

const RAJ = {
  ...HI,
  back: "नोकरी पाछा जाओ",
  about: "ई भर्ती रा बारे में",
  langNotice: "जाहिरात री भाषा",
};

const TCY = {
  ...KN,
  back: "ಕೆಲಸೊರ್ ಪಿರೆ ಬರ್ಪುಲೆ",
  about: "ಈ ನೇಮಕಾತಿ ಪಂದ್",
  howToApply: "ಅರ್ಜಿಯೆ ಮಲ್ಪುನ ಎಂಚಿನೆ",
  langNotice: "ಜಾಹೀರಾತು ಭಾಷೆ",
};

const I18N = {
  all: EN,
  en: EN,
  hi: HI,
  bn: BN,
  te: TE,
  mr: MR,
  ta: TA,
  ur: UR,
  gu: GU,
  kn: KN,
  ml: ML,
  or: OR,
  pa: PA,
  as: AS,
  sd: SD,
  ne: NE,
  kok: KOK,
  doi: DOI,
  mni: MNI,
  sa: SA,
  sat: SAT,
  ks: KS,
  brx: BRX,
  mai: MAI,
  gom: GOM,
  lus: LUS,
  raj: RAJ,
  tcy: TCY,
};

export function getJobDetailText(languageCode = "en", job) {
  const t = I18N[languageCode] || EN;
  return {
    ...t,
    descText: t.desc(job),
    stepList: t.steps(job),
  };
}

