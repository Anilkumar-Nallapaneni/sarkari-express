export const INDIAN_LANGUAGES = [
  { code: "all", name: "All India", native: "All Languages", state: "All States" },
  { code: "as", name: "Assamese", native: "অসমীয়া", state: "Assam" },
  { code: "bn", name: "Bengali", native: "বাংলা", state: "West Bengal" },
  { code: "brx", name: "Bodo", native: "बड़ो", state: "Assam (BTR)" },
  { code: "en", name: "English", native: "English", state: "Official / Multi-state" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી", state: "Gujarat" },
  { code: "hi", name: "Hindi", native: "हिन्दी", state: "Hindi Belt States" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ", state: "Karnataka" },
  { code: "ks", name: "Kashmiri", native: "کٲشُر", state: "Jammu & Kashmir" },
  { code: "kok", name: "Konkani", native: "कोंकणी", state: "Goa" },
  { code: "mai", name: "Maithili", native: "मैथिली", state: "Bihar" },
  { code: "ml", name: "Malayalam", native: "മലയാളം", state: "Kerala" },
  { code: "mni", name: "Manipuri", native: "ꯃꯤꯇꯩꯂꯣꯟ", state: "Manipur" },
  { code: "mr", name: "Marathi", native: "मराठी", state: "Maharashtra" },
  { code: "ne", name: "Nepali", native: "नेपाली", state: "Sikkim / Darjeeling" },
  { code: "or", name: "Odia", native: "ଓଡ଼ିଆ", state: "Odisha" },
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ", state: "Punjab" },
  { code: "sa", name: "Sanskrit", native: "संस्कृतम्", state: "Classical / Academic" },
  { code: "sat", name: "Santali", native: "ᱥᱟᱱᱛᱟᱲᱤ", state: "Jharkhand / Odisha" },
  { code: "sd", name: "Sindhi", native: "सिन्धी", state: "Sindhi-speaking communities" },
  { code: "ta", name: "Tamil", native: "தமிழ்", state: "Tamil Nadu" },
  { code: "te", name: "Telugu", native: "తెలుగు", state: "Andhra Pradesh / Telangana" },
  { code: "ur", name: "Urdu", native: "اردو", state: "Telangana / UP / Bihar" },
  { code: "doi", name: "Dogri", native: "डोगरी", state: "Jammu region" },
  { code: "gom", name: "Goan Konkani", native: "कोंकणी", state: "Goa" },
  { code: "lus", name: "Mizo", native: "Mizo", state: "Mizoram" },
  { code: "raj", name: "Rajasthani", native: "राजस्थानी", state: "Rajasthan" },
  { code: "tcy", name: "Tulu", native: "ತುಳು", state: "Karnataka coast" },
];

export const STATE_LANGUAGE_MAP = {
  "Andhra Pradesh": "te",
  "Arunachal Pradesh": "en",
  Assam: "as",
  Bihar: "hi",
  Chhattisgarh: "hi",
  Goa: "kok",
  Gujarat: "gu",
  Haryana: "hi",
  "Himachal Pradesh": "hi",
  Jharkhand: "hi",
  Karnataka: "kn",
  Kerala: "ml",
  "Madhya Pradesh": "hi",
  Maharashtra: "mr",
  Manipur: "mni",
  Meghalaya: "en",
  Mizoram: "lus",
  Nagaland: "en",
  Odisha: "or",
  Punjab: "pa",
  Rajasthan: "raj",
  Sikkim: "ne",
  "Tamil Nadu": "ta",
  Telangana: "te",
  Tripura: "bn",
  "Uttar Pradesh": "hi",
  Uttarakhand: "hi",
  "West Bengal": "bn",
  Delhi: "hi",
  "Central Govt": "all",
};

export function getJobLanguageCodes(job) {
  const mapped = STATE_LANGUAGE_MAP[job.state];
  if (!mapped || mapped === "all") {
    return INDIAN_LANGUAGES.filter((lang) => lang.code !== "all").map((lang) => lang.code);
  }
  return [mapped];
}

const APPLY_NOW_LABELS = {
  all: "Apply Now",
  en: "Apply Now",
  hi: "अभी आवेदन करें",
  bn: "এখনই আবেদন করুন",
  te: "ఇప్పుడే దరఖాస్తు చేయండి",
  mr: "आता अर्ज करा",
  ta: "இப்போது விண்ணப்பிக்கவும்",
  ur: "ابھی درخواست دیں",
  gu: "હવે અરજી કરો",
  kn: "ಈಗಲೇ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
  ml: "ഇപ്പോൾ അപേക്ഷിക്കുക",
  or: "ଏବେ ଆବେଦନ କରନ୍ତୁ",
  pa: "ਹੁਣੇ ਅਰਜ਼ੀ ਦਿਓ",
  as: "এতিয়াই আবেদন কৰক",
  sd: "هاڻي درخواست ڏيو",
  ne: "अहिले आवेदन गर्नुहोस्",
  kok: "आता अर्ज करात",
  doi: "हुण अर्ज करो",
  mni: "ꯍꯧꯖꯤꯛ ꯑꯦꯄ꯭ꯂꯥꯏ ꯇꯧꯔꯣ",
  sa: "इदानीम् आवेदनं कुरुत",
  sat: "ᱱᱤᱛᱚᱜ ᱟᱵᱮᱫᱚᱱ ᱢᱮ",
  ks: "وُنئ درخواست كریو",
  brx: "दानि आबेदन खालाम",
  mai: "एखन आवेदन करू",
  gom: "आता अर्ज करात",
  lus: "Tunah apply rawh",
  raj: "अबे अरजी करो",
  tcy: "ಇಂಜಿನೆ ಅರ್ಜಿ ಮಲ್ಪುಲೆ",
};

export function getApplyNowLabel(languageCode = "all") {
  return APPLY_NOW_LABELS[languageCode] || APPLY_NOW_LABELS.en;
}

