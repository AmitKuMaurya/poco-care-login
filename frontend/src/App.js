import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import LoginAndSignup from "./components/user/Login&Signup";
import UserOptions from "./components/utility/userOptions";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/PrivateRoute/ProtectedRoute";
import UserForgotPassword from "./components/user/UserForgotPassword";
import UserResetPassword from "./components/user/UserResetPassword";
import NotFound from "./components/Loading skeleton/NotFound";
import UpdateUserPassword from "./components/user/UpdateUserPassword";
import PrivatePage from "./components/user/PrivatePage";
function App() {
  const { isAuth, user } = useSelector((state) => state.user);
  return (
    <>
      <Header />

      {isAuth ? <UserOptions user={user} /> : null}

      <Routes>
        <Route path="/" element={<Main />} />

        <Route path="/login" element={<LoginAndSignup />} />

        <Route path="/password/forgot" element={<UserForgotPassword />} />

        <Route path="/password/reset/:token" element={<UserResetPassword />} />

        <Route path={"*"} element={<NotFound />} />

        <Route
          path={"/private"}
          element={
            <ProtectedRoute>
              <PrivatePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdateUserPassword />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
