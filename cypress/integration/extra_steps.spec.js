import {
	FEATURES_FIELDSET_SECTION, 
	OS_FIELDSET_SECTION,
	TESTCAFE_SECTION
} from '../support/constants';

describe('Brightcove from excersice', () => {

	const USER_NAME = 'Jesus Alejandro Niebla'
	const FEATURES_OPTIONS = FEATURES_FIELDSET_SECTION.listItems

	before( () => {
		cy.visit('/', {timeout: 10000})
	})

	//ADDED STEP
	it('*User can selects All options of the "Which features are important to you:" section', () => {
		cy.get('[class="column col-1"]')
			.children('fieldset').eq(1)
			.should('be.visible')
			.and('contain.text', FEATURES_FIELDSET_SECTION.title)
			.within(()=>{
				cy.log('VERIFY ALL CHECKBOXES ARE NOT CHECKED')
				FEATURES_OPTIONS.forEach(item => {
					cy.get(item._sel_checkBox)
					.not('be.checked')
				})

				cy.log('USER SELECTS ALL OPTIONS')
				FEATURES_OPTIONS.forEach(item => {
					cy.get(item._sel_label)
					.should('contain.text',item.text)

					cy.get(item._sel_checkBox)
					.click()
				})
			})
	})

	//ADDED STEP
	it('*User clicks the "I have tried TestCafe" options and enables the reviews section', () => {
		
		cy.log('VERIFY TESTCAFE SECTION ELEMENTS ARE DISABLED')
		cy.get(TESTCAFE_SECTION._sel_slider)
			.should('be.visible')
			.and('have.class', 'ui-state-disabled')
		
		cy.get(TESTCAFE_SECTION._sel_commentsTextArea)
			.should('be.visible')
			.and('be.disabled')

		cy.get(TESTCAFE_SECTION._sel_label)
			.should('contain.text',TESTCAFE_SECTION.label_text)

		cy.get(TESTCAFE_SECTION._sel_section_checkBox)
			.not('be.checked')
			.click()
			.then(_checkbox =>{
				cy.get(_checkbox).should('be.checked')

				cy.get(TESTCAFE_SECTION._sel_slider)
					.should('be.visible')
					.and('not.have.class', 'ui-state-disabled')
		
				cy.get(TESTCAFE_SECTION._sel_commentsTextArea)
					.should('be.visible')
					.and('be.enabled')
					.type('This is a test text for the TestCafe Review')
			})
	})

	//ADDED STEP
	it('*Verify "Populate" Button opens a pop up and press Cancel', () => {
		cy.get('[data-testid="name-input"]')
		.should('be.visible')
		.and('be.enabled')
		.then( name_input => {
			cy.get(name_input).clear()
			cy.get(name_input).type('test_name')
		})

		cy.get('[data-testid="populate-button"]')
			.should('be.visible')
			.and('be.enabled')
			.click()

		cy.on('window:confirm', (text) => {
			expect(text).to.contains('Reset information before proceeding?');
			return false;
			});
		// confirm name has not been changed
		cy.get('[data-testid="name-input"]')
			.should('be.visible')
			.and('be.enabled')
			.and('have.value','test_name')

		
	})
})



