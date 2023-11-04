import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const url = "https://railway.bookreview.techtrain.dev";

export function SignIn() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [postComplete, setPostComplete] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const reqData = { email, password };
    axios
      .post(`${url}/sigin`, reqData)
      .then((response) => {
        // POST リクエストの結果を取得
        const data = response.data;
        console.log(data);
        
        // サインイン成功時の処理
        if (data.token) {
          // ユーザーセッションを管理する方法に応じて、認証トークンを保存する
          // 例: ローカルストレージに保存
          localStorage.setItem("authToken", data.token);

          // リダイレクト
          navigate("/");
        } else {
          console.error("サインインに失敗しました");
        }
        setPostComplete(true);
      })
      .catch((error) => {
        console.error("APIリクエストエラー", error);
      });
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
      <h1>サインイン</h1>
      <form id="login-form" onSubmit={handleSubmit}>
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
        <button onClick={handleSignIn}>サインイン</button>
      </form>
      {postComplete && <div id="result">{}</div>}
    </div>
  );
}

export default SignIn;
