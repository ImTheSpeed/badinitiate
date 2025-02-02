// Optimized Room Search Script for Galala University

// List of all subject codes from all faculties to prevent misidentification
const subjectCodes = new Set([
    // Medicine Program
    "MED111", "BMS111", "BMS131", "BMS141", "CMS111", "CMS181", "UC1",
    "BMS151", "BMS161", "BMS171", "BMS172", "CMS112", "UC2",
    "MED211", "BMS201", "BMS202", "CMS201", "UC3",
    "MED311", "BMS301", "BMS302", "CMS301", "UC4",
    "MED411", "BMS401", "BMS402", "CMS401", "UC5",
    "MED511", "BMS501", "BMS502", "CMS501", "UC6",
    "MED611", "BMS601", "BMS602", "CMS601", "UC7",

    // Doctor of Pharmacy (PharmD) Program
    "BMS101", "BMS232", "PPH204", "PMB202", "PBC202", "PPP201", "UC7", "UE1",
    "BMS371", "PMC306", "PPH305", "PPT304", "PMB303", "PPP302", "UE2",
    "BMS351", "PMC307", "PPC303", "PPH306", "PPT305", "PPP303", "PPP304",
    "PPP412", "PPC404", "PPH407", "PPT406", "PMB404", "PBC403", "PPP405", "PPP406", "UE3",
    "PMC408", "PPT407", "PPP407", "PPP408", "PPP409", "PPP410", "PPP411", "E1",
    "PMB505", "PPC505", "PPP512", "PPP513", "PPP514", "PPP515", "PPP516", "E1",
    "PBC504", "PPP517", "PPP518", "PPP519", "PPP520", "PPP521", "PPP522", "E1",

    // Dentistry Program
    "DEN101", "DEN102", "DEN103", "DEN104", "DEN105", "DEN106",
    "DEN201", "DEN202", "DEN203", "DEN204", "DEN205", "DEN206",
    "DEN301", "DEN302", "DEN303", "DEN304", "DEN305", "DEN306",
    "DEN401", "DEN402", "DEN403", "DEN404", "DEN405", "DEN406",
    "DEN501", "DEN502", "DEN503", "DEN504", "DEN505", "DEN506",
    "DEN601", "DEN602", "DEN603", "DEN604", "DEN605", "DEN606",
    "DEN701", "DEN702", "DEN703", "DEN704", "DEN705", "DEN706",

    // Nursing Program
    "NUR101", "NUR102", "NUR103", "NUR104", "NUR105", "NUR106",
    "NUR201", "NUR202", "NUR203", "NUR204", "NUR205", "NUR206",
    "NUR301", "NUR302", "NUR303", "NUR304", "NUR305", "NUR306",
    "NUR401", "NUR402", "NUR403", "NUR404", "NUR405", "NUR406",

    // Engineering Programs
    "CE101", "CE102", "CE103", "CE104", "CE105", "CE106",
    "ME101", "ME102", "ME103", "ME104", "ME105", "ME106",
    "EE101", "EE102", "EE103", "EE104", "EE105", "EE106",
    "CS101", "CS102", "CS103", "CS104", "CS105", "CS106",

    // Business & Administrative Sciences
    "BUS101", "ACC101", "MGT101", "FIN101", "ECO101", "MAR101",
    "BUS201", "ACC201", "MGT201", "FIN201", "ECO201", "MAR201",
    "BUS301", "ACC301", "MGT301", "FIN301", "ECO301", "MAR301",
    "BUS401", "ACC401", "MGT401", "FIN401", "ECO401", "MAR401",

    // Applied Health Sciences
    "AHS101", "AHS102", "AHS103", "AHS104", "AHS105", "AHS106",
    "AHS201", "AHS202", "AHS203", "AHS204", "AHS205", "AHS206",
    "AHS301", "AHS302", "AHS303", "AHS304", "AHS305", "AHS306",
    "AHS401", "AHS402", "AHS403", "AHS404", "AHS405", "AHS406",

    // Social & Human Sciences
    "SHS101", "SHS102", "SHS103", "SHS104", "SHS105", "SHS106",
    "SHS201", "SHS202", "SHS203", "SHS204", "SHS205", "SHS206",
    "SHS301", "SHS302", "SHS303", "SHS304", "SHS305", "SHS306",
    "SHS401", "SHS402", "SHS403", "SHS404", "SHS405", "SHS406",

    // Media Production
    "MP101", "MP102", "MP103", "MP104", "MP105", "MP106",
    "MP201", "MP202", "MP203", "MP204", "MP205", "MP206",
    "MP301", "MP302", "MP303", "MP304", "MP305", "MP306",
    "MP401", "MP402", "MP403", "MP404", "MP405", "MP406",

    // Food Industries
    "FI101", "FI102", "FI103", "FI104", "FI105", "FI106",
    "FI201", "FI202", "FI203", "FI204", "FI205", "FI206",
    "FI301", "FI302", "FI303", "FI304", "FI305", "FI306",
    "FI401", "FI402", "FI403", "FI404", "FI405", "FI406",

    // Art & Design
    "AD101", "AD102", "AD103", "AD104", "AD105", "AD106",
    "AD201", "AD202", "AD203", "AD204", "AD205", "AD206",
    "AD301", "AD302", "AD303", "AD304", "AD305", "AD306",
    "AD401", "AD402", "AD403", "AD404", "AD405", "AD406",

    // Architecture
    "AR101", "AR102", "AR103", "AR104", "AR105", "AR106",
    "AR201", "AR202", "AR203", "AR204", "AR205", "AR206",
    "AR301", "AR302", "AR303", "AR304", "AR305", "AR306",
    "AR401", "AR402", "AR403", "AR404", "AR405", "AR406",
    "AR501", "AR502", "AR503", "AR504", "AR505", "AR506",

    // Science
    "SCI101", "SCI102", "SCI103", "SCI104", "SCI105", "SCI106",
    "SCI201", "SCI202", "SCI203", "SCI204", "SCI205", "SCI206",
    "SCI301", "SCI302", "SCI303", "SCI304", "SCI305", "SCI306",
    "SCI401", "SCI402", "SCI403", "SCI404", "SCI405", "SCI406",

    // Elective Courses
    "HIST101", "ARCH101", "INTL101", "JAPN101", "WRIT101", "BRND101", "SPCH101", "MGMT101", "PSYC101", "SOCL101", "NEGO101", "PROG101", "HIST102",

    // Compulsory Courses
    "GEO217", "LAN028", "LAN010", "MGT031", "COM011", "LIB116", "PSC011", "LAN020"
]);



