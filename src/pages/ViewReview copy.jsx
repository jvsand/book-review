import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Header } from "../components/Header";
// import { Link, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux/es/exports";
import { baseUrl } from "../env";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./viewreview.scss";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

export function ViewReview() {
  // const auth = useSelector((state) => state.auth.isSignIn);
  // const [successMessage, setSuccessMessage] = useState("");
  // const { pathname } = useLocation();
  const [cookies] = useCookies();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [url, setUrl] = useState("");
  const [review, setReview] = useState("5");
  const [, setErrorMessage] = useState("");

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

  // const handleSubmit = async (event) => {
  //   event.preventDefault(); // ページがリロードされないようフォームのデフォルトの動作を防止

  // const reqData = { title, url, detail, review };
  // try {
  //   await axios.post(`${baseUrl}/books`, reqData, {
  //     headers: {
  //       authorization: `Bearer ${cookies.token}`,
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   setSuccessMessage(`レビュー登録ができました`);
  // } catch (err) {
  //   setErrorMessage("APIリクエストエラー");
  //   console.error("APIリクエストエラー", err);
  // }
  // };

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
          size={150}
          loading={isLoading}
        />
      ) : (
        <>
          <label>タイトル</label>
          <p>{title}</p>
          <label>詳細</label>
          <p>{detail}</p>
          <label>レビュー</label>
          <p>{review}</p>
          <label>URL</label>
          <p>{url}</p>
        </>
      )}
      {/* <text
            type="text"
            // onChange={handleDetailChange}
            className="book-title"
            value={title}
          /> */}

      {/* <textarea
            type="text"
            // onChange={handleDetailChange}
            className="book-detail"
            value={detail}
          /> */}
    </div>
  );
}

export default ViewReview;
