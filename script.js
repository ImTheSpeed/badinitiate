// Optimized Room Search Script for Galala University

// List of all subject codes from all faculties to prevent misidentification
const subjectCodes = new Set([
    // Existing subject codes...
    "MED111", "BMS111", "BMS131", "BMS141", "CMS111", "CMS181", "UC1",
    "BMS151", "BMS161", "BMS171", "BMS172", "CMS112", "UC2",
    "MED211", "BMS201", "BMS202", "CMS201", "UC3",
    "MED311", "BMS301", "BMS302", "CMS301", "UC4",
    "MED411", "BMS401", "BMS402", "CMS401", "UC5",
    "MED511", "BMS501", "BMS502", "CMS501", "UC6",
    "MED611", "BMS601", "BMS602", "CMS601", "UC7",

    // New subjects from the files
    // From "Elective Courses" list
    "HIST101", // History to Art (assuming code)
    "ARCH101", // Introduction to Architecture & Urbanism (assuming code)
    "INTL101", // Contemporary International Issues (assuming code)
    "JAPN101", // Japanese Language 1 (assuming code)
    "WRIT101", // Academic Writing (assuming code)
    "BRND101", // Personal Branding (assuming code)
    "SPCH101", // Public Speaking (assuming code)
    "MGMT101", // Principles of Management (assuming code)
    "PSYC101", // Introduction to Psychology (assuming code)
    "SOCL101", // Introduction to Sociology (assuming code)
    "NEGO101", // Negotiation Skills (assuming code)
    "PROG101", // Introduction to Programming (assuming code)
    "HIST102", // History of Science and Technology (assuming code)

    // From "Compulsory Courses" list
    "GEO217", // Climate Change & Sustainability
    "LAN028", // Critical Thinking
    "LAN010", // Arabic Language
    "MGT031", // Entrepreneurship & Innovation
    "COM011", // Communication Skills
    "LIB116", // Research & Analysis Skills
    "PSC011", // Introduction to Law & Human Rights
    "LAN020", // English 1
]);

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

// Function to check if the input is a valid room code
function getRoomDetails(code) {
    code = code.trim().toUpperCase(); // Normalize input

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
        result += currentLanguage === 'en' ? ', Classroom' : '، فصل دراسي';
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
