import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux/es/exports";
import { baseUrl } from "../env";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./editreview.scss";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

export function EditReview() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies] = useCookies();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [url, setUrl] = useState("");
  const [review, setReview] = useState("5");

  useEffect(() => {
    axios
      .get(`${baseUrl}/books/${id}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        const book = res.data;
        setTitle(book.title);
        setDetail(book.detail);
        setReview(book.review);
        setUrl(book.url);
        setIsLoading(false); // データ取得が完了したらローディングを終了
      })
      .catch((err) => {
        setErrorMessage(`リストの取得に失敗しました。${err}`);
      });
  }, [cookies.token]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDetailChange = (event) => {
    setDetail(event.target.value);
  };
  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // ページがリロードされないようフォームのデフォルトの動作を防止

    const reqData = { title, url, detail, review };
    try {
      await axios.put(`${baseUrl}/books/${id}`, reqData, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
          "Content-Type": "application/json",
        },
      });
      setSuccessMessage(`レビュー登録ができました`);
      navigate("/");
    } catch (err) {
      setErrorMessage("APIリクエストエラー");
      console.error("APIリクエストエラー", err);
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault(); // ページがリロードされないようフォームのデフォルトの動作を防止

    try {
      await axios.delete(`${baseUrl}/books/${id}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
          "Content-Type": "application/json",
        },
      });
      navigate("/");
    } catch (err) {
      setErrorMessage("APIリクエストエラー");
      console.error("APIリクエストエラー", err);
    }
  };

  return (
    <div className="home">
      <Header />
      {isLoading ? (
        //ローディング画面
        <ClipLoader
          color="#36D7B7"
          css={css`
            @import "./viewreview.scss";
          `}
          size={100}
          loading={isLoading}
        />
      ) : (
        <>
          <h1>レビュー詳細</h1>
          <form>
            <label>タイトル</label>
            <p>
              <textarea
                type="text"
                onChange={handleTitleChange}
                className="book-title"
                value={title}
              />
            </p>
            <label>詳細</label>
            <p>
              <textarea
                type="text"
                onChange={handleDetailChange}
                className="book-detail"
                value={detail}
              />
            </p>
            <label>レビュー</label>
            <p>
              <select
                className="book-review"
                id="review"
                value={review}
                onChange={handleReviewChange}
              >
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </select>
            </p>
            <label>URL</label>
            <p>
              <textarea
                type="text"
                onChange={handleUrlChange}
                className="book-url"
                value={url}
              />
            </p>
            <button className="register-button" onClick={handleSubmit}>
              レビュー更新
            </button>
          </form>
          <button className="register-button" onClick={handleDelete}>
            レビュー削除
          </button>
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </>
      )}
    </div>
  );
}

export default EditReview;
