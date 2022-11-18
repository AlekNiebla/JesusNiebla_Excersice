

export const FEATURES_FIELDSET_SECTION = {
    title: 'Which features are important to you:',
    listItems: [
        {
            text: 'Support for testing on remote devices',
            _sel_label: '[for="remote-testing"]',
            _sel_checkBox: '[data-testid="remote-testing-checkbox"]'
        },
        {
            text: 'Re-using existing JavaScript code for testing',
            _sel_label: '[for="reusing-js-code"]',
            _sel_checkBox: '[data-testid="reusing-js-code-checkbox"]'
        },
        {
            text: 'Running tests in background and/or in parallel in multiple browsers',
            _sel_label: '[for="background-parallel-testing"]',
            _sel_checkBox: '[data-testid="parallel-testing-checkbox"]'
        },
        {
            text: 'Easy embedding into a Continuous integration system',
            _sel_label: '[for="continuous-integration-embedding"]',
            _sel_checkBox: '[data-testid="ci-checkbox"]'
        },
        {
            text: 'Advanced traffic and markup analysis',
            _sel_label: '[for="traffic-markup-analysis"]',
            _sel_checkBox: '[data-testid="analysis-checkbox"]'
        },
    ]
}

export const OS_FIELDSET_SECTION = {
    title: 'What is your primary Operating System:',
    items:{ 
        WINDOWS: {
            text:'Windows',
            _sel_label:'[for="windows"]',
            _sel_radioBtn:'[data-testid="windows-radio"]'
        },
        MACOS: {
            text:'MacOS',
            _sel_label:'[for="macos"]',
            _sel_radioBtn:'[data-testid="macos-radio"]'
        },
        LINUX: {
            text:'Linux',
            _sel_label:'[for="linux"]',
            _sel_radioBtn:'[data-testid="linux-radio"]'
        }
    }
}

export const TESTCAFE_SECTION = {
    label_text: 'I have tried TestCafe',
    _sel_section_checkBox: '[data-testid="tried-testcafe-checkbox"]',
    _sel_label: '[for="tried-test-cafe"]',
    _sel_slider: '#slider',
    _sel_commentsTextArea:'[data-testid="comments-area"]'
}