import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { SignUp } from "../pages/SignUp";
import { SignIn } from "../pages/SignIn";
import { CreateReview } from "../pages/CreateReview";
import { Editprof } from "../pages/Editprof";
import { ViewReview } from "../pages/ViewReview";

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
            <Route path="/newreview" element={<CreateReview />} />
            <Route path="/detail/:id" element={<ViewReview />} />
          </>
        ) : (
          <Route path="/" element={<Navigate to="/signin" />} />
        )}
        {/* <Route element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
