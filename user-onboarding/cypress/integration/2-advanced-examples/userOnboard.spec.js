
describe('UserOnboarding App', () => {
    
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })
    it('sanity check for making sure everything is setup',()=>{
        
        expect(1+2).to.equal(3)     
        expect(2+2).not.to.equal(5)
    })

    const userNameInput = () => cy.get('input[name="username"]')
    const emailInput = () => cy.get('input[name="email"]')
    const passwordInput = () => cy.get('input[name="password"]')
    const termsCheckbox = () => cy.get('[type="checkbox"]')
    const submitButton = () => cy.get('.submitBtn')

    it('can type in the name input', () => {
        userNameInput()
        .should('have.value', '')
        .type('Test Name')
        .should('have.value', 'Test Name')
    })

    it('can type in the email input', () => {
        emailInput()
        .should('have.value', '')
        .type('test@test.com')
        .should('have.value', 'test@test.com')
    })
    it('can type in the password input', () => {
        passwordInput()
        .should('have.value', '')
        .type('1234')
        .should('have.value', '1234')
    })
    it('can check the terms checkbox', () => {
        termsCheckbox()
        .should('not.be.checked')
        .check()
        .should('be.checked')
    })
    it('add a new user by hitting submit button', () => {
        userNameInput().type('Test Name')
        emailInput().type('test@test.com')
        passwordInput().type('1234')
        termsCheckbox().check()
        submitButton().click()
    })
    it('check validation if a form is left empty', () => {
        userNameInput().type('12')
        emailInput().type(123)
        passwordInput().type('1')
        termsCheckbox().check()
        termsCheckbox().uncheck()
    })
        
    
})