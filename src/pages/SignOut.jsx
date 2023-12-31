import React from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import { signOut } from "../authSlice";
import "./signout.scss";

function SignOut() {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies();

  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie("token");
    navigate("/signin");
  };

  return (
    <div>
      {auth ? (
        <button className="signout-button" onClick={handleSignOut}>
          サインアウト
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SignOut;
