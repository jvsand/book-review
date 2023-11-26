import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import { baseUrl } from "../env";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./showreview.scss";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

export function ShowReview() {
  const [cookies] = useCookies();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [url, setUrl] = useState("");
  const [isMine, setIsMine] = useState("");
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
        setIsMine(book.isMine);
        setIsLoading(false); // データ取得が完了したらローディングを終了
      })
      .catch((err) => {
        setErrorMessage(`リストの取得に失敗しました。${err}`);
      });
  }, [cookies.token]);

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
        <div>
          <div>
            {isMine ? (
              <Link to={`/edit/${id}`} className="book-item-link">
                編集へ
              </Link>
            ) : (
              <></>
            )}
          </div>
          <div>
            <label className="book-item__title">タイトル:{title}</label>
          </div>

          <div>
            <label className="book-item__detail">詳細:</label>
            {detail}
          </div>
          <div>
            <label className="book-item__review">レビュー: ★{review}</label>
          </div>
          <div>
            <label>URL:{url}</label>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowReview;
