const eyeContainer = document.getElementById('eye-container');
const smileImg = document.getElementById('smile-img');
const eyeLeft = document.getElementById('eye-left');
const eyeRight = document.getElementById('eye-right');
const mouth = document.getElementById('mouth');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const form = document.getElementById('form');
const usernameInput = document.getElementById('username');

//MOVE EYES WHEN TYPE USERNAME
const username = document.querySelector('#username');
username.addEventListener('keyup', moveEyes);
username.addEventListener('focusin', moveEyes);
username.addEventListener('click', resetMouth);

//MOVE EYES AND CHANGE MOUTH WHEN TYPE EMAIL
const email = document.querySelector('#email');
email.addEventListener('keyup', moveEyes);
email.addEventListener('keyup', moveMouth);
email.addEventListener('focusin', moveEyes);
email.addEventListener('focusin', moveMouth);

//CLOSE EYES WHEN TYPE PASSWORD
const password = document.querySelector('#password');
password.addEventListener('focusin', closeEyes);
const confirmPassword = document.querySelector('#confirm-password');
confirmPassword.addEventListener('focusin', closeEyes);

//SUBMIT FORM
form.addEventListener('submit', submitForm);

/*
  _____   _   _   _   _    ____   _____   ___    ___    _   _   ____  
 |  ___| | | | | | \ | |  / ___| |_   _| |_ _|  / _ \  | \ | | / ___| 
 | |_    | | | | |  \| | | |       | |    | |  | | | | |  \| | \___ \ 
 |  _|   | |_| | | |\  | | |___    | |    | |  | |_| | | |\  |  ___) |
 |_|      \___/  |_| \_|  \____|   |_|   |___|  \___/  |_| \_| |____/ 
                                                                      
*/

/*
 ____ ____ ____ ____ ____ 
||S |||M |||I |||L |||E ||
||__|||__|||__|||__|||__||
|/__\|/__\|/__\|/__\|/__\|
*/

function moveEyes(event) {
  let eventLength = event.target.value.length * 2;

  openEyes();
  eyeContainer.style.marginRight =
    +eventLength <= 45 && `${20 - +eventLength}px`;
}

function moveMouth(event) {
  let eventLength = event.target.value.length * 2;

  openEyes();
  mouth.style.width = +eventLength <= 15 ? `${60 + +eventLength}px` : '75px';
  mouth.style.borderRadius =
    +eventLength <= 28 ? `${10 + +eventLength}px` : '38px';
}

function closeEyes() {
  eyeContainer.style.marginRight = '0px';
  eyeLeft.classList.add('close-eyes');
  eyeRight.classList.add('close-eyes');
  smileImg.style.backgroundColor = '#FDD03C';
}

function openEyes() {
  eyeLeft.classList.remove('close-eyes');
  eyeRight.classList.remove('close-eyes');
  smileImg.style.backgroundColor = 'transparent';
}

function resetMouth() {
  mouth.style.width = '60px';
  mouth.style.borderRadius = '10px';
}

/*
 ____ ____ ____ ____ 
||F |||O |||R |||M ||
||__|||__|||__|||__||
|/__\|/__\|/__\|/__\|
*/

function checkIfIsEmpty(input) {
  let isEmpty = false;
  input.value.trim() !== '' && (isEmpty = true);
  return isEmpty;
}

function verifyUsername(input) {
  const writtenUsername = input.value.trim();
  const errorUsernameMessage = document.getElementById('error-username');

  if (writtenUsername.length > 3) {
    return showSuccess(usernameInput, errorUsernameMessage);
  } else {
    return showError(usernameInput, errorUsernameMessage);
  }
}

function verifyEmail(input) {
  const writtenEmail = input.value.trim();
  const errorEmailMessage = document.getElementById('error-email');
  const regularExpression =
    /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,3}/;
  const testedEmail = regularExpression.test(writtenEmail);

  if (testedEmail) {
    return showSuccess(emailInput, errorEmailMessage);
  } else {
    return showError(emailInput, errorEmailMessage);
  }
}

function verifyPassword(input) {
  const writtenPassword = input.value.trim();
  const errorPsswordMessage = document.getElementById('error-password');
  const regularExpression =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;
  const testedPassword = regularExpression.test(writtenPassword);

  if (testedPassword) {
    return showSuccess(passwordInput, errorPsswordMessage);
  } else {
    return showError(passwordInput, errorPsswordMessage);
  }
}

function comparePassword(input) {
  const writtenPasswordToCompare = input.value.trim();
  const confirmPasswordErrorMessage = document.getElementById(
    'error-confirm-password'
  );
  const password = document.getElementById('password').value;

  if (writtenPasswordToCompare === password) {
    return showSuccess(confirmPasswordInput, confirmPasswordErrorMessage);
  } else {
    return showError(confirmPasswordInput, confirmPasswordErrorMessage);
  }
}

function showError(input, errorMessage) {
  return (
    (input.style.border = '2px solid #D60000'),
    (errorMessage.style.display = 'block'),
    false
  );
}

function showSuccess(input, errorMessage) {
  return (
    (input.style.border = '2px solid #3EF700'),
    (errorMessage.style.display = 'none'),
    true
  );
}

function togglePassword(inputID, imgID) {
  const inputId = document.getElementById(inputID);
  const imgId = document.getElementById(imgID);

  inputId.type === 'password'
    ? ((inputId.type = 'text'), (imgId.src = 'img/hide.png'))
    : ((inputId.type = 'password'), (imgId.src = 'img/show.png'));
}

function submitForm(event) {
  event.preventDefault();
  if (
    checkIfIsEmpty(usernameInput) &&
    checkIfIsEmpty(emailInput) &&
    checkIfIsEmpty(passwordInput) &&
    checkIfIsEmpty(confirmPasswordInput)
  ) {
    if (
      verifyUsername(username) &&
      verifyEmail(emailInput) &&
      verifyPassword(passwordInput) &&
      comparePassword(confirmPasswordInput)
    ) {
      form.reset();
      formCompleted('ok');
    } else {
      formCompleted('no');
    }
  }
}

function formCompleted(condition) {
  const itsOk = document.getElementById('sent-ok');
  const itsWrong = document.getElementById('sent-no');
  const openMouth = document.getElementById('open-mouth');

  openEyes();

  if (condition === 'ok') {
    // close mouth
    openMouth.style.display = 'none';
    mouth.style.display = 'block';
    // finger says ok for 4 seconds
    itsWrong.style.display = 'none';
    itsOk.style.display = 'block';
    setTimeout(() => {
      itsOk.style.display = 'none';
    }, 5000);
  }
  if (condition === 'no') {
    // finger says no
    itsOk.style.display = 'none';
    mouth.style.display = 'none';
    // open mouth
    openMouth.style.display = 'block';
    itsWrong.style.display = 'block';
  }
}
