import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import style from "./style.module.scss";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { userCredentialsSchema } from "./validtionSchema";

const defaultValues = {
  userName: "",
  password: "",
};

export default function SignIn() {
  const { handleSignIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(userCredentialsSchema),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => handleSignIn(data))}
      className={style.wrapper}
    >
      <h2>Войти в аккаунт</h2>
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
      <button disabled={isSubmitting} className={style.button} type="submit">
        Войти
      </button>
    </form>
  );
}
