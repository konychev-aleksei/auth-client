import { Link, Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Demo from "./pages/Demo";
import style from "./app.module.scss";

const App = () => (
  <div className={style.wrapper}>
    <BrowserRouter>
      <nav className={style.nav}>
        <Link to="sign-in">Вход</Link>
        <Link to="sign-up">Регистрация</Link>
        <Link to="demo">Демо</Link>
      </nav>
      <Routes>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="demo" element={<Demo />} />
        <Route path="*" element={<Navigate to="demo" />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
