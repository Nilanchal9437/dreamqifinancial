import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email!")
    .required("Please enter a email!"),
  password: yup.string().trim().required("Please enter a password!"),
});

export default schema