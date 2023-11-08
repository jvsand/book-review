import React from "react";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; 
import SignIn from "../pages/SignIn";
import { store } from '../store';

test("ログイン画面に必要なコンポーネントが存在する", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    </Provider>
  );

  const emailInput = screen.getByLabelText("メールアドレス:");
  const passwordInput = screen.getByLabelText("パスワード:");

  expect(emailInput).toBeTruthy();
  expect(passwordInput).toBeTruthy();
});
