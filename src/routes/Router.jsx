import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { SignUp } from "../pages/SignUp";
import { SignIn } from "../pages/SignIn";
import { NewReview } from "../pages/NewReview";
import { Editprof } from "../pages/Editprof";

export function Router() {
  const auth = useSelector((state) => state.auth.isSignIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {auth ? (
          <>
            <Route path="/profile" element={<Editprof />} />
            <Route path="/newreview" element={<NewReview />} />
          </>
        ) : (
          <Route path="/" element={<Navigate to="/signin" />} />
        )}
        {/* <Route element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
