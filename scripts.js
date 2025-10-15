(() => {

    const lengthVal = document.getElementById('length-val');
    const countVal = document.getElementById('count-val');
    const generateBtn = document.getElementById('generate-btn');
    const passwordList = document.getElementById('password-list');
    const toastContainer = document.getElementById('toast-container');
    const themeToggleBtn = document.getElementById('theme-toggle');

    const incLengthBtn = document.getElementById('inc-length');
    const decLengthBtn = document.getElementById('dec-length');
    const incCountBtn = document.getElementById('inc-count');
    const decCountBtn = document.getElementById('dec-count');

    const prefixCheckbox = document.getElementById('add-prefix-text-checkbox');
    const prefixInput = document.getElementById('prefix-text-input');
    const suffixCheckbox = document.getElementById('add-suffix-text-checkbox');
    const suffixInput = document.getElementById('suffix-text-input');
    const mustIncludeCheckbox = document.getElementById('must-include-checkbox');
    const mustIncludeInput = document.getElementById('must-include-input');
    const mustExcludeCheckbox = document.getElementById('must-exclude-checkbox');
    const mustExcludeInput = document.getElementById('must-exclude-input');
    const resetCustomBtn = document.getElementById('reset-custom-btn');

    const customOptions = [
        { checkbox: prefixCheckbox, input: prefixInput },
        { checkbox: suffixCheckbox, input: suffixInput },
        { checkbox: mustIncludeCheckbox, input: mustIncludeInput },
        { checkbox: mustExcludeCheckbox, input: mustExcludeInput },
    ];

    const CHARSETS = {
        numbers: "0123456789",
        lowercase: "abcdefghijklmnopqrstuvwxyz",
        uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        symbols: "$%&@#~,.:;!?_*-+^=/|\\()<>{}[]'`\"",
        personalized: "ÁáÉéÍíÓóÚúÝýĆćŃńŔŕŚśŹźǴǵḰḱĹĺṔṕŚśẂẃ",
        currency: "₽€¥£₸₮₩₡₵₭₱₲₦ƒ₥₼৳₹₾₪₺₴ლ",
        mathematics: "±×÷∫∑√∂∇≈≠≡≤≥⊂⊃⊆⊇⊕⊗°",
        physics: "αβγδεηθλμνπρστφχψω∞ΔΣΩ",
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
    let storedCustomValues = {};

    const getSettings = () => ({
        length: passwordLength,
        count: passwordCount,
        options: {
            includeNumbers: document.getElementById('include-numbers').checked,
            includeLowercase: document.getElementById('include-lowercase').checked,
            includeUppercase: document.getElementById('include-uppercase').checked,
            includeSymbols: document.getElementById('include-symbols').checked,
            includePersonalized: document.getElementById('include-personalized').checked,
            includeCurrency: document.getElementById('include-currency').checked,
            includeMathematics: document.getElementById('include-mathematics').checked,
            includePhysics: document.getElementById('include-physics').checked,
            excludeSimilar: document.getElementById('exclude-similar').checked,
            excludeAmbiguous: document.getElementById('exclude-ambiguous').checked,
            excludeDuplicates: document.getElementById('exclude-duplicates').checked,
            excludeConsecutive: document.getElementById('exclude-consecutive').checked,
        },
        theme: document.body.classList.contains('dark-mode') ? 'dark' : 'light',
        customText: {
            prefix: { enabled: prefixCheckbox.checked, value: prefixInput.value },
            suffix: { enabled: suffixCheckbox.checked, value: suffixInput.value },
            mustInclude: { enabled: mustIncludeCheckbox.checked, value: mustIncludeInput.value },
            mustExclude: { enabled: mustExcludeCheckbox.checked, value: mustExcludeInput.value },
        }
    });

    const saveSettings = () => {
        localStorage.setItem('pwdGenSettings', JSON.stringify(getSettings()));
    };

    const updateInputState = (checkbox, input) => {
        if (!input) return;
        input.disabled = !checkbox.checked;
        if (checkbox.checked) {
            const name = input.id.split('-')[0];
            input.placeholder = `Enter ${name} text`;
        } else {
            input.placeholder = 'Disabled';
        }
    };

    const loadState = () => {
        const savedSettings = localStorage.getItem('pwdGenSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            passwordLength = Math.min(settings.length || MIN_LENGTH, MAX_LENGTH);
            passwordCount = Math.min(settings.count || MIN_COUNT, MAX_COUNT);
            lengthVal.textContent = passwordLength;
            countVal.textContent = passwordCount;

            Object.keys(settings.options).forEach(key => {
                const element = document.getElementById(key.replace(/([A-Z])/g, "-$1").toLowerCase());
                if (element) element.checked = settings.options[key];
            });

            if (settings.customText) {
                const customMapping = {
                    prefix: { checkbox: prefixCheckbox, input: prefixInput },
                    suffix: { checkbox: suffixCheckbox, input: suffixInput },
                    mustInclude: { checkbox: mustIncludeCheckbox, input: mustIncludeInput },
                    mustExclude: { checkbox: mustExcludeCheckbox, input: mustExcludeInput },
                };
                Object.keys(customMapping).forEach(key => {
                    if (settings.customText[key]) {
                        const { checkbox, input } = customMapping[key];
                        checkbox.checked = settings.customText[key].enabled;
                        input.value = settings.customText[key].value || '';
                        if (!checkbox.checked) {
                            storedCustomValues[input.id] = input.value;
                        }
                        updateInputState(checkbox, input);
                    }
                });
            }
             if (settings.theme === 'dark') {
                document.body.classList.add('dark-mode');
                themeToggleBtn.innerHTML = `<svg height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000" transform="rotate(-45)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#FFDA44;" d="M506.298,202.547c-3.639-17.048-27.89-17.747-32.446-0.868 c-15.349,56.82-67.255,98.886-128.808,98.843c-73.591-0.013-133.552-59.854-133.565-133.565 c-0.042-61.556,42.024-113.458,98.84-128.808c16.83-4.546,16.229-28.799-0.869-32.446C292.244,2.03,274.371-0.001,256,0 C114.796,0.031,0.031,114.79,0,256c0.031,141.21,114.796,255.969,256,256c141.204-0.031,255.969-114.79,256-256 C512.001,237.628,509.971,219.756,506.298,202.547z"></path> <path style="fill:#EEBF00;" d="M495.304,211.478c0-7.25-0.464-14.385-1.237-21.431c-8.097-1.968-17.539,1.715-20.216,11.631 c-15.349,56.82-67.255,98.885-128.808,98.843c-73.591-0.013-133.552-59.854-133.565-133.565 c-0.042-61.557,42.024-113.458,98.84-128.808c9.889-2.671,13.595-12.114,11.636-20.215c-7.044-0.772-14.181-1.238-21.433-1.238 c-107.576,0-194.783,87.207-194.783,194.783s87.207,194.783,194.783,194.783S495.304,319.054,495.304,211.478z"></path> </g></svg>`;
            } else {
                document.body.classList.remove('dark-mode');
                themeToggleBtn.innerHTML = `<svg width="24px" height="24px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#FFAC33" d="M16 2s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2V2zm18 14s2 0 2 2s-2 2-2 2h-2s-2 0-2-2s2-2 2-2h2zM4 16s2 0 2 2s-2 2-2 2H2s-2 0-2-2s2-2 2-2h2zm5.121-8.707s1.414 1.414 0 2.828s-2.828 0-2.828 0L4.878 8.708s-1.414-1.414 0-2.829c1.415-1.414 2.829 0 2.829 0l1.414 1.414zm21 21s1.414 1.414 0 2.828s-2.828 0-2.828 0l-1.414-1.414s-1.414-1.414 0-2.828s2.828 0 2.828 0l1.414 1.414zm-.413-18.172s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828l-1.414 1.414zm-21 21s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828l-1.414 1.414zM16 32s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2v-2z"></path><circle fill="#FFAC33" cx="18" cy="18" r="10"></circle></g></svg>`;
            }
        } else {
            document.getElementById('include-numbers').checked = true;
            document.getElementById('include-lowercase').checked = true;
            document.getElementById('include-uppercase').checked = true;
            document.getElementById('exclude-similar').checked = true;
            customOptions.forEach(({ checkbox, input }) => {
                checkbox.checked = false;
                updateInputState(checkbox, input);
            });
        }

        const savedPasswords = JSON.parse(localStorage.getItem('savedPasswords') || '[]');
        renderPasswords(savedPasswords);
        updateUIState();
    };

    const showToast = (message) => {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toastContainer.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    const updateUIState = () => {
        incLengthBtn.disabled = passwordLength >= MAX_LENGTH;
        decLengthBtn.disabled = passwordLength <= MIN_LENGTH;
        incCountBtn.disabled = passwordCount >= MAX_COUNT;
        decCountBtn.disabled = passwordCount <= MIN_COUNT;

        const { prefix, suffix, mustInclude } = getSettings().customText;
        const charset = buildCharset();
        const excludeDuplicates = document.getElementById("exclude-duplicates").checked;

        let totalFixedLength = (prefix.enabled ? prefix.value.length : 0) + 
                               (suffix.enabled ? suffix.value.length : 0) +
                               (mustInclude.enabled ? [...new Set(mustInclude.value)].length : 0);

        generateBtn.disabled = false;
        generateBtn.textContent = "GENERATE PASSWORD NOW!";

        if (prefix.enabled && !prefix.value) {
            generateBtn.disabled = true;
            generateBtn.textContent = "PREFIX CANNOT BE EMPTY";
        } else if (suffix.enabled && !suffix.value) {
            generateBtn.disabled = true;
            generateBtn.textContent = "SUFFIX CANNOT BE EMPTY";
        } else if (mustInclude.enabled && !mustInclude.value) {
            generateBtn.disabled = true;
            generateBtn.textContent = "MUST INCLUDE CANNOT BE EMPTY";
        } else if (mustExcludeCheckbox.checked && !mustExcludeInput.value) {
            generateBtn.disabled = true;
            generateBtn.textContent = "MUST EXCLUDE CANNOT BE EMPTY";
        } else if (totalFixedLength > passwordLength) {
            generateBtn.disabled = true;
            generateBtn.textContent = "FIXED TEXTS TOO LONG";
        } else if (excludeDuplicates && passwordLength > charset.length + (mustInclude.enabled ? mustInclude.value.length : 0)) {
             generateBtn.disabled = true;
             generateBtn.textContent = "INVALID LENGTH FOR UNIQUE";
        } else if (!charset.length && passwordLength > (prefix.enabled ? prefix.value.length : 0) + (suffix.enabled ? suffix.value.length : 0)) {
            generateBtn.disabled = true;
            generateBtn.textContent = "SELECT A CHARACTER SET";
        }
    };

    const renderPasswords = (passwords) => {
        passwordList.innerHTML = '';
        passwords.forEach(pwd => {
            const result = zxcvbn(pwd);
            const color = STRENGTH_COLORS[result.score];
            const passwordItem = document.createElement('div');
            passwordItem.className = 'password-item';
            passwordItem.innerHTML = `
                <div class="password-text">
                    <span>${pwd}</span>
                    <button class="copy-btn" aria-label="Copy password"><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="style=bulk"> <g id="copy"> <path id="Subtract" fill-rule="evenodd" clip-rule="evenodd" d="M11.1667 0.25C8.43733 0.25 6.25 2.50265 6.25 5.25H12.8333C15.5627 5.25 17.75 7.50265 17.75 10.25V18.75H17.8333C20.5627 18.75 22.75 16.4974 22.75 13.75V5.25C22.75 2.50265 20.5627 0.25 17.8333 0.25H11.1667Z" fill="#000000"></path> <path id="rec" d="M2 10.25C2 7.90279 3.86548 6 6.16667 6H12.8333C15.1345 6 17 7.90279 17 10.25V18.75C17 21.0972 15.1345 23 12.8333 23H6.16667C3.86548 23 2 21.0972 2 18.75V10.25Z" fill="#BFBFBF"></path> </g> </g> </g></svg></button>
                </div>
                <div class="strength-bar"><div class="strength-fill" style="width:${(result.score+1)*20}%;background:${color};"></div></div>
                <div class="strength-info"><b>Score:</b> ${result.score}/4 – ${result.crack_times_display.offline_slow_hashing_1e4_per_second} to crack</div>`;
            passwordList.appendChild(passwordItem);
        });

        if (passwords.length > 0) {
            const actionsContainer = document.createElement('div');
            actionsContainer.className = 'all-actions';
            if (passwords.length === 1) {
                actionsContainer.innerHTML = `<button class="action-btn delete-btn" id="delete-all-btn">Delete Password</button>`;
            } else {
                actionsContainer.innerHTML = `
                    <button class="action-btn delete-btn" id="delete-all-btn">Delete All Passwords</button>
                    <button class="action-btn" id="copy-all-btn">Copy All Passwords</button>`;
            }
            passwordList.appendChild(actionsContainer);
        }
    };

    const buildCharset = () => {
        let charset = "";
        if (document.getElementById("include-numbers").checked) charset += CHARSETS.numbers;
        if (document.getElementById("include-lowercase").checked) charset += CHARSETS.lowercase;
        if (document.getElementById("include-uppercase").checked) charset += CHARSETS.uppercase;
        if (document.getElementById("include-symbols").checked) charset += CHARSETS.symbols;
        if (document.getElementById("include-personalized").checked) charset += CHARSETS.personalized;
        if (document.getElementById("include-currency").checked) charset += CHARSETS.currency;
        if (document.getElementById("include-mathematics").checked) charset += CHARSETS.mathematics;
        if (document.getElementById("include-physics").checked) charset += CHARSETS.physics;

        if (document.getElementById("exclude-similar").checked) charset = charset.replace(new RegExp(`[${CHARSETS.similar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`, 'g'), "");
        if (document.getElementById("exclude-ambiguous").checked) charset = charset.replace(new RegExp(`[${CHARSETS.ambiguous.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`, 'g'), "");

        const mustExcludeChars = mustExcludeCheckbox.checked ? mustExcludeInput.value : '';
        if (mustExcludeChars) {
            charset = charset.replace(new RegExp(`[${mustExcludeChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`, 'g'), "");
        }
        return charset;
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = secureRandom(i + 1);
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const generateSinglePassword = (settings) => {
        const { length, options, customText } = settings;
        const charset = buildCharset();

        let password = customText.prefix.enabled ? customText.prefix.value : '';
        const suffix = customText.suffix.enabled ? customText.suffix.value : '';
        const mustInclude = customText.mustInclude.enabled ? customText.mustInclude.value : '';

        const remainingLength = length - password.length - suffix.length;
        let middlePart = Array.from(mustInclude);

        const randomCharsNeeded = remainingLength - middlePart.length;

        if (randomCharsNeeded > 0) {
            for (let i = 0; i < randomCharsNeeded; i++) {
                if (charset.length === 0) break;
                let char;
                let attempts = 0;
                do {
                    char = charset[secureRandom(charset.length)];
                    attempts++;
                    if (attempts > charset.length * 5) break;
                } while (options.excludeDuplicates && (password + middlePart.join('')).includes(char));
                middlePart.push(char);
            }
        }

        middlePart = shuffleArray(middlePart);
        password += middlePart.join('') + suffix;
        return password;
    };

    const generatePasswords = () => {
        generateBtn.textContent = "GENERATING...";
        generateBtn.disabled = true;

        const settings = getSettings();
        const charset = buildCharset();

        const { prefix, suffix, mustInclude } = settings.customText;
        if ((prefix.enabled && !prefix.value) || (suffix.enabled && !suffix.value) || (mustInclude.enabled && !mustInclude.value) || (mustExcludeCheckbox.checked && !mustExcludeInput.value)) {
            showToast("Enabled custom fields cannot be empty!");
            updateUIState();
            return;
        }

        const totalFixedLength = (prefix.enabled ? prefix.value.length : 0) + (suffix.enabled ? suffix.value.length : 0) + (mustInclude.enabled ? [...new Set(mustInclude.value)].length : 0);
        if (totalFixedLength > passwordLength) {
            showToast("Combined length of custom texts exceeds password length!");
            updateUIState();
            return;
        }

        if (!charset && passwordLength > (prefix.enabled ? prefix.value.length : 0) + (suffix.enabled ? suffix.value.length : 0)) {
            showToast("Please select at least one character set!");
            updateUIState();
            return;
        }

        for (const char of mustInclude.value) {
            if (!charset.includes(char)) {
                showToast(`Character '${char}' from 'Must Include' is not in the selected character sets!`);
                updateUIState();
                return;
            }
        }

        const newPasswords = [];
        for (let i = 0; i < passwordCount; i++) {
            newPasswords.push(generateSinglePassword(settings));
        }

        localStorage.setItem('savedPasswords', JSON.stringify(newPasswords));
        renderPasswords(newPasswords);
        showToast(passwordCount > 1 ? "All passwords generated!" : "Password generated!");
        updateUIState();
    };

    const handleCustomTextToggle = (checkbox, input) => {
        if (checkbox.checked) {
            input.value = storedCustomValues[input.id] || '';
        } else {
            storedCustomValues[input.id] = input.value;
            input.value = '';
        }
        updateInputState(checkbox, input);
        saveSettings();
        updateUIState();
    };

    document.addEventListener('DOMContentLoaded', loadState);

    window.addEventListener('beforeunload', (e) => {
        const savedPasswords = localStorage.getItem('savedPasswords');
        if (savedPasswords && JSON.parse(savedPasswords).length > 0) {
            e.preventDefault();
            e.returnValue = 'Ada password yang sudah berhasil dibuat dan kamu akan kehilangannya! Apakah kamu tetap ingin menutup tab?';
        }
    });

    window.addEventListener('unload', () => {
        localStorage.removeItem('savedPasswords');
    });

    [incLengthBtn, decLengthBtn, incCountBtn, decCountBtn].forEach(btn => {
        btn.addEventListener('click', () => {
            const isLength = btn.id.includes('length');
            const isInc = btn.id.includes('inc');
            if (isLength) {
                passwordLength = Math.max(MIN_LENGTH, Math.min(MAX_LENGTH, passwordLength + (isInc ? 1 : -1)));
                lengthVal.textContent = passwordLength;
            } else {
                passwordCount = Math.max(MIN_COUNT, Math.min(MAX_COUNT, passwordCount + (isInc ? 1 : -1)));
                countVal.textContent = passwordCount;
            }
            saveSettings();
            updateUIState();
        });
    });

    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.id.includes('-checkbox')) {
                const inputId = checkbox.id.replace('add-', '').replace('-checkbox', '-input');
                const input = document.getElementById(inputId);
                if (input) handleCustomTextToggle(checkbox, input);
            } else {
                saveSettings();
                updateUIState();
            }
        });
    });

    customOptions.forEach(({ input }) => {
        input.addEventListener('input', () => {
            saveSettings();
            updateUIState();
        });
    });

    resetCustomBtn.addEventListener('click', () => {
        customOptions.forEach(({ checkbox, input }) => {
            input.value = '';
            storedCustomValues[input.id] = '';
            if (checkbox.checked) {
                checkbox.checked = false;
            }
            updateInputState(checkbox, input);
        });
        saveSettings();
        updateUIState();
        updateCounters(); 

        showToast('Custom options reset!');
    });

    generateBtn.addEventListener('click', generatePasswords);

    passwordList.addEventListener('click', (event) => {
        const target = event.target;
        const copyBtn = target.closest('.copy-btn');
        if (copyBtn) {
            navigator.clipboard.writeText(copyBtn.previousElementSibling.textContent).then(() => showToast("Password copied!"));
            return;
        }
        if (target.id === 'copy-all-btn') {
            const allPasswords = Array.from(passwordList.querySelectorAll(".password-text span")).map(span => span.textContent).join('\n');
            if (allPasswords) navigator.clipboard.writeText(allPasswords).then(() => showToast("All passwords copied!"));
            return;
        }
        if (target.id === 'delete-all-btn') {
            localStorage.removeItem('savedPasswords');
            renderPasswords([]);
            showToast('Passwords deleted!');
        }
    });

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        themeToggleBtn.innerHTML = isDarkMode ? `<svg height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000" transform="rotate(-45)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#FFDA44;" d="M506.298,202.547c-3.639-17.048-27.89-17.747-32.446-0.868 c-15.349,56.82-67.255,98.886-128.808,98.843c-73.591-0.013-133.552-59.854-133.565-133.565 c-0.042-61.556,42.024-113.458,98.84-128.808c16.83-4.546,16.229-28.799-0.869-32.446C292.244,2.03,274.371-0.001,256,0 C114.796,0.031,0.031,114.79,0,256c0.031,141.21,114.796,255.969,256,256c141.204-0.031,255.969-114.79,256-256 C512.001,237.628,509.971,219.756,506.298,202.547z"></path> <path style="fill:#EEBF00;" d="M495.304,211.478c0-7.25-0.464-14.385-1.237-21.431c-8.097-1.968-17.539,1.715-20.216,11.631 c-15.349,56.82-67.255,98.885-128.808,98.843c-73.591-0.013-133.552-59.854-133.565-133.565 c-0.042-61.557,42.024-113.458,98.84-128.808c9.889-2.671,13.595-12.114,11.636-20.215c-7.044-0.772-14.181-1.238-21.433-1.238 c-107.576,0-194.783,87.207-194.783,194.783s87.207,194.783,194.783,194.783S495.304,319.054,495.304,211.478z"></path> </g></svg>` : `<svg width="24px" height="24px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#FFAC33" d="M16 2s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2V2zm18 14s2 0 2 2s-2 2-2 2h-2s-2 0-2-2s2-2 2-2h2zM4 16s2 0 2 2s-2 2-2 2H2s-2 0-2-2s2-2 2-2h2zm5.121-8.707s1.414 1.414 0 2.828s-2.828 0-2.828 0L4.878 8.708s-1.414-1.414 0-2.829c1.415-1.414 2.829 0 2.829 0l1.414 1.414zm21 21s1.414 1.414 0 2.828s-2.828 0-2.828 0l-1.414-1.414s-1.414-1.414 0-2.828s2.828 0 2.828 0l1.414 1.414zm-.413-18.172s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828l-1.414 1.414zm-21 21s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828l-1.414 1.414zM16 32s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2v-2z"></path><circle fill="#FFAC33" cx="18" cy="18" r="10"></circle></g></svg>`;
        saveSettings();
    });

    function secureRandom(max) {
        return window.crypto.getRandomValues(new Uint32Array(1))[0] % max;
    }

    const groups = {
        "Basic Characters": ["include-numbers", "include-lowercase", "include-uppercase", "include-symbols"],
        "Special Characters": ["include-personalized", "include-currency", "include-mathematics", "include-physics"],
        "Exclude Options": ["exclude-similar", "exclude-ambiguous", "exclude-duplicates", "exclude-consecutive"],
        "Custom Options": ["add-prefix-text-checkbox", "add-suffix-text-checkbox", "must-include-checkbox", "must-exclude-checkbox"]
    };

    document.querySelectorAll("details > summary").forEach(summary => {
        const span = document.createElement("span");
        span.className = "group-counter";
        summary.appendChild(span);
    });

    function updateCounters() {
        for (const [groupName, ids] of Object.entries(groups)) {
            const summary = Array.from(document.querySelectorAll("details > summary")).find(s => s.textContent.trim().startsWith(groupName));
            if (!summary) continue;
            const checkboxes = ids.map(id => document.getElementById(id)).filter(Boolean);
            const checked = checkboxes.filter(cb => cb.checked).length;
            const total = checkboxes.length;
            const counterSpan = summary.querySelector(".group-counter");
            if (counterSpan) counterSpan.textContent = `(${checked}/${total})`;
        }
    }

    document.querySelectorAll("input[type=checkbox]").forEach(cb => cb.addEventListener("change", updateCounters));

    document.querySelectorAll("details").forEach((detail, index) => {
        const saved = localStorage.getItem(`details-${index}`);
        if (saved === "open") detail.setAttribute("open", "");
        else if (saved === "closed") detail.removeAttribute("open");
        detail.addEventListener("toggle", () => localStorage.setItem(`details-${index}`, detail.open ? "open" : "closed"));
    });

    updateCounters();
})();
