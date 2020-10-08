const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirm = document.getElementById("confirm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, confirm);
});

//提示错误信息
function showError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
}

//提示成功状态
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

//检验邮箱是否有效
function checkEmail(input) {
  const regex = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  if (regex.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "Email is invalid");
  }
}

//生成大写开头的错误信息
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//检验长度
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

//检验密码是否匹配
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Password do not match");
  } else {
    showSuccess(input2);
  }
}
