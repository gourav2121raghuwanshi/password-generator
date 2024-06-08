const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-PasswordDisplay]");
const copyMsg = document.querySelector("[data-copyMsg]")
const copyBtn = document.querySelector("[data-copy]")
const uppercaseCheck = document.querySelector("#uppercase")
const lowercaseCheck = document.querySelector("#lowercase")
const numbersCheck = document.querySelector("#numbers")
const symbolsCheck = document.querySelector("#symbols")
const indicator = document.querySelector("[data-indicator]")
const generateBtn = document.querySelector(".generateButton")
const allCheckBox = document.querySelectorAll("input[type=checkbox]")
const symbolString = "!@#$%^&*()_-+={}[]|\\:;\"'<>,.?/";


let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();


// set strength circle color to grey


// set passWordLength
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    // handling half-shade half empty part
    const maxi=inputSlider.max;
    const mini=inputSlider.min;
    inputSlider.style.backgroundSize=((passwordLength-mini)*100/(maxi-mini))+"% 100%";
}
// strength ka color and shadow set
function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = "1px 1px 2px black";
}
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;

}

function generateRandomNumber() {
    return getRandomInteger(0, 9);
}
function generateLowerCase() {
    return String.fromCharCode(getRandomInteger(97, 123));
}
function generateUpperCase() {
    return String.fromCharCode(getRandomInteger(65, 91));
}
// function generateSymbol() {
//     const rand = getRandomInteger(0, symbolString.length)
//      symbolString.charAt[rand]

// }
function generateSymbol() {
    const rand = getRandomInteger(0, symbolString.length);
    return symbolString.charAt(rand);
}
function calcStrength() {
    let hasUpper = false;
    let hasLower = 0;
    let hasNum = 0;
    let hasSymbol = 0;
    if (uppercaseCheck.checked) hasUpper = 1;
    if (lowercaseCheck.checked) hasLower = 1;
    if (numbersCheck.checked) hasNum = 1;
    if (symbolsCheck.checked) hasSymbol = 1;

    if (hasLower && hasUpper && (hasNum || hasSymbol) && passwordLength >= 8) {
        setIndicator("#0f0")
    }
    else if ((hasLower || hasUpper) && (hasNum || hasSymbol) && passwordLength >= 6) {
        setIndicator("#ff0");
    }
    else {
        setIndicator("#f00")
    }
}

// copy content 
async function copyContet() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value)
        copyMsg.innerText = "copied";
    }
    catch (e) {
        copyMsg.innerText = "failed";
    }
    // to make copy span visible
    copyMsg.classList.add("active");
    setTimeout(() => {
        copyMsg.classList.remove("active")
    }, 2000)
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener("change", hadelBoxchange);
})

function hadelBoxchange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked) checkCount++;
    })
    // Special condition
    if (passwordLength < checkCount) {
        passwordLength = checkCount
        handleSlider()
    }
}


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})
copyBtn.addEventListener("click", () => {
    if (passwordDisplay.value) {
        copyContet();
    }
}
);

generateBtn.addEventListener("click", () => {
    // none of the checkbox are selcected
    if (checkCount == 0) return;
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider()
    }
    // let's find a new password;
    password = "";
    // let's put the stuff mentioned by checkbox

    // if (uppercaseCheck.checked) {
    //     password += generateUpperCase();
    // }
    // if (lowercaseCheck.checked) {
    //     password += generateLowerCase();
    // }
    // if (numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }
    // if (symbolsCheck.checked) {
    //     password += generateSymbol();
    // }
    let funcArr = [];
    //   if (uppercaseCheck.checked) {
    //     funcArr.push(generateUpperCase);
    //     }

    //       if (lowercaseCheck.checked) {
    //         funcArr.push(generateLowerCase);
    //     }
    //     if (numbersCheck.checked) {
    //         funcArr.push(generateRandomNumber);
    //     }
    //     if (symbolsCheck.checked) {
    //         funcArr.push(generateSymbol);
    //     }
    if (uppercaseCheck.checked) {
        funcArr.push(generateUpperCase);
    }
    if (lowercaseCheck.checked) {
        funcArr.push(generateLowerCase);
    }
    if (numbersCheck.checked) {
        funcArr.push(generateRandomNumber);
    }
    if (symbolsCheck.checked) {
        funcArr.push(generateSymbol);
    }
    // compulsory addition 
    // *****************************************************************************
    //     for (let i=0;i<funcArr.length;i++){
    //     password+=funcArr[i]();
    //     }
    // for(let i=0;i<passwordLength-funcArr.length;i++){
    //     let randidx=getRandomInteger(0,funcArr.length);
    //     password+=funcArr[randidx]();
    // }
    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
    }

    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randidx = getRandomInteger(0, funcArr.length - 1);
        password += funcArr[randidx]();
    }
    // shuffle the password
    password = sufflePassword(Array.from(password));

    // show in ui
    passwordDisplay.value = password;
    // calculate strength 
    calcStrength()

});

// function sufflePassword(array){
//     // fisher Yates Method
//     for(let i=array.length()-1;i>0;i--){
//         const j = Math.floor(Math.random()*(i+1));
//         const temp=array[i];
//         array[i]=array[j];
//         array[j]=temp;
//     }
//     let str="";
//     array.forEach((el)=>(str+=el));
//     return str;
// }
function sufflePassword(array) {
    // fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


// Generate Password event listenr
