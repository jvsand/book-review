import React from "react";
import { render, screen } from "@testing-library/react";
import SignIn from "./pages/SignUp";

test("ログイン画面に必要なコンポーネントが存在する", () => {
  render(<SignIn />);

  const usernameInput = screen.getByLabelText("ユーザー名:");
  const emailInput = screen.getByLabelText("メールアドレス:");
  const loginButton = screen.getByText("ログイン");

  expect(usernameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});
