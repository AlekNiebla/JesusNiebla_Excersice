import {
	FEATURES_FIELDSET_SECTION, 
	OS_FIELDSET_SECTION
} from '../support/constants';

import { 
	SUBMIT_BUTTON,
	POPULATE_BUTTON,
	NAME_INPUT
} from '../support/selectors'

describe('Brightcove from excersice', () => {

	const USER_NAME = 'Jesus Alejandro Niebla'
	const FEATURES_OPTIONS = FEATURES_FIELDSET_SECTION.listItems

    const REUSING_CODE = 1
    const EASY_EMBEDDING_TO_CI = 3
    const ADVANCES_TRAFFIC_ANALYSIS = 4

	before( () => {
		cy.visit('/', {timeout: 10000})
	})

	it('validates Submit button is disabled', () => {
		cy.get(SUBMIT_BUTTON)
			.should('be.disabled')
		
	})

	it('Click Populate to fill in a default name', () => {
		cy.get(POPULATE_BUTTON)
			.should('be.visible')
			.and('be.enabled')
			.click()

		cy.on('window:confirm', (text) => {
			expect(text).to.contains('Reset information before proceeding?');
			return true;
			});
		// confirm default name has been written
		cy.get(NAME_INPUT)
			.should('be.visible')
			.and('be.enabled')
			.and('have.value','Peter Parker')
	})


	it('User can type into the name input', () => {
		cy.get(NAME_INPUT)
			.should('be.visible')
			.and('be.enabled')
			.then( name_input => {
				cy.get(name_input).clear()
				cy.get(name_input).type(USER_NAME)
			})
	})

	it('User select 3 features that are important to you', () => {
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


				cy.log('USER SELECTS 3 OPTIONS')
				cy.get(FEATURES_OPTIONS[REUSING_CODE]._sel_label)
					.should('contain.text',FEATURES_FIELDSET_SECTION.listItems[REUSING_CODE].text)
				
				cy.get(FEATURES_OPTIONS[REUSING_CODE]._sel_checkBox)
					.click()
				
				cy.get(FEATURES_OPTIONS[EASY_EMBEDDING_TO_CI]._sel_label)
					.should('contain.text',FEATURES_FIELDSET_SECTION.listItems[EASY_EMBEDDING_TO_CI].text)
				
				cy.get(FEATURES_OPTIONS[EASY_EMBEDDING_TO_CI]._sel_checkBox)
					.click()

				cy.get(FEATURES_OPTIONS[ADVANCES_TRAFFIC_ANALYSIS]._sel_label)
					.should('contain.text',FEATURES_FIELDSET_SECTION.listItems[ADVANCES_TRAFFIC_ANALYSIS].text)
				
				cy.get(FEATURES_OPTIONS[ADVANCES_TRAFFIC_ANALYSIS]._sel_checkBox)
					.click()
				
			})
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
			})
	})

	it('User clicks Submit and verify URL changes', () => {
		cy.get(SUBMIT_BUTTON).click()
		cy.url().should('contain','/thank-you.html')
	})

	it('User validates Thanks you page contains the expected name', () => {
		cy.get('[data-testid="thank-you-header"]')
			.should('be.visible')
			.and('contain',USER_NAME)
	})

})



