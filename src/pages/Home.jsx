// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useCookies } from 'react-cookie';
// import { url } from '../const';
// import Header from '../components/Header';
import SignOut from "./SignOut";
import "./home.scss";

export function Home() {
  return (
    <div>
      <header className="header">書籍レビュー</header>
      <h1>書籍一覧</h1>
      <SignOut />
    </div>
  );
}
