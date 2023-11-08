import React, { useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { signIn } from '../authSlice';
import "./signup.scss";
const url = "https://railway.bookreview.techtrain.dev";

export function SignUp() {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [name, setName] = useState("");
  const [, setCookie] = useCookies();
  const [postComplete, setPostComplete] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault(); // ページがリロードされないようフォームのデフォルトの動作を防止
    const reqData = { name, email, password };

    axios
      .post(`${url}/users`, reqData)
      .then((response) => {
        // POST リクエストの結果を取得
        const token = response.data;
        dispatch(signIn());
        setCookie('token', token);
        console.log(token);
        setPostComplete(true);
        // サインアップ成功後の処理を呼び出す
        navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          // ステータスコード409の場合、ユーザーがすでに登録されているとみなす
          setError("すでに登録済みです。");
        }else{
          console.error("APIリクエストエラー", error);
        }
      });
      if (auth) {
        navigate('/');
        return null; // または適切なコンポーネントを返す
      }
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
      <main className='signup'>
      <h1 className='title'>サインアップ</h1>
      <form id="login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">ユーザー名:</label>
          <input
          className='name-input'
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
          className='email-input'
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
          className='password-input'
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button className="signup-button" onClick={handleSignIn}>サインアップ</button>
        {error && <div className="error-message">{error}</div>}
      </form>
      {postComplete && <div id="result">{}</div>}
      </main>
    </div>
  );
}

export default SignUp;
