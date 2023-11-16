import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../authSlice";
import "./signin.scss";
const url = "https://railway.bookreview.techtrain.dev";

export function SignIn() {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [error, setError] = useState("");
  const [, setCookie] = useCookies();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError("空欄があります。");
      return; // エラーメッセージを表示して処理を中断
    }

    axios
      .post(`${url}/signin`, { email, password })
      .then((response) => {
        // POST リクエストの結果を取得
        setCookie("token", response.data.token);
        console.log(response.data);
        dispatch(signIn());
        navigate("/");
        // setPostComplete(true);
      })
      .catch((error) => {
        setErrorMessage(`サインインに失敗しました。${error}`);
        // console.error("APIリクエストエラー", error);
      });
  };
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div>
      <main className="signin">
        <h1 className="title">サインイン</h1>
        {error && <div className="error-message">{error}</div>}
        <p className="error-message">{errorMessage}</p>
        <form id="login-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">メールアドレス:</label>
            <input
              type="email"
              className="email-input"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">パスワード:</label>
            <input
              type="password"
              id="password"
              className="password-input"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button className="signin-button" onClick={handleSubmit}>
            サインイン
          </button>
        </form>
        {/* {postComplete && <div id="result">{}</div>} */}
      </main>
    </div>
  );
}

export default SignIn;
