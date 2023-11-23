import { useContext } from "react";
import { Button } from "@mui/material";
import style from "./style.module.scss";
import { AuthContext } from "../context/AuthContext";

export default function Demo() {
  const { data, handleLogOut, handleFetchProtected } = useContext(AuthContext);

  return (
    <div className={style.wrapper}>
      <p>{JSON.stringify(data)}</p>
      <button onClick={handleFetchProtected}>
        Запрос на защищенный роут
      </button>
      <button onClick={handleLogOut}>
        Выйти
      </button>
    </div>
  );
}
