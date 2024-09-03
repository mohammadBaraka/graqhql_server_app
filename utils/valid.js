export const validRegisterInputs = (name, email, password) => {
  const errors = {};

  if (name.trim() === "") {
    errors.name = "name must not be embty";
  }

  if (email.trim() === "") {
    errors.email = "email must not be embty";
  }

  if (password.trim() === "") {
    errors.password = "password must not be embty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
