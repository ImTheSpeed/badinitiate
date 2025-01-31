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

    // Add more subject codes as needed...
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

    // Detect valid room formats (Building letter + optional CR/LH + room number)
    const match = code.match(/^([A-Z])((?:CR|LH)?)(\d+)$/);
    if (!match) {
        return currentLanguage === 'en'
            ? "Invalid room code, please try again!"
            : "رمز الغرفة غير صالح، الرجاء المحاولة مرة أخرى!";
    }

    const buildingLetter = match[1]; // First letter is the building identifier
    const roomType = match[2]; // "CR" for Classroom or "LH" for Lecture Hall
    const roomNumber = match[3]; // The numeric part of the room

    // Check if the building letter is valid
    if (!buildings[buildingLetter]) {
        return currentLanguage === 'en'
            ? "Invalid building code, please try again!"
            : "رمز المبنى غير صالح، الرجاء المحاولة مرة أخرى!";
    }

    // Determine floor
    const floor = determineFloor(roomNumber[0], currentLanguage);

    // Construct result message
    let result = buildings[buildingLetter][currentLanguage];

    if (roomType === "LH") {
        result += currentLanguage === 'en' ? ', Lecture Hall' : '، قاعة محاضرات';
    } else if (roomType === "CR") {
        result += currentLanguage === 'en' ? ', Classroom' : '، فصل دراسي';
    }

    if (floor) {
        result += currentLanguage === 'en' ? `, ${floor} floor` : `، الطابق ${floor}`;
    }

    result += currentLanguage === 'en' ? `, Room ${roomNumber}` : `، غرفة ${roomNumber}`;

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
