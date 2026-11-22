// Light EN/HI translation layer. STR holds every piece of static UI copy in
// the app, keyed by short identifiers. Components read the active language's
// object via the `useApp()` hook (see lib/context.tsx) as `t`.
export type Lang = "en" | "hi";

export const STR = {
  en: {
    tagline: "Healthcare that reaches every village",
    sub: "One connected platform for patients, doctors and health authorities — AI triage, live vitals, emergency dispatch and disease surveillance, built for low-connectivity rural India.",
    enterAs: "Enter as",
    patient: "Patient", doctor: "Doctor", government: "Government",
    dashboard: "Dashboard", assistant: "AI Assistant", vitals: "Vitals",
    records: "Records", doctors: "Doctors", appointments: "Appointments",
    medicines: "Medicines", emergency: "Emergency", patients: "Patients",
    consultations: "Consultations", map: "Disease Map", diseases: "Diseases",
    hospitals: "Hospitals", greeting: "Tell me what you're feeling — I'll do a preliminary safety check.",

    // Shell / top bar
    logOut: "Log out", online: "Online", offlineCached: "Offline (cached)",
    offlineBanner: "You're offline — showing cached data. Any changes you make are queued and will sync automatically once connection returns.",
    portalSuffix: "portal",

    // Login / register
    loginTitle: "Sign in to AarogyaNet",
    loginSub: "Demo authentication — role-based access, JWT issued on continue.",
    backHome: "← Back to home",
    fullName: "Full name",
    idLabelPatient: "Health ID or phone number",
    idLabelDoctor: "Medical license number",
    idLabelGov: "Department ID",
    continueBtn: "Continue",
    authNote: "Password hashing, JWT validation and RBAC are simulated for this prototype demo.",
    registerTitle: "Create an account",
    registerSub: "Demo registration — in production this calls POST /api/auth/register.",
    haveAccount: "Already have an account?",
    goLogin: "Sign in instead",
    noAccount: "New here?",
    goRegister: "Create an account",
    createAccount: "Create account",

    // Landing
    loginBtn: "Log in",
    badge: "Rural Healthcare & Pandemic Response Platform",
    stat1: "districts covered (demo)", stat2: "avg. simulated dispatch", stat3: "voice-ready languages",
    ecosystemHeading: "How the ecosystem connects",
    ecosystemNote: "Shared authentication, one backend and one database power every dashboard — not isolated feature pages.",
    builtHeading: "Built as one working prototype",
    builtSub: "Every module below is wired into the same demo session — try switching roles from the login screen.",
    footerNote: "Prototype build — uses synthetic demo data throughout. AI output is a preliminary assessment, not a medical diagnosis.",
    mod1Title: "AI Medical Assistant", mod1Desc: "Symptom intake with safe, preliminary next-step guidance.",
    mod2Title: "IoT Vital Monitoring", mod2Desc: "Real-time temperature, heart rate and SpO₂ with abnormal alerts.",
    mod3Title: "GIS Disease Map", mod3Desc: "Live hotspot surveillance across districts for health authorities.",
    mod4Title: "Emergency Response", mod4Desc: "Nearest hospital, bed availability and ambulance dispatch.",
    mod5Title: "Digital Health ID", mod5Desc: "One verified ID with QR access, protected behind authentication.",
    mod6Title: "Record Verification", mod6Desc: "Hash-based integrity layer for every health record.",

    // Patient dashboard
    welcomeBack: "Welcome back,", todayStatus: "Here's where things stand today.",
    healthScoreLabel: "OVERALL HEALTH SCORE", tempLabel: "Temp", hrLabel: "Heart rate", spo2Label: "SpO₂",
    quickActions: "QUICK ACTIONS", qaAssistant: "Ask AI Assistant", qaVitals: "Start Vitals Monitor",
    qaRecords: "View Health Records", qaEmergency: "Emergency",
    upcomingAppt: "UPCOMING APPOINTMENT", apptDoctorLine: "Dr. Kavita Rao — General Physician",
    apptWhen: "Thu, 18 Sep · 11:30 AM · Video consultation",
    digitalHealthIdLabel: "DIGITAL HEALTH ID", tapRecords: "Open Records to view & verify",

    // Vitals
    vitalsSubtitle: "Simulator mode — demonstrates real-time IoT streaming without physical sensors.",
    alarmMsg: "Abnormal vitals detected — SpO₂ dropping, heart rate rising.",
    triggerEmergency: "Trigger Emergency", temperatureLabel: "Temperature",
    startSim: "Start simulator", stopSim: "Stop simulator",

    // AI Assistant
    assistantPrompt: "Select the symptoms you're experiencing and roughly how long they've lasted.",
    symFever: "Fever", symCough: "Cough", symBodyPain: "Body pain", symBreathlessness: "Breathlessness",
    symFatigue: "Fatigue", symDiarrhoea: "Diarrhoea",
    durationLabel: "Duration", dur1: "<1 day", dur2: "1-2 days", dur3: "3-4 days", dur4: "5+ days",
    runAssessment: "Run preliminary assessment",
    resultPlaceholder: "Your preliminary risk result will appear here once you run an assessment.",
    preliminaryRisk: "PRELIMINARY RISK",
    riskHighMsg: "Your symptoms suggest urgent care may be needed. Please contact a doctor or nearby health facility as soon as possible.",
    riskModerateMsg: "Monitor your symptoms closely over the next 24 hours and consider booking a consultation.",
    riskLowMsg: "Your symptoms appear mild. Rest, stay hydrated, and monitor for changes.",
    aiDisclaimer: "This is an AI-assisted preliminary assessment based on demo data — not a medical diagnosis. Always consult a qualified doctor.",
    escalate: "Escalate to Emergency",

    // Health records
    recordsTitle: "Health records & Digital Health ID",
    digitalHealthIdCardLabel: "DIGITAL HEALTH ID",
    demoQrNote: "Demo QR — illustrative only, not a real scan target.",
    authGranted: "Authenticated — record access granted", simulateScan: "Simulate authenticated scan",
    publicScanNote: "A public QR scan never exposes the full record without authentication.",
    consultationHistory: "CONSULTATION HISTORY", verified: "Verified", verifyHash: "Verify hash",
    recordsNote: "Records are stored in protected storage; the hash above is compared on demand as a blockchain-style integrity check.",

    // Doctor directory
    findDoctor: "Find a doctor", nextAvailable: "Next available:", bookAppointment: "Book appointment", booked: "Booked",

    // Appointments
    apptTitle: "Appointments & telemedicine", join: "Join",
    liveConsult: "LIVE CONSULTATION (DEMO)", youSuffix: "(you)",
    webrtcNote: "Consultation UI shown for demo — WebRTC can be added for live video.",
    statusConfirmed: "Confirmed", statusPending: "Pending",
    videoConsultation: "Video consultation", inPerson: "In-person",

    // Medicine safety
    medSafetyTitle: "Medicine safety check",
    medSafetySub: "Demo interaction workflow — not autonomous prescribing.",
    medicineA: "Medicine A", medicineB: "Medicine B",
    noInteraction: "No known interaction flagged in this demo dataset.",

    // Emergency
    emergencyTitle: "Emergency response",
    emergencyConfirm: "Confirm to trigger an emergency dispatch workflow using your current location.",
    dispatchedMsg: "Emergency dispatched — severity", nearestHospitals: "NEAREST HOSPITALS",
    dispatchStatus: "DISPATCH STATUS", ambulanceLabel: "Ambulance", etaLabel: "ETA", toLabel: "to",
    bedAvailability: "Bed availability", ofLabel: "of", bedsAvailableSuffix: "beds available",
    bedsFreeSuffix: "beds free", icuLabel: "ICU",
    routeNote: "Route calculated from current GPS location to selected facility (demo).",

    // Doctor dashboard
    backToQueue: "← Back to queue", liveVitals: "LIVE VITALS", presentingComplaint: "Presenting complaint",
    aiRiskPrediction: "AI risk prediction", modelFlags: "Model flags", riskBasedOn: "risk based on vitals + symptom pattern.",
    consultationNotes: "CONSULTATION NOTES", notesPlaceholder: "Diagnosis, prescription and notes...",
    saveToRecord: "Save to record", addPrescription: "Add prescription",
    patientQueue: "Patient queue", patientsToday: "patients today", ageLabel: "yrs", ageWord: "Age",

    // Government dashboard
    publicHealthOverview: "Public health overview", statActiveCases: "Active cases",
    statHighSeverity: "High-severity hotspots", statBedsFree: "Hospital beds free", statAmbulances: "Ambulances available",
    hotspotsSnapshot: "DISEASE HOTSPOTS (SNAPSHOT)", caseTrend: "4-WEEK CASE TREND + PROJECTION",
    forecastNote: "Research/demo forecast — illustrative trend projection, not a clinical model.",
    gisTitle: "GIS disease map",
    hotspotNote: "Hotspot density is a prototype approximation for demo purposes and does not represent an official clinical or public-health threshold.",
    reportedCases: "Reported cases", colDistrict: "District", colDisease: "Disease", colSeverity: "Severity",
    colReported: "Reported", todayLabel: "Today",
    hospCapacityTitle: "Hospital & ambulance capacity",

    // Admin
    adminTitle: "Admin & operations",
    adminSub: "Operational management, verification and controlled administrative functions.",
    adminNote: "This role is scoped in the blueprint but not built out in this prototype — wire it up the same way as the other role dashboards once admin-specific screens are designed.",
  },
  hi: {
    tagline: "हर गाँव तक स्वास्थ्य सेवा",
    sub: "मरीज़ों, डॉक्टरों और स्वास्थ्य विभाग के लिए एक जुड़ा हुआ मंच — AI जांच, लाइव वाइटल्स, आपातकालीन सेवा और रोग निगरानी।",
    enterAs: "इस रूप में प्रवेश करें",
    patient: "मरीज़", doctor: "डॉक्टर", government: "सरकार",
    dashboard: "डैशबोर्ड", assistant: "AI सहायक", vitals: "वाइटल्स",
    records: "रिकॉर्ड", doctors: "डॉक्टर", appointments: "अपॉइंटमेंट",
    medicines: "दवाइयाँ", emergency: "आपातकाल", patients: "मरीज़",
    consultations: "परामर्श", map: "रोग मानचित्र", diseases: "रोग",
    hospitals: "अस्पताल", greeting: "बताइए आपको क्या महसूस हो रहा है — मैं प्रारंभिक जांच करता हूँ।",

    logOut: "लॉग आउट", online: "ऑनलाइन", offlineCached: "ऑफ़लाइन (कैश्ड)",
    offlineBanner: "आप ऑफ़लाइन हैं — कैश्ड डेटा दिखाया जा रहा है। आपके बदलाव सुरक्षित रहेंगे और कनेक्शन वापस आते ही अपने आप सिंक हो जाएँगे।",
    portalSuffix: "पोर्टल",

    loginTitle: "AarogyaNet में साइन इन करें",
    loginSub: "डेमो प्रमाणीकरण — भूमिका-आधारित पहुँच, जारी होने पर JWT।",
    backHome: "← होम पर वापस जाएँ",
    fullName: "पूरा नाम",
    idLabelPatient: "हेल्थ ID या फ़ोन नंबर",
    idLabelDoctor: "मेडिकल लाइसेंस नंबर",
    idLabelGov: "विभाग ID",
    continueBtn: "जारी रखें",
    authNote: "इस प्रोटोटाइप डेमो में पासवर्ड हैशिंग, JWT सत्यापन और RBAC को अनुकरण किया गया है।",
    registerTitle: "खाता बनाएँ",
    registerSub: "डेमो पंजीकरण — प्रोडक्शन में यह POST /api/auth/register को कॉल करेगा।",
    haveAccount: "पहले से खाता है?",
    goLogin: "इसके बजाय साइन इन करें",
    noAccount: "नए हैं?",
    goRegister: "खाता बनाएँ",
    createAccount: "खाता बनाएँ",

    loginBtn: "लॉग इन करें",
    badge: "ग्रामीण स्वास्थ्य सेवा एवं महामारी प्रतिक्रिया मंच",
    stat1: "ज़िले कवर किए गए (डेमो)", stat2: "औसत सिम्युलेटेड डिस्पैच समय", stat3: "आवाज़-सक्षम भाषाएँ",
    ecosystemHeading: "यह पारिस्थितिकी तंत्र कैसे जुड़ता है",
    ecosystemNote: "साझा प्रमाणीकरण, एक बैकएंड और एक डेटाबेस हर डैशबोर्ड को संचालित करते हैं — अलग-अलग पेज नहीं।",
    builtHeading: "एक पूर्ण कार्यशील प्रोटोटाइप के रूप में बनाया गया",
    builtSub: "नीचे दिया हर मॉड्यूल इसी डेमो सेशन से जुड़ा है — लॉगिन स्क्रीन से भूमिका बदलकर देखें।",
    footerNote: "प्रोटोटाइप निर्माण — पूरी तरह सिंथेटिक डेमो डेटा का उपयोग करता है। AI आउटपुट एक प्रारंभिक आकलन है, चिकित्सीय निदान नहीं।",
    mod1Title: "AI मेडिकल सहायक", mod1Desc: "लक्षणों की जानकारी लेकर सुरक्षित, प्रारंभिक अगला कदम सुझाता है।",
    mod2Title: "IoT वाइटल निगरानी", mod2Desc: "रीयल-टाइम तापमान, हृदय गति और SpO₂ के साथ असामान्य अलर्ट।",
    mod3Title: "GIS रोग मानचित्र", mod3Desc: "स्वास्थ्य विभाग के लिए ज़िलों में लाइव हॉटस्पॉट निगरानी।",
    mod4Title: "आपातकालीन सेवा", mod4Desc: "निकटतम अस्पताल, बेड उपलब्धता और एम्बुलेंस डिस्पैच।",
    mod5Title: "डिजिटल हेल्थ ID", mod5Desc: "प्रमाणीकरण के पीछे सुरक्षित, QR पहुँच वाली एक सत्यापित ID।",
    mod6Title: "रिकॉर्ड सत्यापन", mod6Desc: "हर स्वास्थ्य रिकॉर्ड के लिए हैश-आधारित अखंडता परत।",

    welcomeBack: "वापसी पर स्वागत है,", todayStatus: "आज की स्थिति यहाँ देखें।",
    healthScoreLabel: "समग्र स्वास्थ्य स्कोर", tempLabel: "तापमान", hrLabel: "हृदय गति", spo2Label: "SpO₂",
    quickActions: "त्वरित कार्य", qaAssistant: "AI सहायक से पूछें", qaVitals: "वाइटल्स मॉनिटर शुरू करें",
    qaRecords: "स्वास्थ्य रिकॉर्ड देखें", qaEmergency: "आपातकाल",
    upcomingAppt: "आगामी अपॉइंटमेंट", apptDoctorLine: "डॉ. कविता राव — जनरल फिज़िशियन",
    apptWhen: "गुरु, 18 सित. · सुबह 11:30 · वीडियो परामर्श",
    digitalHealthIdLabel: "डिजिटल हेल्थ ID", tapRecords: "देखने और सत्यापित करने हेतु रिकॉर्ड खोलें",

    vitalsSubtitle: "सिम्युलेटर मोड — भौतिक सेंसर के बिना रीयल-टाइम IoT स्ट्रीमिंग का प्रदर्शन।",
    alarmMsg: "असामान्य वाइटल्स — SpO₂ घट रहा है, हृदय गति बढ़ रही है।",
    triggerEmergency: "आपातकाल सक्रिय करें", temperatureLabel: "तापमान",
    startSim: "सिम्युलेटर शुरू करें", stopSim: "सिम्युलेटर रोकें",

    assistantPrompt: "आपको जो लक्षण महसूस हो रहे हैं उन्हें चुनें और वे कब से हैं यह बताएं।",
    symFever: "बुखार", symCough: "खांसी", symBodyPain: "बदन दर्द", symBreathlessness: "सांस फूलना",
    symFatigue: "थकान", symDiarrhoea: "दस्त",
    durationLabel: "अवधि", dur1: "<1 दिन", dur2: "1-2 दिन", dur3: "3-4 दिन", dur4: "5+ दिन",
    runAssessment: "प्रारंभिक आकलन चलाएँ",
    resultPlaceholder: "आकलन चलाने के बाद आपका प्रारंभिक जोखिम परिणाम यहाँ दिखाई देगा।",
    preliminaryRisk: "प्रारंभिक जोखिम",
    riskHighMsg: "आपके लक्षणों के अनुसार तुरंत चिकित्सा सहायता आवश्यक हो सकती है। कृपया जल्द से जल्द डॉक्टर या नज़दीकी स्वास्थ्य केंद्र से संपर्क करें।",
    riskModerateMsg: "अगले 24 घंटों में अपने लक्षणों पर नज़र रखें और परामर्श बुक करने पर विचार करें।",
    riskLowMsg: "आपके लक्षण हल्के प्रतीत होते हैं। आराम करें, पानी पीते रहें और बदलावों पर नज़र रखें।",
    aiDisclaimer: "यह डेमो डेटा पर आधारित एक AI-सहायित प्रारंभिक आकलन है — चिकित्सीय निदान नहीं। हमेशा किसी योग्य डॉक्टर से सलाह लें।",
    escalate: "आपातकाल में भेजें",

    recordsTitle: "स्वास्थ्य रिकॉर्ड और डिजिटल हेल्थ ID",
    digitalHealthIdCardLabel: "डिजिटल हेल्थ ID",
    demoQrNote: "डेमो QR — केवल उदाहरण हेतु, वास्तविक स्कैन के लिए नहीं।",
    authGranted: "प्रमाणित — रिकॉर्ड तक पहुँच स्वीकृत", simulateScan: "प्रमाणित स्कैन का अनुकरण करें",
    publicScanNote: "बिना प्रमाणीकरण के सार्वजनिक QR स्कैन कभी भी पूरा रिकॉर्ड नहीं दिखाता।",
    consultationHistory: "परामर्श इतिहास", verified: "सत्यापित", verifyHash: "हैश सत्यापित करें",
    recordsNote: "रिकॉर्ड सुरक्षित भंडारण में रखे जाते हैं; ऊपर दिया हैश ब्लॉकचेन-शैली की अखंडता जांच के रूप में तुलना किया जाता है।",

    findDoctor: "डॉक्टर खोजें", nextAvailable: "अगली उपलब्धता:", bookAppointment: "अपॉइंटमेंट बुक करें", booked: "बुक हो गया",

    apptTitle: "अपॉइंटमेंट और टेलीमेडिसिन", join: "जुड़ें",
    liveConsult: "लाइव परामर्श (डेमो)", youSuffix: "(आप)",
    webrtcNote: "डेमो हेतु परामर्श UI दिखाया गया — लाइव वीडियो के लिए WebRTC जोड़ा जा सकता है।",
    statusConfirmed: "पुष्ट", statusPending: "लंबित",
    videoConsultation: "वीडियो परामर्श", inPerson: "व्यक्तिगत रूप से",

    medSafetyTitle: "दवा सुरक्षा जांच",
    medSafetySub: "डेमो इंटरैक्शन वर्कफ़्लो — स्वचालित प्रिस्क्रिप्शन नहीं।",
    medicineA: "दवा A", medicineB: "दवा B",
    noInteraction: "इस डेमो डेटासेट में कोई ज्ञात परस्पर प्रभाव नहीं मिला।",

    emergencyTitle: "आपातकालीन सेवा",
    emergencyConfirm: "अपने वर्तमान स्थान का उपयोग कर आपातकालीन डिस्पैच वर्कफ़्लो शुरू करने की पुष्टि करें।",
    dispatchedMsg: "आपातकाल भेजा गया — गंभीरता", nearestHospitals: "निकटतम अस्पताल",
    dispatchStatus: "डिस्पैच स्थिति", ambulanceLabel: "एम्बुलेंस", etaLabel: "अनुमानित समय", toLabel: "तक",
    bedAvailability: "बेड उपलब्धता", ofLabel: "में से", bedsAvailableSuffix: "बेड उपलब्ध",
    bedsFreeSuffix: "बेड खाली", icuLabel: "ICU",
    routeNote: "वर्तमान GPS स्थान से चयनित सुविधा तक मार्ग की गणना (डेमो)।",

    backToQueue: "← कतार पर वापस जाएँ", liveVitals: "लाइव वाइटल्स", presentingComplaint: "मौजूदा शिकायत",
    aiRiskPrediction: "AI जोखिम पूर्वानुमान", modelFlags: "मॉडल ने चिह्नित किया", riskBasedOn: "जोखिम, वाइटल्स + लक्षण पैटर्न के आधार पर।",
    consultationNotes: "परामर्श नोट्स", notesPlaceholder: "निदान, प्रिस्क्रिप्शन और नोट्स...",
    saveToRecord: "रिकॉर्ड में सहेजें", addPrescription: "प्रिस्क्रिप्शन जोड़ें",
    patientQueue: "मरीज़ों की कतार", patientsToday: "आज के मरीज़", ageLabel: "वर्ष", ageWord: "आयु",

    publicHealthOverview: "सार्वजनिक स्वास्थ्य अवलोकन", statActiveCases: "सक्रिय मामले",
    statHighSeverity: "उच्च-गंभीरता हॉटस्पॉट", statBedsFree: "खाली अस्पताल बेड", statAmbulances: "उपलब्ध एम्बुलेंस",
    hotspotsSnapshot: "रोग हॉटस्पॉट (स्नैपशॉट)", caseTrend: "4-सप्ताह मामला रुझान + प्रक्षेपण",
    forecastNote: "शोध/डेमो पूर्वानुमान — उदाहरणात्मक रुझान प्रक्षेपण, नैदानिक मॉडल नहीं।",
    gisTitle: "GIS रोग मानचित्र",
    hotspotNote: "हॉटस्पॉट घनत्व एक प्रोटोटाइप अनुमान है और यह किसी आधिकारिक नैदानिक या सार्वजनिक-स्वास्थ्य सीमा का प्रतिनिधित्व नहीं करता।",
    reportedCases: "रिपोर्ट किए गए मामले", colDistrict: "ज़िला", colDisease: "रोग", colSeverity: "गंभीरता",
    colReported: "रिपोर्ट किया गया", todayLabel: "आज",
    hospCapacityTitle: "अस्पताल और एम्बुलेंस क्षमता",

    adminTitle: "प्रशासन और संचालन",
    adminSub: "संचालन प्रबंधन, सत्यापन और नियंत्रित प्रशासनिक कार्य।",
    adminNote: "यह भूमिका ब्लूप्रिंट में तय है पर इस प्रोटोटाइप में विकसित नहीं की गई है — एडमिन-विशिष्ट स्क्रीन डिज़ाइन होते ही इसे बाकी डैशबोर्ड की तरह जोड़ें।",
  },
} as const;

export type TDict = typeof STR["en"];
