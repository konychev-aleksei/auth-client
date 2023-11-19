import { useContext } from "react";
import { Button } from "@mui/material";
import style from "./style.module.scss";
import { AuthContext } from "../context/AuthContext";

export default function Demo() {
  const { data, handleLogOut, handleFetchProtected } = useContext(AuthContext);

  return (
    <div className={style.wrapper}>
      <p>{JSON.stringify(data)}</p>
      <Button onClick={handleFetchProtected} className={style.button}>
        Запрос на защищенный роут
      </Button>
      <Button onClick={handleLogOut} className={style.button}>
        Выйти
      </Button>
    </div>
  );
}
