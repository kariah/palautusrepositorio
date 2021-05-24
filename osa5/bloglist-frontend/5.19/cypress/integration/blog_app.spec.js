describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Kari1',
      username: 'kayttajatunnus1',
      password: 'salasana1'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  //5.17
  it('Login form is shown', function() {
    cy.contains('Login')
    cy.get('#username')
    cy.get('#password')
  })

  //5.18
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').clear()
      cy.get('#username').type('kayttajatunnus1')
      cy.get('#password').clear()
      cy.get('#password').type('salasana1')
      cy.get('#login-button').click()
      cy.contains('Kari1 logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').clear()
      cy.get('#username').type('kayttajatunnus1_virheellinen')
      cy.get('#password').clear()
      cy.get('#password').type('salasana1_virheellinen')
      cy.get('#login-button').click()
      cy.get('#error').should('contain', 'Wrong credentials')
    })
  })

  //5.19
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'kayttajatunnus1',
        password: 'salasana1' })
    })

    it.only('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Title1')
      cy.get('#author').type('Author1')
      cy.get('#url').type('Url1')
      cy.get('#likes').type('0')
      cy.get('#save-button').click()
      cy.get('#info').should('contain', ' added')
    })
  })

})
