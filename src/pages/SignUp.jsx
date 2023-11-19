import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Select, MenuItem } from "@mui/material";
import style from "./style.module.scss";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { userCredentialsSchema } from "./validtionSchema";

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
    defaultValues: {
      userName: "",
      password: "",
      role: 1,
    },
    resolver: yupResolver(userCredentialsSchema),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => handleSignUp(data))}
      className={style.wrapper}
    >
      <h2>Создать аккаунт</h2>
      <TextField
        {...register("userName")}
        label="Имя пользователя"
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
      <Controller
        control={control}
        name="role"
        render={({ field: { onChange, value } }) => (
          <Select
            value={value}
            onChange={onChange}
            options={rolesList}
            variant="standard"
          >
            {rolesList.map(({ id, title }) => (
              <MenuItem key={id} value={id}>
                {title}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <Button disabled={isSubmitting} className={style.button} type="submit">
        Зарегистрироваться
      </Button>
    </form>
  );
}
