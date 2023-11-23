import { useForm, Controller } from "react-hook-form";
import style from "./style.module.scss";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { userCredentialsSchema } from "./validtionSchema";

const defaultValues = {
  userName: "",
  password: "",
  role: 1,
};

const rolesList = [
  {
    id: 1,
    title: "Администратор",
  },
  {
    id: 2,
    title: "Модератор",
  },
  {
    id: 3,
    title: "Пользователь",
  },
];

export default function SignUp() {
  const { handleSignUp } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(userCredentialsSchema),
  });

  return (
    <form
      className={style.wrapper}
      onSubmit={handleSubmit((data) => handleSignUp(data))}
    >
      <h2>Создать аккаунт</h2>
      <div className={style.inputField}>
        <input
          {...register("userName")}
          placeholder="Имя пользователя"
          autocomplete="off"
        />
        {Boolean(errors.userName) && (
          <p className={style.error}>{errors.userName?.message}</p>
        )}
      </div>
      <div className={style.inputField}>
        <input
          {...register("password")}
          autocomplete="off"
          placeholder="Пароль"
        />
        {Boolean(errors.password) && (
          <p className={style.error}>{errors.password?.message}</p>
        )}
      </div>
      <Controller
        control={control}
        name="role"
        render={({ field: { onChange, value } }) => (
          <select value={value} className={style.selectField} onChange={onChange}>
            {rolesList.map(({ id, title }) => (
              <option key={id} value={id}>
                {title}
              </option>
            ))}
          </select>
        )}
      />
      <button disabled={isSubmitting} className={style.button} type="submit">
        Зарегистрироваться
      </button>
    </form>
  );
}
