describe('ログインフォームのテスト', () => {
  it('ユーザー名とメールアドレスが正しい場合', () => {
    cy.visit('http://localhost:3000/signup');

    cy.get('#name').type('ss1');
    cy.get('#email').type('ss1@example.com');
    cy.get('#password').type('ss1');

    cy.get('button').click();
  });

  it('ユーザー名とメールアドレスがすでに登録されている場合', () => {
    cy.visit('http://localhost:3000/signup');

    cy.get('#name').type('ss');
    cy.get('#email').type('ss@example.com');
    cy.get('#password').type('ss');

    cy.get('button').click();
    cy.get('.error-message').should('contain', 'すでに登録済みです。');
  });
  
  it('サインインからHome画面の確認', () => {
    cy.visit('http://localhost:3000/');

    cy.get('#email').type('ss1@example.com');
    cy.get('#password').type('ss1');
    cy.get('button').click();

  });
});