const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const number = document.getElementById('number');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');

//Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}
// check email is valid

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //return re.test(String(email).toLowerCase());
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// check input `getlength
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if (input.value.length > max)
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
  else {
    showSuccess(input);
  }
}

// Check passwords
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match")
  }
}
// check number

function checkNumber(input) {
  if (input.value.length < 9) {
    showError(input, input.value.length + " is less than 9");
  } else if (input.value.length > 9) {
    showError(input, input.value.length + " is greater than 9");
  }
  else {
    showSuccess(input);
  }
}

function checkisNumber(input) {

  if (!isNaN(input.value)) {
    showSuccess(input);
  } else {
    showError(input, input.value + " is not a number");
  }

}
//Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
//Event listeners
form.addEventListener('submit', function (e) {
  e.preventDefault();

  /*
  if (username.value === '') {
    showError(username, 'Username is required');

  } else {
    showSuccess(username);
  }

  if (password.value === '') {
    showError(password, 'Password is required');

  } else {
    showSuccess(password);
  }

  if (email.value === '') {
    showError(email, 'email is required');


  } else if (!isValidEmail(email.value)) {
    showError(email, 'email is not valid');
  } else {
    showSuccess(email);
  }

  if (password2.value === '') {
    showError(password2, 'Confirm Password is required');

  } else {
    showSuccess(password2);
  }

*/

  checkRequired([firstname, lastname, number, username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
  checkNumber(number);
  checkisNumber(number);
});