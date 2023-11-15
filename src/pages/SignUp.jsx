import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import style from "./style.module.scss";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { yupResolver } from "@hookform/resolvers";
import { userCredentialsSchema } from "./validtionSchema";

export default function SignUp() {
  const { handleSignUp } = useContext(AuthContext);

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
      onSubmit={handleSubmit((data) => handleSignUp(data))}
      className={style.wrapper}
    >
      <h2>Создать аккаунт</h2>
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
        Зарегистрироваться
      </Button>
    </form>
  );
}
