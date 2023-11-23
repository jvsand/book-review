import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { baseUrl } from "../env";

export function NewReview() {
  const auth = useSelector((state) => state.auth.isSignIn);
  const [successMessage, setSuccessMessage] = useState("");
  const { pathname } = useLocation();
  const [cookies] = useCookies();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("5");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // ページがリロードされないようフォームのデフォルトの動作を防止
    
    switch (true) {
      case !title :
        setErrorMessage("タイトルに空欄があります。");
        return;
        case!detail:
          setErrorMessage("詳細欄に空欄があります。");
          return;
      case !review:
        setErrorMessage("レビューに空欄があります。");
        return;
      case !url:
        setErrorMessage("URLに空欄があります。");
        return;
      default:
        setErrorMessage("");
        break;
    }
    const reqData = { title, url, detail, review };
    try {
      await axios.post(`${baseUrl}/books`, reqData, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          "Content-Type": "application/json",
        },
      });
      setSuccessMessage(`レビュー登録ができました`);
    } catch (err) {
      setErrorMessage("APIリクエストエラー");
      console.error("APIリクエストエラー", err);
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };
  const handleDetailChange = (event) => {
    setDetail(event.target.value);
  };
  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  return (
    <header className="header">
      <div className="goto-home">
        {auth ? (
          pathname === "/newreview" ? (
            <Link to="/">一覧画面へ</Link>
          ) : (
            <Link to="/newreview">レビュー登録へ</Link>
          )
        ) : (
          <></>
        )}
      </div>
      {pathname === "/newreview" && (
        <>
          <h1 className="title">レビュー詳細</h1>
          <form id="login-form">
            <div>
              <label htmlFor="title">タイトル:</label>
              <input
                className="title-input"
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={handleTitleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="url">URL:</label>
              <input
                className="url-input"
                type="url"
                id="url"
                name="url"
                value={url}
                onChange={handleUrlChange}
              />
            </div>
            <div>
              <label htmlFor="detail">詳細:</label>
              <input
                className="detail-input"
                type="text"
                id="detail"
                name="detail"
                value={detail}
                onChange={handleDetailChange}
              />
            </div>
            <div>
              <label htmlFor="review">星:</label>
              <select
                className="review-input"
                id="review"
                onChange={handleReviewChange}
              >
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </select>
            </div>
            <button className="register-button" onClick={handleSubmit}>
              レビュー登録
            </button>
          </form>
        </>
      )}
              {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </header>
  );
}

export default NewReview;
