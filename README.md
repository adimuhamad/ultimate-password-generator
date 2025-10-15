# Ultimate Password Generator 🔐

**Ultimate Password Generator** is a modern, feature-rich front-end web app for generating strong and secure passwords. Built with a clean and intuitive UI, it's packed with customization options to meet all your security needs. Get your powerful and personalized password now!

---

## 🔥 Key Features

This isn't just your average password generator. Here's a rundown of what it can do:

#### **Basic & Advanced Controls**
* **Length & Count**: Tweak the password length (8-32 chars) and the number of passwords to generate at once (1-8).
* **Comprehensive Character Sets**:
    * **Standard**: Numbers (`0-9`), Lowercase (`a-z`), Uppercase (`A-Z`), and common Symbols (`$%&@#`).
    * **Special**: Accent characters (`ÁáÉé`), Currencies (`₽€¥£`), Mathematical (`±×÷∫`), and Physics (`αβγδε`).
* **Exclusion Options**:
    * Exclude similar-looking characters to avoid confusion (`1IiLlOo0`).
    * Exclude ambiguous characters that can break formatting (`~,.:;^`).
    * Ensure no duplicate characters are used at all.
    * Prevent consecutive duplicate characters.

#### **Power-User Customization**
* **Prefix & Suffix**: Add custom text to the beginning or end of your passwords.
* **Must-Include Characters**: Force the output to contain specific characters you need.
* **Must-Exclude Characters**: Ban specific characters from ever appearing in the output.
* **Reset Button**: Quickly clear all custom options with a single click.

#### **Real-time Strength Analysis**
* **Security Score**: Each password is analyzed using Dropbox's **zxcvbn** library, scoring it from 0 (very weak) to 4 (very strong).
* **Visual Strength Bar**: An intuitive color-coded bar (red to blue) visually represents the password's strength.
* **Crack Time Estimation**: Get a realistic estimate of how long it would take to crack your password.
* **Suggestions & Warnings**: Receive helpful feedback and suggestions to make your password even better.

#### **Premium User Experience (UX)**
* **Light & Dark Mode**: A comfortable viewing experience at any time of day, with your theme preference saved automatically.
* **One-Click Copy**: Easily copy any password to your clipboard.
* **Session Persistence**: Generated passwords remain even after a page reload, preventing accidental loss.
* **Exit Confirmation**: Get a warning before closing the tab with generated passwords, ensuring you don't lose important results.
* **Toast Notifications**: Clear, non-intrusive feedback for actions like "Copied!" or "Options Reset."
* **Persistent Settings**: All your preferences are saved in the browser's `localStorage`, so you don't have to set them up again on every visit.

---

## 🛠️ Tech Stack

* **HTML5**: For semantic web structure.
* **CSS3**: For modern, responsive design using Flexbox and CSS Variables for dynamic theming.
* **Vanilla JavaScript (ES6+)**: For all the core application logic, with zero external frameworks.
* **zxcvbn.js**: For robust password strength estimation.

---

## 🚀 Running Locally

This app doesn't require any complex builds or installations. Just follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/MochAdiMR/password-generator.git](https://github.com/MochAdiMR/password-generator.git)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd password-generator
    ```
3.  **Open the `index.html` file** in your favorite browser. That's it!

---

## 📸 Screenshot

<img width="412" height="622" alt="image" src="https://github.com/user-attachments/assets/9a950c33-7533-412f-a7ac-d9a81c46d7c3" />

**Note:** This is a screenshot of the old version, try checking the live demo to see how the latest version looks. I'm too lazy to take a new screenshot, sorry not sorry.
