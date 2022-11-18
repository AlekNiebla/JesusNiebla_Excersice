import {
	FEATURES_FIELDSET_SECTION, 
	OS_FIELDSET_SECTION,
	TESTCAFE_SECTION
} from '../support/constants';

describe('Brightcove from excersice', () => {

	const USER_NAME = 'Jesus Alejandro Niebla'

	before( () => {
		cy.visit('/', {timeout: 10000})
	})

	it('validates Submit button is disabled', () => {
		cy.get('[data-testid="submit-button"]')
			.should('be.disabled')
		
	})

	it('Click Populate to fill in a default name', () => {
		cy.get('[data-testid="populate-button"]')
			.should('be.visible')
			.and('be.enabled')
			.click()

		cy.on('window:confirm', (text) => {
			expect(text).to.contains('Reset information before proceeding?');
			return true;
			});
		// confirm default name has been written
		cy.get('[data-testid="name-input"]')
			.should('be.visible')
			.and('be.enabled')
			.and('have.value','Peter Parker')
	})


	it('User can type into the name input', () => {
		cy.get('[data-testid="name-input"]')
			.should('be.visible')
			.and('be.enabled')
			.then( name_input => {
				cy.get(name_input).clear()
				cy.get(name_input).type(USER_NAME)
			})
	})

	//ADDED STEP
	it('*User can select all options of the "Which features are important to you:" section', () => {
		cy.get('[class="column col-1"]')
			.children('fieldset').eq(1)
			.should('be.visible')
			.and('contain.text', FEATURES_FIELDSET_SECTION.title)
			.within(()=>{
				cy.log('VERIFY ALL CHECKBOXES ARE NOT CHECKED')
				FEATURES_FIELDSET_SECTION.listItems.forEach(item => {
					cy.get(item._sel_checkBox)
					.not('be.checked')
				})

				cy.log('USER SELECTS ALL OPTIONS')
				FEATURES_FIELDSET_SECTION.listItems.forEach(item => {
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
			.and('have.value',USER_NAME)

		
	})

	it('User can select the MacOS option on primary Operating System', () => {
		cy.get('[class="column col-2"]')
			.children('fieldset')
			.first()
			.should('be.visible')
			.and('contain.text',OS_FIELDSET_SECTION.title)
			.within(() => {
				// Verify all checkboxes are not checked
				cy.get('label')
					.should('have.length', 3)
					.within(() => {
						cy.get('input')
						.not('be.checked')
					})

				cy.get(OS_FIELDSET_SECTION.items.MACOS._sel_label)
					.should('contain.text', OS_FIELDSET_SECTION.items.MACOS.text)
					.within(() => {
						cy.get(OS_FIELDSET_SECTION.items.MACOS._sel_radioBtn)
						.should('be.enabled')
						.and('be.visible')
	
						cy.log('CLICKING MACOS RADIO BUTTON')
						cy.get(OS_FIELDSET_SECTION.items.MACOS._sel_radioBtn).click()
						cy.wait(500)
						
						// verify radio button is selected
						cy.get(OS_FIELDSET_SECTION.items.MACOS._sel_radioBtn).should('be.checked')
					})
			})
	})

	it('User selects "Javascript API" from TestCafe interface', ()=>{
		cy.get('[class="column col-2"]')
			.children('fieldset')
			.eq(1)
			.should('be.visible')
			.as('TestCafe_fieldset')

		cy.get('@TestCafe_fieldset')
			.should('be.visible')
			.and('contain.text','Which TestCafe interface do you use:')
			.within(() => {
				cy.get('[data-testid="preferred-interface-select"]')
				.should('be.visible')
				.and('be.enabled')
				.select('JavaScript API')

				cy.wait(500)
			})
	})

	it('User clicks Submit and verify URL changes', () => {
		cy.get('[data-testid="submit-button"]')
			.click()
		cy.wait(500)
		cy.url().should('contain','/thank-you.html')
	})

	it('User validates Thanks you page contains the expected name', () => {
		cy.get('[data-testid="thank-you-header"]')
			.should('be.visible')
			.and('contain',USER_NAME)
	})

})



