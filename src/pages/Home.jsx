import React, { useState, useEffect } from "react";
import axios from "axios";
import SignOut from "./SignOut";
import { useCookies } from "react-cookie";
import "./home.scss";
import Pagination from './Pagination';
const url = "https://railway.bookreview.techtrain.dev";

export function Home() {
  const [, setErrorMessage] = useState("");
  const [books, setBooks] = useState([]);
  const [cookies] = useCookies();

  const [currentPage, setCurrentPage] = useState(0); 
  const booksPerPage = 3; // 1ページあたりのアイテム数

  // ページ読み込みでの一覧取得
  useEffect(() => {
    axios
      .get(`${url}/books`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        console.log("一覧を表示します", cookies.token);
        setBooks(res.data);
      })
      .catch((err) => {
        setErrorMessage(`タスクの取得に失敗しました。${err}`);
      });
  }, [cookies.token]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };
  const offset = currentPage * booksPerPage;
  const currentPageBooks = books.slice(offset, offset + booksPerPage);


  return (
    <div className="home">
      <h1 className="home__title">書籍一覧</h1>
      <div className="home__book-list">
      {/* ここに書籍一覧を表示するロジックを追加 */}
      <ul className="book-list__items">
        {currentPageBooks.map((book) => (
          <li className="book-item" key={book.id}>{book.title}
          <span className="book-item__title">title:{book.title}</span>
              <p className="book-item__review">review: {book.review}</p>
              <p className="book-item__detail">detail: {book.detail}</p>
              <p className="book-item__url">url: {book.url}</p>
          </li>
        ))}
      </ul>

      {/* react-paginate コンポーネントの設置 */}
      <Pagination
          pageCount={Math.ceil(books.length / booksPerPage)}
          handlePageClick={handlePageClick}
        />
    </div>
      <SignOut />
    </div>
  );
}
