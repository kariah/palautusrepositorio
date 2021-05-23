describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
  })

  //5.17
  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Login')
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      const user = {
        name: 'Kari1',
        username: 'username1',
        password: 'salasana1'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)

      cy.visit('http://localhost:3000')
      cy.get('#username').clear()
      cy.get('#username').type('username1')
      cy.get('#password').clear()
      cy.get('#password').type('salasana1')
      cy.get('#login-button').click()
      cy.contains('Kari1 logged in')
    })

    it.only('fails with wrong credentials', function() {
      const user = {
        name: 'Kari1',
        username: 'username1',
        password: 'salasana1'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)

      cy.visit('http://localhost:3000')
      cy.get('#username').clear()
      cy.get('#username').type('username1_virheellinen')
      cy.get('#password').clear()
      cy.get('#password').type('salasana1_virheellinen')
      cy.get('#login-button').click()
      cy.get('#error')
    })
  })
})
