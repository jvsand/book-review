import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./editprof.scss";
import { Header } from "../components/Header";
import { url } from "../env";
// import resizeImage from "../components/ResizeImage";

export function Editprof() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage,setSuccessMessage ] = useState("");
  const [name, setName] = useState("");
  const [currentIcon, setCurrentIcon] = useState("");
  const [cookies] = useCookies();
  const [previewImage, setPreviewImage] = useState(null);
  const [, setEditIcon] = useState("");
  // const [, setCookie] = useCookies();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        await axios.put(
      // const response = await axios.put(
        `${url}/users`,
        { name },
        {
          headers: {
            authorization: `Bearer ${cookies.token}`,
          },
        },
      );
      // const token = response.data.token;
      // setCookie("token", token);

      // const resizedImage = await resizeImage(editIcon, 300, 300);
      // const formData = new FormData();
      // formData.append("icon", resizedImage, resizedImage.name);

      // const iconResponse = await axios.post(`${url}/uploads`, formData, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      // if (iconResponse.status === 200) {
      //   // navigate("/");
      //   console.log("画像登録完了", iconResponse);
      // } else {
      //   console.error("Upload failed");
      //   // setError("アップロードに失敗しました。");
      // }
      // setPostComplete(true);
      setSuccessMessage(`ユーザー名の更新ができました`);
    } catch (err) {
        console.error("APIリクエストエラー", err);
      }
    };

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
      setCurrentIcon(user_info.iconUrl);
    } catch (err) {
      setErrorMessage(`ユーザー情報の取得に失敗しました。${err}`);
    }
  };

  // tokenが変更した時ページ読み込みでの一覧取得
  useEffect(() => {
    fetchUserInfo();
  }, [cookies.token]);

  const handlePhotoChange = (event) => {
    const selectedPhoto = event.target.files[0];

    if (selectedPhoto) {
      setEditIcon(selectedPhoto);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedPhoto);
    }
  };

  return (
    <div className="edit">
      <Header />
      <div>
        <form id="edit-profile">
          <label htmlFor="name">ユーザー名:</label>
          <input
            className="name-input1"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div>
            <label htmlFor="photo">登録済みアイコン:</label>
            <div>
              <img
                src={currentIcon}
                alt="登録済みアイコン"
                className="uploaded-image"
              />
            </div>
            <label htmlFor="photo">
              変更後アイコン:
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                required
              />
            </label>
            <div></div>
            {previewImage && (
              <img
                src={previewImage}
                alt="アップロードされたアイコン"
                className="uploaded-image"
              />
            )}
          </div>
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
