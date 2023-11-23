import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./header.scss";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { baseUrl } from "../env";

export function Header() {
  const auth = useSelector((state) => state.auth.isSignIn);
  const { pathname } = useLocation();
  const [cookies] = useCookies();
  const [name, setName] = useState([]);
  const [, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${baseUrl}/users`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        const user_info = res.data;
        console.log("ユーザー情報を表示します", user_info);
        setName(user_info.name);
      })
      .catch((err) => {
        setErrorMessage(`ユーザー情報の取得に失敗しました。${err}`);
      });
  }, [cookies.token]);

  return (
    <header className="header">
      <h1 className="home__title">
        書籍一覧
        <div className="goto-home">
          <div className="conform-name">
            {auth ? (
              pathname === "/profile" ? (
                <></>
              ) : (
                <label htmlFor="name">
                  ユーザー名:
                  <span className="name-text">{name}</span>
                </label>
              )
            ) : (
              <></>
            )}
          </div>
          {auth ? (
            pathname === "/profile" ? (
              <Link to="/">一覧画面へ</Link>
            ) : (
              <Link to="/profile">ユーザー情報を編集</Link>
            )
          ) : (
            <Link to="/signin">サインインへ</Link>
          )}
        </div>
      </h1>
    </header>
  );
}

export default Header;
