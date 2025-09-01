/// <reference types="cypress" />

describe('Teste de Login - SGHSS', () => {

  beforeEach(() => {
    // abre a página de login
    cy.visit('http://localhost:4200/login');
  });

  it('Deve realizar login com credenciais válidas', () => {
  cy.visit('http://localhost:4200/login');

  cy.get('input[formcontrolname="login"]').type('paulo');
  cy.get('input[formcontrolname="password"]').type('123456');

  cy.get('button').contains('Entrar').click();

  // espera a navegação
  cy.url().should('include', '/home');

  cy.contains('Olá, paulo!').should('be.visible');
});

  it('Deve exibir erro ao tentar logar com credenciais inválidas', () => {
    cy.get('input[formcontrolname="login"]').type('usuarioInvalido');
    cy.get('input[formcontrolname="password"]').type('senhaErrada');

    cy.get('button').contains('Entrar').click();

    // você pode configurar no Angular uma mensagem de erro
    cy.contains('Credenciais inválidas').should('be.visible');
  });

});
