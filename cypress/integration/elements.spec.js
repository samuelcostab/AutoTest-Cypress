/// <referece types="cypress" />

describe('Work whit basic elements Continue', () => {
    before(
        () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    });

    beforeEach(
        () => {
            cy.reload();
        }
    );

    it('RadioButton', () =>{
        cy.get('#formSexoFem')
        .click()
        .should("be.checked");

        cy.get('#formSexoMasc')
        .should("be.not.checked");
    });

    it("CheckBox", () => {
        cy.get('#formComidaFrango')
        .click()
        

        cy.get('[name=formComidaFavorita]')
        .click({ multiple:true }); //permitir clicar em vários de uma vez

        cy.get('#formComidaFrango')
        .should('not.be.checked');

        cy.get('#formComidaVegetariana')
        .should("be.checked");
    })

    it("ComboBox", () => {
        cy.get('[data-test=dataEscolaridade]')
        .select('2o grau completo')
        .should('have.value', '2graucomp');


        cy.get('[data-test=dataEscolaridade] option')
        .should('have.length',8); //asertiva de qtd.


        cy.get('[data-test=dataEscolaridade] option')//validando itens específicos
            .then( $array => {
                const values = [];
                $array.each (function() {
                    values.push(this.innerHTML);
                })
            
                expect(values).to.include.members(["Superior", "Mestrado"]);
            })

    });

    it.only("MultiCombo", () => {
        //enviar 'value' do item a ser selecionado
        cy.get('[data-testid=dataEsportes]')
        .select(['futebol', 'Corrida']);

        //assertiva pra item selecionados
        cy.get('[data-testid=dataEsportes]')
            .then($elem => {
                expect($elem.val())//esperado que os valores do elemento
                    .to.be.deep.equal(['futebol', 'Corrida']);//sejam iguais à

                expect($elem.val())//esperado que o tamanho do elemento
                    .to.have.length(2);//seja igual a 2
            })

        //alternativa com cypress
        cy.get('[data-testid=dataEsportes]')
            .invoke('val')//invoca a função val e pega o retorno para a assertiva
            .should('eql', ['futebol', 'Corrida'])//deep.equal

        cy.get('[data-testid=dataEsportes]')
            .invoke('val')//invoca a função val e pega o retorno para a assertiva
            .should('have.length', 2)
    });
});