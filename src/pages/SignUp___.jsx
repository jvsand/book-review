import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "../authSlice";
import "./signup.scss";
import Compressor from "image-compressor.js";

const url = "https://railway.bookreview.techtrain.dev";

const SignUp = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, setCookie] = useCookies();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [photo, setPhoto] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [postComplete, setPostComplete] = useState(false);

  useEffect(() => {
    const handleSignUp = async () => {
      try {
        const response = await axios.post(`${url}/users`, {
          name,
          email,
          password,
        });
        const token = response.data.token;

        dispatch(signIn());
        setCookie("token", token);

        const resizedImage = await resizeImage(photo, 300, 300);
        const formData = new FormData();
        formData.append("icon", resizedImage, resizedImage.name);

        const iconResponse = await axios.post(`${url}/uploads`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (iconResponse.status === 200) {
          navigate("/");
          console.log("画像登録完了", iconResponse);
        } else {
          console.error("Upload failed");
          setError("アップロードに失敗しました。");
        }

        setPostComplete(true);
      } catch (err) {
        handleApiError(err);
      }
    };

    const handleApiError = (err) => {
      if (err.response && err.response.status === 409) {
        setError("すでに登録済みです。");
      } else {
        console.error("APIリクエストエラー", err);
      }
    };

    const resizeImage = async (file, maxWidth, maxHeight) => {
      return new Promise((resolve, reject) => {
        const compressor = new Compressor();

        compressor.compress(file, {
          maxWidth,
          maxHeight,
          success(result) {
            resolve(result);
          },
          error(err) {
            reject(err);
          },
        });
      });
    };

    if (name && email && password && photo) {
      handleSignUp();
    }
  }, [name, email, password, photo, dispatch, setCookie, navigate]);

  const handleUsernameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhotoChange = (event) => {
    const selectedPhoto = event.target.files[0];

    if (selectedPhoto) {
      setPhoto(selectedPhoto);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedPhoto);
    }
  };

  return (
    <div>
      <main className="signup">
        <h1 className="title">サインアップ</h1>
        {error && <div className="error-message">{error}</div>}
        <form id="login-form">
          <div>
            <label htmlFor="name">ユーザー名:</label>
            <input
              className="name-input"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">メールアドレス:</label>
            <input
              className="email-input"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">パスワード:</label>
            <input
              className="password-input"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>{" "}
          <label htmlFor="photo">写真:</label>
          <div>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handlePhotoChange}
              required
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="アップロードされた写真"
                className="uploaded-image"
              />
            )}
          </div>
          <button className="signup-button" onClick={handleSubmit}>
            サインアップ
          </button>
        </form>
        {postComplete && <div id="result">登録できました</div>}
      </main>
    </div>
  );
};

export default SignUp;
