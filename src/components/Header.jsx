import React from "react";
import "./header.scss";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const { pathname } = useLocation();
  return (
    <header className="header">
      <h1 className="home__title">
        書籍一覧
        {pathname === "/profile" ? (
          <Link to="/">Homeへ</Link>
        ) : (
          <Link to="/profile">ユーザー情報を編集</Link>
        )}
      </h1>
    </header>
  );
}

export default Header;
