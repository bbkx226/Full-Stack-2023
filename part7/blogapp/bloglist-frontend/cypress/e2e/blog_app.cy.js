describe('Blog app', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Brandon',
      username: 'bbkx',
      password: '123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('bbkx')
      cy.get('#password').type('123')
      cy.get('#login').click()
      cy.contains('Brandon logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('bbkx')
      cy.get('#password').type('321')
      cy.get('#login').click()
      cy.contains('wrong username or password')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'bbkx', password: '123'
      }).then(response => {
        localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('a blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Testing')
      cy.get('#author').type('Brandon')
      cy.get('#url').type('https://www.bbkx.live')
      cy.get('#submit').click()
      cy.contains('Testing')
    })

    it('confirms users can like a blog', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Testing')
      cy.get('#author').type('Brandon')
      cy.get('#url').type('https://www.bbkx.live')
      cy.get('#submit').click()
      cy.contains('Testing')
      cy.contains('view').click()
      cy.contains('like').click()  
    })

    it('user who created a blog can delete it', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Testing')
      cy.get('#author').type('Brandon')
      cy.get('#url').type('https://www.bbkx.live')
      cy.get('#submit').click()

      cy.contains('Testing').click()
      cy.contains('view').click()
      cy.get('#remove').click()

      cy.get('html').should('not.contain', 'First class tests - Edsger W. Dijkstra')
    })
  })

  describe.only('Blogs ordered by number of likes', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'bbkx', password: '123'
      }).then(response => {
        localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })

      cy.contains('create new blog').click()
      cy.get('#title').type('Testing1')
      cy.get('#author').type('Brandon')
      cy.get('#url').type('https://www.bbkx.live')
      cy.get('#submit').click()
      cy.wait(1500)
      cy.contains('create new blog').click()
      cy.get('#title').type('Testing2')
      cy.get('#author').type('Brandon')
      cy.get('#url').type('https://www.bbkx.live')
      cy.get('#submit').click()
      cy.wait(1500)
      cy.contains('create new blog').click()
      cy.get('#title').type('Testing3')
      cy.get('#author').type('Brandon')
      cy.get('#url').type('https://www.bbkx.live')
      cy.get('#submit').click()
      cy.contains('Testing1 - Brandon').parent().as('blog1')
      cy.contains('Testing2 - Brandon').parent().as('blog2')
      cy.contains('Testing3 - Brandon').parent().as('blog3')

    })

    it('they are ordered by number of likes', function() {
      
      cy.get('@blog1').contains('view').click()
      cy.get('@blog1').contains('like').as('like1')
      cy.wait(500)
      cy.get('@blog2').contains('view').click()
      cy.get('@blog2').contains('like').as('like2')
      cy.wait(500)
      cy.get('@blog3').contains('view').click()
      cy.get('@blog3').contains('like').as('like3')
      
      cy.get('@like3').click()
      cy.wait(1500)
      cy.get('@like1').click()
      cy.wait(1500)
      cy.get('@like1').click()
      cy.wait(1500)
      cy.get('@like2').click()
      cy.wait(1500)
      cy.get('@like2').click()
      cy.wait(1500)
      cy.get('@like2').click()
      cy.wait(1500)

      cy.get('.blogAll').then(blogs => {
        cy.wrap(blogs[0]).contains('3')
        cy.wrap(blogs[1]).contains('2')
        cy.wrap(blogs[2]).contains('1')
      })
    })
  })
})