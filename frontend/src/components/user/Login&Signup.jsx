import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,useLocation,useNavigate } from "react-router-dom";
import "./LoginAndSignup.css";
import { login, register } from "../../Redux/user/user.action";
import Loading from "../Loading skeleton/Loading";
import { useEffect } from "react";


function LoginAndSignup() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { error, loading, isAuth } = useSelector((state) => state.user);
  console.log(error);

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
    navigate("/");
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/private";

  useEffect(()=>{
    const token = localStorage.getItem("token");
    // console.log(token);
    if(isAuth && token) {
      navigate(redirect);
    }
  },[dispatch,error,navigate,isAuth,redirect])


  const swichTab = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "signup") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => swichTab(e, "login")}>LOGIN</p>
                  <p onClick={(e) => swichTab(e, "signup")}>SIGN UP</p>
                </div>
                <button ref={switcherTab}></button>
              </div>

              <form onSubmit={loginSubmit} className="loginForm" ref={loginTab}>
                <div className="loginEmail">
                  <input
                    type={"email"}
                    placeholder="Email"
                    onChange={(e) => setLoginEmail(e.target.value)}
                    value={loginEmail}
                    required
                  />
                </div>
                <div className="loginPassword">
                  <input
                    type={"password"}
                    placeholder="Password"
                    onChange={(e) => setLoginPassword(e.target.value)}
                    value={loginPassword}
                    required
                  />
                </div>
                <Link to={"/password/forgot"}>Forget Password ?</Link>
                <input type={"submit"} value={"Submit"} className="loginBtn" />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  {/* <FaceOutlined /> */}
                  <input
                    type={"text"}
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  {/* <MailOutline /> */}
                  <input
                    type={"email"}
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  {/* <LockOpenIcon /> */}
                  <input
                    type={"password"}
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type={"file"}
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type={"submit"} value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default LoginAndSignup;
