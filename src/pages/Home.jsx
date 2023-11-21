import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./home.scss";
import { Header } from "../components/Header";
import Pagination from "../components/Pagination";
import SignOut from "./SignOut";
import { url } from "../env";

export function Home() {
  const [, setErrorMessage] = useState("");
  const [books, setBooks] = useState([]);
  const [cookies] = useCookies();

  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 10; // 1ページあたりのアイテム数
  const showPages = 60; // 全てのアイテム数

  // ページ読み込みでの一覧取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = cookies.token;
        const res = await axios.get(
          config ? `${url}/books` : `${url}/public/books`,
          {
            headers: {
              authorization: config ? `Bearer ${config}` : undefined,
            },
            params: {
              offset: currentPage * booksPerPage,
              limit: showPages,
            },
          },
        );
        console.log("一覧を表示します", config);
        setBooks(res.data);
      } catch (err) {
        setErrorMessage(`タスクの取得に失敗しました。${err}`);
      }
    };
    fetchData();
  }, [cookies.token, currentPage, booksPerPage]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  // 件数の表示
  const calculateRange = () => {
    // currentPage:1の時
    const start = currentPage * booksPerPage + 1; //1*10+1=11
    const end = Math.min((currentPage + 1) * booksPerPage); //(1+1)*10=20
    return `${start} - ${end} 件`; //11−20件
  };

  return (
    <div className="home">
      <Header />
      <div className="home__book-list"></div>
      {/* ここに書籍一覧を表示するロジックを追加 */}
      <ul className="book-list__items">
        {books.map((book) => (
          <li className="book-item" key={book.id}>
            {book.title}
            <span className="book-item__title">title:{book.title}</span>
            <p className="book-item__review">review: {book.review}</p>
            <p className="book-item__detail">detail: {book.detail}</p>
            <p className="book-item__url">url: {book.url}</p>
          </li>
        ))}
      </ul>

      {/* react-paginate コンポーネントの設置 */}
      <Pagination
        pageCount={Math.ceil(showPages / booksPerPage)}
        handlePageClick={handlePageClick}
      />
      <div className="page-range">
        <p>{`ページ ${currentPage + 1} : ${calculateRange()}`}</p>
      </div>
      <SignOut />
    </div>
  );
}
