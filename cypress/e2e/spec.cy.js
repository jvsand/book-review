describe('ログインフォームのテスト', () => {
  it('ユーザー名とメールアドレスが正しい場合', () => {
    cy.visit('http://localhost:3000/signup');

    cy.get('#name').type('sampleb');
    cy.get('#email').type('example111@example.com');
    cy.get('#password').type('AAbb1122');

    cy.get('button').click();
  });

  // it('メールアドレスがない場合', () => {
  //   cy.visit('http://localhost:3000/');
  //   cy.get('#username').type('sampleA');

  //   cy.get('#username').should('have.value', 'sampleA');
  //   cy.get('#email').should('have.value', '');
  // });
  
  // it('ユーザー名がない場合', () => {
  //   cy.visit('http://localhost:3000/'); 
  //   cy.get('#email').type('example@example.com');

  //   cy.get('#username').should('have.value', '');
  //   cy.get('#email').should('have.value', 'example@example.com');
  // });
});