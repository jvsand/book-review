describe('ログインフォームのテスト', () => {  
  it('サインインからHome画面の確認', () => {
    cy.visit('http://localhost:3000/');

    cy.get('#email').type('ss1@example.com');
    cy.get('#password').type('ss1');
    cy.get('button').click();

    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('記入欄に空欄がある場合', () => {
    cy.visit('http://localhost:3000/signin');

    cy.get('#password').type('ss');

    cy.get('button').click();
    cy.get('.error-message').should('contain', '空欄があります。');
  });
});