// Special cases mapping
const specialCases = {
    'HLH001': { 
        en: 'Auditorium 1',
        ar: 'مدرج ١'
    },
    'J101': {
        en: 'Auditorium 2',
        ar: 'مدرج ٢'
    },
    'CRI122': {
        en: 'Human Sciences Floor 1 Room 22',
        ar: 'العلوم الإنسانية الطابق الأول غرفة ٢٢'
    },
    'CRI242': {
        en: 'Human Sciences Floor 2 Room 42',
        ar: 'العلوم الإنسانية الطابق الثاني غرفة ٤٢'
    },
    'CRI246': {
        en: 'Human Sciences Floor 2 Room 46',
        ar: 'العلوم الإنسانية الطابق الثاني غرفة ٤٦'
    },
    'GCR201': {
        en: 'Pharmacy Floor 2 Room 01',
        ar: 'الصيدلة الطابق الثاني غرفة ٠١'
    },
    'GCR301': {
        en: 'Pharmacy Floor 3 Room 01',
        ar: 'الصيدلة الطابق الثالث غرفة ٠١'
    },
    'GLH001': {
        en: 'Pharmacy Lecture Hall Ground Floor Room 001',
        ar: 'قاعة محاضرات الصيدلة الطابق الأرضي غرفة ٠٠١'
    }
};

// Building names mapping
const buildings = {
    'M': { en: 'Administrative building', ar: 'المبنى الإداري' },
    'A': { en: 'Applied Health Sciences Technology', ar: 'تكنولوجيا العلوم الصحية التطبيقية' },
    'B': { en: 'Physical Therapy', ar: 'العلاج الطبيعي' },
    'C': { en: 'Dentistry', ar: 'طب الأسنان' },
    'D': { en: 'Medicine', ar: 'الطب' },
    'E': { en: 'Nursing', ar: 'التمريض' },
    'G': { en: 'Pharmacy', ar: 'الصيدلة' },
    'H': { en: 'Administrative Sciences', ar: 'العلوم الإدارية' },
    'I': { en: 'Social and Human Sciences', ar: 'العلوم الاجتماعية والإنسانية' },
    'J': { en: 'Media Production', ar: 'الإنتاج الإعلامي' },
    'K': { en: 'Food Industries', ar: 'صناعات الغذاء' },
    'L': { en: 'Art and Design', ar: 'الفنون والتصميم' },
    'N': { en: 'Engineering', ar: 'الهندسة' },
    'O': { en: 'Architecture', ar: 'العمارة' },
    'P': { en: 'Computer Sciences and Engineering', ar: 'علوم الحاسب والهندسة' },
    'Q': { en: 'Science', ar: 'العلوم' }
};

