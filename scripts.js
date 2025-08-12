(() => {
    // Definisi konstanta dan elemen DOM
    const lengthVal = document.getElementById('length-val');
    const countVal = document.getElementById('count-val');
    const generateBtn = document.getElementById('generate-btn');
    const passwordList = document.getElementById('password-list');
    const toastContainer = document.getElementById('toast-container');
    const themeToggleBtn = document.getElementById('theme-toggle');

    const lengthControlContainer = document.getElementById('length-control-container');

    const incLengthBtn = document.getElementById('inc-length');
    const decLengthBtn = document.getElementById('dec-length');
    const incCountBtn = document.getElementById('inc-count');
    const decCountBtn = document.getElementById('dec-count');

    // Tambahan elemen DOM untuk fitur baru
    const initialTextCheckbox = document.getElementById('add-initial-text-checkbox');
    const initialTextInput = document.getElementById('initial-text-input');

    const CHARSETS = {
        numbers: "0123456789",
        lowercase: "abcdefghijklmnopqrstuvwxyz",
        uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        symbols: "$%&@#~,.:;!?_*-+^=/|\\()<>{}[]'`\"",
        personalized: "áéíóú",
        similar: "1IiLlOo0",
        ambiguous: "~,.:;^/|\\()<>{}[]'`\"",
    };

    const STRENGTH_COLORS = ["#e74c3c", "#f39c12", "#f1c40f", "#2ecc71", "#3498db"];
    const MIN_LENGTH = 8;
    const MIN_COUNT = 1;
    const MAX_LENGTH = 32;
    const MAX_COUNT = 8;

    let passwordLength = MIN_LENGTH;
    let passwordCount = MIN_COUNT;

    const getSettings = () => {
        const settings = {
            length: passwordLength,
            count: passwordCount,
            options: {
                includeNumbers: document.getElementById('include-numbers').checked,
                includeLowercase: document.getElementById('include-lowercase').checked,
                includeUppercase: document.getElementById('include-uppercase').checked,
                includeSymbols: document.getElementById('include-symbols').checked,
                includePersonalized: document.getElementById('include-personalized').checked,
                excludeSimilar: document.getElementById('exclude-similar').checked,
                excludeAmbiguous: document.getElementById('exclude-ambiguous').checked,
                excludeDuplicates: document.getElementById('exclude-duplicates').checked,
                excludeConsecutive: document.getElementById('exclude-consecutive').checked,
            },
            theme: document.body.classList.contains('dark-mode') ? 'dark' : 'light',
            initialText: {
                enabled: initialTextCheckbox.checked,
                value: initialTextInput.value
            }
        };
        return settings;
    };

    const saveSettings = () => {
        localStorage.setItem('pwdGenSettings', JSON.stringify(getSettings()));
    };

    const loadSettings = () => {
        const savedSettings = localStorage.getItem('pwdGenSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);

            const moonSvg = `<svg height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000" transform="rotate(-45)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#FFDA44;" d="M506.298,202.547c-3.639-17.048-27.89-17.747-32.446-0.868 c-15.349,56.82-67.255,98.886-128.808,98.843c-73.591-0.013-133.552-59.854-133.565-133.565 c-0.042-61.556,42.024-113.458,98.84-128.808c16.83-4.546,16.229-28.799-0.869-32.446C292.244,2.03,274.371-0.001,256,0 C114.796,0.031,0.031,114.79,0,256c0.031,141.21,114.796,255.969,256,256c141.204-0.031,255.969-114.79,256-256 C512.001,237.628,509.971,219.756,506.298,202.547z"></path> <path style="fill:#EEBF00;" d="M495.304,211.478c0-7.25-0.464-14.385-1.237-21.431c-8.097-1.968-17.539,1.715-20.216,11.631 c-15.349,56.82-67.255,98.885-128.808,98.843c-73.591-0.013-133.552-59.854-133.565-133.565 c-0.042-61.557,42.024-113.458,98.84-128.808c9.889-2.671,13.595-12.114,11.636-20.215c-7.044-0.772-14.181-1.238-21.433-1.238 c-107.576,0-194.783,87.207-194.783,194.783s87.207,194.783,194.783,194.783S495.304,319.054,495.304,211.478z"></path> </g></svg>`;
            const sunSvg = `<svg width="24px" height="24px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#FFAC33" d="M16 2s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2V2zm18 14s2 0 2 2s-2 2-2 2h-2s-2 0-2-2s2-2 2-2h2zM4 16s2 0 2 2s-2 2-2 2H2s-2 0-2-2s2-2 2-2h2zm5.121-8.707s1.414 1.414 0 2.828s-2.828 0-2.828 0L4.878 8.708s-1.414-1.414 0-2.829c1.415-1.414 2.829 0 2.829 0l1.414 1.414zm21 21s1.414 1.414 0 2.828s-2.828 0-2.828 0l-1.414-1.414s-1.414-1.414 0-2.828s2.828 0 2.828 0l1.414 1.414zm-.413-18.172s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828l-1.414 1.414zm-21 21s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828l-1.414 1.414zM16 32s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2v-2z"></path><circle fill="#FFAC33" cx="18" cy="18" r="10"></circle></g></svg>`;

            // Menyesuaikan nilai yang dimuat agar tidak melebihi MAX_LENGTH atau MAX_COUNT
            passwordLength = Math.min(settings.length, MAX_LENGTH);
            passwordCount = Math.min(settings.count, MAX_COUNT);
            
            lengthVal.textContent = passwordLength;
            countVal.textContent = passwordCount;

            document.getElementById('include-numbers').checked = settings.options.includeNumbers;
            document.getElementById('include-lowercase').checked = settings.options.includeLowercase;
            document.getElementById('include-uppercase').checked = settings.options.includeUppercase;
            document.getElementById('include-symbols').checked = settings.options.includeSymbols;
            document.getElementById('include-personalized').checked = settings.options.includePersonalized;
            document.getElementById('exclude-similar').checked = settings.options.excludeSimilar;
            document.getElementById('exclude-ambiguous').checked = settings.options.excludeAmbiguous;
            document.getElementById('exclude-duplicates').checked = settings.options.excludeDuplicates;
            document.getElementById('exclude-consecutive').checked = settings.options.excludeConsecutive;
            
            if (settings.initialText) {
                initialTextCheckbox.checked = settings.initialText.enabled;
                initialTextInput.value = settings.initialText.value;
                initialTextInput.disabled = !settings.initialText.enabled;
            }

            if (settings.theme === 'dark') {
                document.body.classList.add('dark-mode');
                themeToggleBtn.innerHTML = moonSvg;
            } else {
                document.body.classList.remove('dark-mode');
                themeToggleBtn.innerHTML = sunSvg;
            }

        } else {
            // Pengaturan default jika belum ada di Local Storage
            document.getElementById('include-numbers').checked = true;
            document.getElementById('include-lowercase').checked = true;
            document.getElementById('include-uppercase').checked = true;
            document.getElementById('include-symbols').checked = true;
            document.getElementById('exclude-similar').checked = true;
            document.getElementById('exclude-ambiguous').checked = true;
            
            initialTextCheckbox.checked = false;
            initialTextInput.disabled = true;
        }
        updateUIState();
    };

    const showToast = (message) => {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 2000);
    };

    const updateUIState = () => {
        incLengthBtn.disabled = passwordLength >= MAX_LENGTH;
        decLengthBtn.disabled = passwordLength <= MIN_LENGTH;
        incCountBtn.disabled = passwordCount >= MAX_COUNT;
        decCountBtn.disabled = passwordCount <= MIN_COUNT;

        const charset = buildCharset();
        const excludeDuplicates = document.getElementById("exclude-duplicates").checked;
        const initialText = initialTextCheckbox.checked ? initialTextInput.value : '';

        const isAnyCharsetSelected = !!charset;
        
        if (initialText.length > passwordLength) {
            generateBtn.disabled = true;
            generateBtn.textContent = "INITIAL TEXT TOO LONG";
            return;
        }
        
        if (excludeDuplicates && passwordLength > (charset.length + initialText.length)) {
            generateBtn.disabled = true;
            generateBtn.textContent = "INVALID LENGTH";
        } else if (!isAnyCharsetSelected && passwordLength > initialText.length) {
            generateBtn.disabled = true;
            generateBtn.textContent = "SELECT A CHARACTER SET";
        } else {
            generateBtn.disabled = false;
            generateBtn.textContent = "GENERATE PASSWORD NOW!";
        }
    };
    
    const displayPassword = (password) => {
        const result = zxcvbn(password);
        const color = STRENGTH_COLORS[result.score];
        
        const passwordItem = document.createElement('div');
        passwordItem.className = 'password-item';
        passwordItem.innerHTML = `
            <div class="password-text">
                <span>${password}</span>
                <button class="copy-btn" aria-label="Copy password"><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="style=bulk"> <g id="copy"> <path id="Subtract" fill-rule="evenodd" clip-rule="evenodd" d="M11.1667 0.25C8.43733 0.25 6.25 2.50265 6.25 5.25H12.8333C15.5627 5.25 17.75 7.50265 17.75 10.25V18.75H17.8333C20.5627 18.75 22.75 16.4974 22.75 13.75V5.25C22.75 2.50265 20.5627 0.25 17.8333 0.25H11.1667Z" fill="#000000"></path> <path id="rec" d="M2 10.25C2 7.90279 3.86548 6 6.16667 6H12.8333C15.1345 6 17 7.90279 17 10.25V18.75C17 21.0972 15.1345 23 12.8333 23H6.16667C3.86548 23 2 21.0972 2 18.75V10.25Z" fill="#BFBFBF"></path> </g> </g> </g></svg></button>
            </div>
            <div class="strength-bar">
                <div class="strength-fill" style="width:${(result.score+1)*20}%;background:${color};"></div>
            </div>
            <div class="strength-info">
                <b>Score:</b> ${result.score}/4 – ${result.crack_times_display.offline_slow_hashing_1e4_per_second} to crack<br>
                ${result.feedback.warning ? `<b>Warning:</b> ${result.feedback.warning}<br>` : ""}
                ${result.feedback.suggestions.length ? `<b>Suggestions:</b> ${result.feedback.suggestions.join(', ')}` : ""}
            </div>
        `;
        passwordList.appendChild(passwordItem);
    };

    const buildCharset = () => {
        let charset = "";
        if (document.getElementById("include-numbers").checked) charset += CHARSETS.numbers;
        if (document.getElementById("include-lowercase").checked) charset += CHARSETS.lowercase;
        if (document.getElementById("include-uppercase").checked) charset += CHARSETS.uppercase;
        if (document.getElementById("include-symbols").checked) charset += CHARSETS.symbols;
        if (document.getElementById("include-personalized").checked) charset += CHARSETS.personalized;

        if (document.getElementById("exclude-similar").checked) charset = charset.replace(new RegExp(`[${CHARSETS.similar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`, 'g'), "");
        if (document.getElementById("exclude-ambiguous").checked) charset = charset.replace(new RegExp(`[${CHARSETS.ambiguous.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`, 'g'), "");

        return charset;
    };

    const generateSinglePassword = (length, charset, excludeDuplicates, excludeConsecutive) => {
        const initialText = initialTextCheckbox.checked ? initialTextInput.value : '';
        let password = initialText;
        
        const remainingLength = length - initialText.length;
        
        while (password.length < length) {
            const char = charset[secureRandom(charset.length)];
            
            if (excludeDuplicates && password.includes(char)) continue;
            
            if (excludeConsecutive && password.slice(-1) === char) continue;
            
            password += char;
        }
        return password;
    };

    const generatePasswords = () => {
        generateBtn.textContent = "GENERATING...";
        generateBtn.disabled = true;

        const charset = buildCharset();
        const excludeDuplicates = document.getElementById("exclude-duplicates").checked;
        const excludeConsecutive = document.getElementById("exclude-consecutive").checked;
        const initialText = initialTextCheckbox.checked ? initialTextInput.value : '';
        
        if (!charset && passwordLength > initialText.length) {
            showToast("Please select at least one character set or use a shorter initial text!");
            updateUIState();
            return;
        }
        if (excludeDuplicates && passwordLength > (charset.length + initialText.length)) {
            showToast(`Max length with unique chars is ${charset.length + initialText.length}`);
            updateUIState();
            return;
        }
        if (initialText.length > passwordLength) {
            showToast("Initial text is longer than password length!");
            updateUIState();
            return;
        }

        passwordList.innerHTML = '';
        const passwords = [];
        for (let i = 0; i < passwordCount; i++) {
            const password = generateSinglePassword(passwordLength, charset, excludeDuplicates, excludeConsecutive);
            passwords.push(password);
            displayPassword(password);
        }

        if (passwordCount > 1) {
            const copyAllBtnContainer = document.createElement('div');
            copyAllBtnContainer.className = 'all-actions';
            copyAllBtnContainer.innerHTML = `<button class="copy-all-btn" id="copy-all-btn">Copy All Passwords</button>`;
            passwordList.appendChild(copyAllBtnContainer);
        }
        
        showToast("Passwords generated!");
        updateUIState();
        generateBtn.textContent = "GENERATE PASSWORD NOW!";
    };

    const copyAllPasswords = () => {
        const allPasswords = Array.from(passwordList.querySelectorAll(".password-text span"))
                                  .map(span => span.textContent)
                                  .join('\n');
        
        if (allPasswords) {
            navigator.clipboard.writeText(allPasswords).then(() => showToast("All passwords copied!"));
        } else {
            showToast("No passwords to copy!");
        }
    };
    
    document.addEventListener('DOMContentLoaded', () => {
        loadSettings();
    });

    incLengthBtn.addEventListener('click', () => {
        passwordLength = Math.min(MAX_LENGTH, passwordLength + 1);
        lengthVal.textContent = passwordLength;
        saveSettings();
        updateUIState();
    });
    decLengthBtn.addEventListener('click', () => {
        passwordLength = Math.max(MIN_LENGTH, passwordLength - 1);
        lengthVal.textContent = passwordLength;
        saveSettings();
        updateUIState();
    });
    incCountBtn.addEventListener('click', () => {
        passwordCount = Math.min(MAX_COUNT, passwordCount + 1);
        countVal.textContent = passwordCount;
        saveSettings();
        updateUIState();
    });
    decCountBtn.addEventListener('click', () => {
        passwordCount = Math.max(MIN_COUNT, passwordCount - 1);
        countVal.textContent = passwordCount;
        saveSettings();
        updateUIState();
    });
    
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            saveSettings();
            updateUIState();
        });
    });

    generateBtn.addEventListener('click', generatePasswords);

    passwordList.addEventListener('click', (event) => {
        // --- Perubahan di sini ---
        const copyBtn = event.target.closest('.copy-btn');

        if (copyBtn) {
            const passwordSpan = copyBtn.previousElementSibling;
            const passwordText = passwordSpan.textContent;
            navigator.clipboard.writeText(passwordText).then(() => showToast("Password copied!"));
        }
        // --- Akhir perubahan ---

        if (event.target.id === 'copy-all-btn') {
            copyAllPasswords();
        }
    });

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        const moonSvg = `<svg height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000" transform="rotate(-45)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#FFDA44;" d="M506.298,202.547c-3.639-17.048-27.89-17.747-32.446-0.868 c-15.349,56.82-67.255,98.886-128.808,98.843c-73.591-0.013-133.552-59.854-133.565-133.565 c-0.042-61.556,42.024-113.458,98.84-128.808c16.83-4.546,16.229-28.799-0.869-32.446C292.244,2.03,274.371-0.001,256,0 C114.796,0.031,0.031,114.79,0,256c0.031,141.21,114.796,255.969,256,256c141.204-0.031,255.969-114.79,256-256 C512.001,237.628,509.971,219.756,506.298,202.547z"></path> <path style="fill:#EEBF00;" d="M495.304,211.478c0-7.25-0.464-14.385-1.237-21.431c-8.097-1.968-17.539,1.715-20.216,11.631 c-15.349,56.82-67.255,98.885-128.808,98.843c-73.591-0.013-133.552-59.854-133.565-133.565 c-0.042-61.557,42.024-113.458,98.84-128.808c9.889-2.671,13.595-12.114,11.636-20.215c-7.044-0.772-14.181-1.238-21.433-1.238 c-107.576,0-194.783,87.207-194.783,194.783s87.207,194.783,194.783,194.783S495.304,319.054,495.304,211.478z"></path> </g></svg>`;
        const sunSvg = `<svg width="24px" height="24px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#FFAC33" d="M16 2s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2V2zm18 14s2 0 2 2s-2 2-2 2h-2s-2 0-2-2s2-2 2-2h2zM4 16s2 0 2 2s-2 2-2 2H2s-2 0-2-2s2-2 2-2h2zm5.121-8.707s1.414 1.414 0 2.828s-2.828 0-2.828 0L4.878 8.708s-1.414-1.414 0-2.829c1.415-1.414 2.829 0 2.829 0l1.414 1.414zm21 21s1.414 1.414 0 2.828s-2.828 0-2.828 0l-1.414-1.414s-1.414-1.414 0-2.828s2.828 0 2.828 0l1.414 1.414zm-.413-18.172s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828l-1.414 1.414zm-21 21s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828l-1.414 1.414zM16 32s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2v-2z"></path><circle fill="#FFAC33" cx="18" cy="18" r="10"></circle></g></svg>`;

        themeToggleBtn.innerHTML = isDarkMode ? moonSvg : sunSvg;

        saveSettings();
    });

    // Event listener baru untuk fitur 'Add Initial Text'
    initialTextCheckbox.addEventListener('change', () => {
        initialTextInput.disabled = !initialTextCheckbox.checked;
        if (!initialTextCheckbox.checked) {
            initialTextInput.value = '';
        }
        saveSettings();
        updateUIState();
    });

    initialTextInput.addEventListener('input', () => {
        saveSettings();
        updateUIState();
    });

    // secureRandom function
    function secureRandom(max) {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        return array[0] % max;
    }

})();
