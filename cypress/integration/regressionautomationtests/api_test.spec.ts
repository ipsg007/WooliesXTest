describe('API test: Verify the number of races in a season ', function () {  

    it('Verify numberOfCircuits in Formula One races in <season>', function () {
  
      for (let i=0; i<=71; i++) {
      let start_year = 1950+i;    
      cy
      .request(
        'GET',
        `http://ergast.com/api/f1/${start_year}`,
      )
      .then((response) => {
          const xml = Cypress.$.parseXML(response.body)                             
          cy.log(Cypress.$(xml).find("RaceTable>Race>RaceName").length.toString() + " races for year " + start_year);            
        });
      }
    })
  });