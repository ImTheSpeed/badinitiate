// Ensure script runs only after DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Hook into the existing search bar elements in the HTML
    const searchButton = document.querySelector('.search-button');
    const searchInput = document.querySelector('.search-input');
    const resultContainer = document.querySelector('.result-container');

    function findLocation() {
        const codeInput = searchInput.value.trim().toUpperCase();
        const code = codeInput.replace(/[^A-Z0-9]/g, ''); // Remove all non-alphanumeric characters

        // Input validation
        if (!code || code.length < 3) {
            resultContainer.innerHTML = currentLanguage === 'en' 
                ? "Please enter a valid room code (e.g., A101, HLH001)." 
                : "الرجاء إدخال رمز غرفة صالح (مثل A101، HLH001).";
            return;
        }

        // Check if the code is a subject code (3 letters followed by numbers)
        const isSubjectCode = /^[A-Z]{3}\d+$/.test(code);
        if (isSubjectCode) {
            resultContainer.innerHTML = currentLanguage === 'en' 
                ? "This is a subject code, not a room code. Please enter a valid room code." 
                : "هذا رمز مادة، وليس رمز غرفة. الرجاء إدخال رمز غرفة صالح.";
            return;
        }

        // Special cases
        const specialCases = {
            'HLH001': { en: 'Auditorium 1', ar: 'قاعة المحاضرات 1' },
            'J101': { en: 'Auditorium 2', ar: 'قاعة المحاضرات 2' },
            'CRI122': { en: 'Human Sciences Floor 1 Room 22', ar: 'العلوم الإنسانية الطابق الأول غرفة 22' },
            'CRI242': { en: 'Human Sciences Floor 2 Room 42', ar: 'العلوم الإنسانية الطابق الثاني غرفة 42' },
            'CRI246': { en: 'Human Sciences Floor 2 Room 46', ar: 'العلوم الإنسانية الطابق الثاني غرفة 46' },
            'GCR201': { en: 'Pharmacy Floor 2 Room 01', ar: 'الصيدلة الطابق الثاني غرفة 01' },
            'GCR301': { en: 'Pharmacy Floor 3 Room 01', ar: 'الصيدلة الطابق الثالث غرفة 01' },
            'GLH001': { en: 'Pharmacy Lecture Hall Ground Floor Room 001', ar: 'قاعة المحاضرات الرئيسية بالصيدلة الطابق الأرضي غرفة 001' },
            'LLH201': { en: 'Art Lecture Hall Floor 2 Room 01', ar: 'قاعة محاضرات الفنون الطابق الثاني غرفة 01' },
            'JCR101': { en: 'Media Classroom Floor 1 Room 01', ar: 'فصل الإعلام الطابق الأول غرفة 01' }
        };

        if (specialCases[code]) {
            resultContainer.innerHTML = specialCases[code][currentLanguage];
            return;
        }

        // Parse the code
        const isLectureHall = code.includes("LH");
        const isClassRoom = code.includes("CR");
        const buildingLetter = code[0];
        let floor = "";
        let room = "";

        if (isLectureHall) {
            const lhParts = code.split("LH");
            if (lhParts[0].length === 1 && lhParts[1].length > 0) {
                floor = lhParts[1][0];
                room = lhParts[1].substring(1);
            }
        } else if (isClassRoom) {
            const crParts = code.split("CR");
            if (crParts[0].length === 1 && crParts[1].length > 0) {
                floor = crParts[1][0];
                room = crParts[1].substring(1);
            }
        } else {
            if (code.length >= 4) {
                floor = code[1];
                room = code.substring(2);
            }
        }

        // Building mapping
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

        if (!buildings[buildingLetter]) {
            resultContainer.innerHTML = currentLanguage === 'en' 
                ? "Invalid building code, please try again!" 
                : "رمز المبنى غير صالح، الرجاء المحاولة مرة أخرى!";
            return;
        }

        // Format the result
        let result = buildings[buildingLetter][currentLanguage];
        if (isLectureHall) {
            result += currentLanguage === 'en' ? ', Lecture Hall' : '، قاعة محاضرات';
        } else if (isClassRoom) {
            result += currentLanguage === 'en' ? ', Class Room' : '، فصل دراسي';
        }
        if (floor) {
            result += currentLanguage === 'en' 
                ? `, ${formatFloor(floor)} floor` 
                : `، الطابق ${formatFloor(floor, currentLanguage)}`;
        }
        if (room) {
            result += currentLanguage === 'en' 
                ? `, Room ${room}` 
                : `، غرفة ${room}`;
        }

        resultContainer.innerHTML = result;
    }

    // Bind search button to function
    searchButton.addEventListener("click", findLocation);
});

// Helper function to format floor numbers
function formatFloor(floor, language = 'en') {
    if (floor === "G") return language === 'en' ? "Ground" : "الأرضي";
    if (floor === "1") return language === 'en' ? "1st" : "الأول";
    if (floor === "2") return language === 'en' ? "2nd" : "الثاني";
    if (floor === "3") return language === 'en' ? "3rd" : "الثالث";
    return language === 'en' ? `${floor}th` : `ال${floor}`;
}
