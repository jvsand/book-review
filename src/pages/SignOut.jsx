import React from "react";
import { useNavigate } from "react-router-dom";

function SignOut() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // ログアウト後にユーザーを未認証の状態にリダイレクト
    navigate("/signin");
  };

  return (
    <div>
      <h1>サインアウト</h1>
      <button onClick={handleSignOut}>サインアウト</button>
    </div>
  );
}

export default SignOut;
