document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.querySelector('.search-button');
    const searchInput = document.querySelector('.search-input');
    const resultContainer = document.querySelector('.result-container');

    function findLocation() {
        let codeInput = searchInput.value.trim().toUpperCase();
        let code = codeInput.replace(/[^A-Z0-9]/g, ''); // Remove spaces and special characters

        if (!code || code.length < 3) {
            resultContainer.innerHTML = currentLanguage === 'en'
                ? "Please enter a valid room code (e.g., A101, HLH001)."
                : "الرجاء إدخال رمز غرفة صالح (مثل A101، HLH001).";
            return;
        }

        // Detect and prevent subject codes (3+ letters followed by numbers)
        if (/^[A-Z]{3,}\d+$/.test(code)) {
            resultContainer.innerHTML = currentLanguage === 'en'
                ? "This is a subject code, not a room code. Please enter a valid room code."
                : "هذا رمز مادة، وليس رمز غرفة. الرجاء إدخال رمز غرفة صالح.";
            return;
        }

        // Detect valid room formats (Building letter + optional CR/LH + room number)
        let match = code.match(/^([A-Z])((?:CR|LH)?)(\d+)$/);
        if (!match) {
            resultContainer.innerHTML = currentLanguage === 'en'
                ? "Invalid room code, please try again!"
                : "رمز الغرفة غير صالح، الرجاء المحاولة مرة أخرى!";
            return;
        }

        let buildingLetter = match[1]; // First letter is the building identifier
        let roomType = match[2]; // "CR" for Classroom or "LH" for Lecture Hall
        let roomNumber = match[3]; // The numeric part of the room

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

        if (!buildings[buildingLetter]) {
            resultContainer.innerHTML = currentLanguage === 'en'
                ? "Invalid building code, please try again!"
                : "رمز المبنى غير صالح، الرجاء المحاولة مرة أخرى!";
            return;
        }

        // Determine floor
        let floor = determineFloor(roomNumber[0]);

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

        resultContainer.innerHTML = result;
    }

    // Bind search button to function
    searchButton.addEventListener("click", findLocation);

    // Detect Enter key press in input field
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            findLocation();
        }
    });

    // Function to determine floor number
    function determineFloor(firstDigit) {
        if (firstDigit === "G") return currentLanguage === 'en' ? "Ground" : "الأرضي";
        if (firstDigit === "1") return currentLanguage === 'en' ? "1st" : "الأول";
        if (firstDigit === "2") return currentLanguage === 'en' ? "2nd" : "الثاني";
        if (firstDigit === "3") return currentLanguage === 'en' ? "3rd" : "الثالث";
        return currentLanguage === 'en' ? `${firstDigit}th` : `ال${firstDigit}`;
    }
});
