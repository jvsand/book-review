import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const url = "https://railway.bookreview.techtrain.dev";

export function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [postComplete, setPostComplete] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // ページがリロードされないようフォームのデフォルトの動作を防止

    const reqData = { name, email, password };

    axios
      .post(`${url}/users`, reqData)
      .then((response) => {
        // POST リクエストの結果を取得
        const data = response.data;
        console.log(data);
        setPostComplete(true);

        // サインアップ成功後の処理を呼び出す
        handleSignUpSuccess();
      })
      .catch((error) => {
        console.error("APIリクエストエラー", error);
      });
  };

  // サインアップ成功後の処理
  const handleSignUpSuccess = () => {
    // リダイレクト
    navigate("/");
  };

  const handleUsernameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    handleSubmit(event);
  };

  return (
    <div>
      <h1>サインアップ</h1>
      <form id="login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">ユーザー名:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">メールアドレス:</label>
          <input
            type="email"
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
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button onClick={handleSignIn}>サインアップ</button>
      </form>
      {postComplete && <div id="result">{}</div>}
    </div>
  );
}

export default SignUp;
