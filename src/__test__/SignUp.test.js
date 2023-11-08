import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom"; 
import userEvent from '@testing-library/user-event';
import { SignUp } from "../pages/SignUp";
import { store } from '../store';
import { Provider } from "react-redux";

describe('test',()=>{
  test('サインアップフォームが正しく動作するかテスト', async () => {
    render(
      <Provider store={store}>
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    </Provider>
    );
  
    userEvent.click(screen.getByRole('button', {name: 'サインアップ'}))
    await waitFor(() => expect(screen.getByText('ユーザーIDを入力してください。')).toBeInTheDocument())
    await waitFor(() => expect(screen.getByText('パスワードを入力してください。')).toBeInTheDocument())
});
  
  //   // フォームの要素を取得
  //   const nameInput = screen.getByLabelText('ユーザー名:');
  //   const emailInput = screen.getByLabelText('メールアドレス:');
  //   const passwordInput = screen.getByLabelText('パスワード:');
  //   const signUpButton = screen.getByText('サインアップ');
  
  //   // ユーザー名、メールアドレス、パスワードを入力
  //   fireEvent.change(nameInput, { target: { value: 'testuser' } });
  //   fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  //   fireEvent.change(passwordInput, { target: { value: 'password123' } });
  
  //   // サインアップボタンをクリック
  //   fireEvent.click(signUpButton);
  
  //   // サインアップ成功のメッセージを待つ
  //   await waitFor(() => {
  //     const successMessage = screen.getByText('サインアップに成功しました。');
  //     expect(successMessage).toBeInTheDocument();
  //   });
  // });
  
})
// const server = setupServer(
//   rest.post('https://railway.bookreview.techtrain.dev/users', (req, res, ctx) => {
//     // モックの応答を設定
//     return res(
//       ctx.json({ token: 'your-test-token' }),
//       ctx.status(200)
//     );
//   })
// );

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());
//useNavigateをmock


