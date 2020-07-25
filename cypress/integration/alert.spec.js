/// <referece types="cypress" />

describe('Work whit alert', () => {
    before(
        () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    });

    beforeEach(
        () => {
            cy.reload();
        }
    );

    it('Dispatch Alert', ()=>{
        cy.get('#alert').click();

        //on captura eventos ocorridos na tela
        cy.on('window:alert', msg => {//quando ocorrer um alert
            expect(msg).to.be.equal('Alert Simples');//"msg" é o retorno e realiza-se as assertivas
        })
    })


    it('Dispatch Alert with Mock', ()=>{
        //stub substitui uma função, armazena dados
        // e pode-se controlar o comportamento

        const stub = cy.stub().as('alerta');
        cy.on('window:alert', stub);
        cy.get('#alert').click()
            .then(() => {
                expect(stub.getCall(0))//retornar a primeira chamada do stub
                .to.be.calledWith('Alert Simples')//verifica se foi chamada com a mensagem "Alert Simples"
            });
        //on captura eventos ocorridos na tela
    })

    it('Dispatch Alert with Confirm', ()=>{
        cy.get('#confirm').click();

        cy.on('window:confirm', msg => {//quando ocorrer um confirm
            expect(msg).to.be.equal('Confirm Simples');//"msg" é o retorno e realiza-se as assertivas
        })

        cy.on('window:alert', msg => {//quando ocorrer um alert
            expect(msg).to.be.equal('Confirmado');//"msg" é o retorno e realiza-se as assertivas
        })
    })

    it('Dispatch Alert with Decline', ()=>{
        cy.get('#confirm').click();

        cy.on('window:confirm', msg => {//quando ocorrer um confirm
            expect(msg).to.be.equal('Confirm Simples');//"msg" é o retorno e realiza-se as assertivas
            return false //para "pressionar" a opção Cancelar
        })

        cy.on('window:alert', msg => {//quando ocorrer um alert
            expect(msg).to.be.equal('Negado');//"msg" é o retorno e realiza-se as assertivas
        })
    })

    it.only('Dispatch Alert with Prompt', () => {
        cy.window().then(window => {
            cy.stub(window,'prompt').returns('422');
        })

        cy.on('window:confirm', msg => {//quando ocorrer um confirm
             expect(msg).to.be.equal('Era 422?');//"msg" é o retorno e realiza-se as assertivas
        })

        cy.on('window:alert', msg => {//quando ocorrer um alert
             expect(msg).to.be.equal(':D');//"msg" é o retorno e realiza-se as assertivas
        })

        cy.get('#prompt').click();
    })

});