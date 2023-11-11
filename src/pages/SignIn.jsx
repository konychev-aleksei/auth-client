import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import style from "./style.module.scss";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { yupResolver } from "@hookform/resolvers";
import { userCredentialsSchema } from "../utils/validtionSchemas";

export default function SignIn() {
  const { handleSignIn } = useContext(AuthContext);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      userName: "",
      password: "",
    },
    resolver: yupResolver(userCredentialsSchema),
    formState: { errors },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => handleSignIn(data))}
      className={style.wrapper}
    >
      <h2>Войти в аккаунт</h2>
      <TextField
        {...register("userName")}
        label="Логин"
        variant="standard"
        error={Boolean(errors.userName)}
        helperText={errors.userName?.message}
      />
      <TextField
        {...register("password")}
        label="Пароль"
        variant="standard"
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
      />
      <Button className={style.button} type="submit">
        Войти
      </Button>
    </form>
  );
}
