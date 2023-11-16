import * as Yup from "yup";

export const userCredentialsSchema = Yup.object({
  userName: Yup.string()
    .required("Поле обязательно!")
    .typeError("Значение должно быть строкой!"),
  password: Yup.string()
    .required("Поле обязательно!")
    .min(3, "Пароль слишком короткий - минимум 3 символа"),
});
