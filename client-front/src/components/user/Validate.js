const nameRegex = /^[A-Za-z\s]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/;
const passwordRegex =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_\-!?])(?=\S+$).*$/;

const Validate = (fullName, email, password, setFormErrors) => {
  let errors = {};
  if (!fullName) {
    errors.fullName = "Full name is required";
  } else if (!nameRegex.test(fullName)) {
    errors.fullName = "Please enter a valid name";
  }

  if (!email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (!passwordRegex.test(password) || password.length < 8) {
    errors.password =
      "Password must contain at least 8 characters with at least one letter, one digit, and one special character";
  }

  setFormErrors(errors);
  return Object.keys(errors).length === 0;
};

export default Validate;
