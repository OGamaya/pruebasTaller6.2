describe('Generacion de paletas', function() {
  it('Visita el sitio y genera paletas', function() {
      cy.visit('https://ogamaya.github.io/')
      cy.contains('Generar nueva paleta').click()
      cy.screenshot('1')
      cy.contains('Generar nueva paleta').click()
      cy.screenshot('2')

  })
})

