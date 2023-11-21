import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./editprof.scss";
import { Header } from "../components/Header";
import { url } from "../env";

export function Editprof() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [name, setName] = useState("");
  const [cookies] = useCookies();

  const fetchUserInfo = async () => {
    try {
      const res = await axios.get(`${url}/users`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      });

      const user_info = res.data;
      console.log("ユーザー情報を表示します", user_info);
      setName(user_info.name);
    } catch (err) {
      setErrorMessage(`ユーザー情報の取得に失敗しました。${err}`);
    }
  };

  // tokenが変更した時ページ読み込みでの一覧取得
  useEffect(() => {
    fetchUserInfo();
  }, [cookies.token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(
        `${url}/users`,
        { name },
        {
          headers: {
            authorization: `Bearer ${cookies.token}`,
          },
        },
      );

      // PUT リクエストの結果を取得
      console.log(`更新が完了しました`);
      setSuccessMessage(`ユーザー名を"${name}"に更新できました`);
    } catch (error) {
      setErrorMessage(`更新に失敗しました。${error}`);
    }
  };

  return (
    <div className="edit">
      <Header />
      <div>
        <form id="edit-profile">
          <label htmlFor="name">ユーザー名:</label>
          <input
            className="name-input"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div>
            <button className="edit-button" onClick={handleSubmit}>
              更新
            </button>
          </div>
        </form>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
}
