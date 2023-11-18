import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./editprof.scss";
import { Header } from "../components/Header";
import { url } from "../env";

export function Editprof() {
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [cookies,setCookie] = useCookies();


  // ページ読み込みでの一覧取得
  useEffect(() => {
      axios
        .get(`${url}/users`, {
          headers: {
            authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((res) => {
          const user_info=res.data;
          console.log("ユーザー情報を表示します", user_info);
          setName(user_info.name);
        })
        .catch((err) => {
          setErrorMessage(`ユーザー情報の取得に失敗しました。${err}`);
        });
      }, [cookies.token]);
      
      const handleSubmit = (event) => {
        event.preventDefault();
        
        axios
        .put(`${url}/users`,{
          headers: {
            authorization: `Bearer ${cookies.token}`,
          },
          name
        } )
        .then((response) => {
          // PUT リクエストの結果を取得
          setCookie("token", response.data.token);
          console.log("更新が完了しました。",response.data);
      })
      .catch((error) => {
        setErrorMessage(`更新に失敗しました。${error}`);
        // console.error("APIリクエストエラー", error);
      });
  };
    return (
      <div className="edit">
        <Header />
        <div>
            <form id="edit-profile" >
            <label htmlFor="name">ユーザー名:</label>
            <input
              className="name-input"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              required
            />
          <button className="edit-button" onClick={handleSubmit}>
            更新
          </button>
          </form>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          </div>
      </div>
    );
  }