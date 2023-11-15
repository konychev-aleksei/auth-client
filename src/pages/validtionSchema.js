export const userCredentialsSchema = Yup.object({
  body: Yup.object({
    userName: Yup.string()
      .required("Поле обязательно!")
      .typeError("Значение должно быть строкой!"),
    password: Yup.string()
      .required("Поле обязательно!")
      .min(8, "Пароль слишком короткий - минимум 8 символов"),
  }),
});