// Function to determine floor number
function determineFloor(firstDigit, language = 'en') {
    if (firstDigit === "G") return language === 'en' ? "Ground" : "الأرضي";
    if (firstDigit === "1") return language === 'en' ? "1st" : "الأول";
    if (firstDigit === "2") return language === 'en' ? "2nd" : "الثاني";
    if (firstDigit === "3") return language === 'en' ? "3rd" : "الثالث";
    return language === 'en' ? `${firstDigit}th` : `ال${firstDigit}`;
}

function getRoomDetails(code) {
    // Remove spaces, dashes, and any other non-alphanumeric characters, then convert to uppercase
    code = code.replace(/[^a-zA-Z0-9]/g, '').trim().toUpperCase();

    // Check for special cases first
    if (specialCases[code]) {
        return specialCases[code][currentLanguage];
    }

    // Check if the code is a subject code
    if (subjectCodes.has(code)) {
        return currentLanguage === 'en'
            ? "This is a subject code, not a room code. Please enter a valid room code."
            : "هذا رمز مادة، وليس رمز غرفة. الرجاء إدخال رمز غرفة صالح.";
    }

    // Extract building letter
    const buildingLetter = code[0];
    if (!buildings[buildingLetter]) {
        return currentLanguage === 'en'
            ? "Invalid building code, please try again!"
            : "رمز المبنى غير صالح، الرجاء المحاولة مرة أخرى!";
    }

    // Check for CR (Classroom) or LH (Lecture Hall)
    const roomType = code.slice(1, 3); // Check 2nd and 3rd letters
    let floor = "";
    let roomNumber = "";

    if (roomType === "CR" || roomType === "LH") {
        // Handle CR or LH cases (e.g., GCR201, HLH001)
        floor = code[3]; // First digit after CR/LH is the floor
        roomNumber = code.slice(4); // Remaining digits are the room number
    } else {
        // Handle cases without CR or LH (e.g., A101, B202)
        if (code.length >= 4) {
            floor = code[1]; // First digit is the floor
            roomNumber = code.slice(2); // Remaining digits are the room number
        } else {
            return currentLanguage === 'en'
                ? "Invalid room code format. Please include floor and room number."
                : "تنسيق رمز الغرفة غير صالح. يرجى تضمين الطابق ورقم الغرفة.";
        }
    }

    // Validate floor and room number
    if (!floor || !roomNumber || isNaN(roomNumber)) {
        return currentLanguage === 'en'
            ? "Invalid room code format. Please check your input."
            : "تنسيق رمز الغرفة غير صالح. يرجى التحقق من الإدخال.";
    }

    // Construct result message
    let result = buildings[buildingLetter][currentLanguage];

    if (roomType === "LH") {
        result += currentLanguage === 'en' ? ', Lecture Hall' : '، قاعة محاضرات';
    } else if (roomType === "CR") {
        result += currentLanguage === 'en' ? ', Classroom' : '، فصل ';
    }

    if (floor) {
        result += currentLanguage === 'en'
            ? `, ${determineFloor(floor)} floor`
            : `، الطابق ${determineFloor(floor, currentLanguage)}`;
    }

    if (roomNumber) {
        result += currentLanguage === 'en'
            ? `, Room ${roomNumber}`
            : `، غرفة ${roomNumber}`;
    }

    return result;
}

// Event Listener for the Search Button
document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.querySelector('.search-button');
    const searchInput = document.querySelector('.search-input');
    const resultContainer = document.querySelector('.result-container');

    searchButton.addEventListener("click", function () {
        resultContainer.innerHTML = getRoomDetails(searchInput.value);
    });

    // Detect Enter key press in input field
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            resultContainer.innerHTML = getRoomDetails(searchInput.value);
        }
    });
});
