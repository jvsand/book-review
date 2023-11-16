import React from "react";
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { useNavigate } from "react-router-dom";
import { signOut } from '../authSlice';

function SignOut() {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies();

  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie('token');
    navigate('/signin');
  };

  return (
    <div>
      <h1>サインアウト</h1>
      {auth ? (
        <button type="button" onClick={handleSignOut}>
          サインアウト
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SignOut;
