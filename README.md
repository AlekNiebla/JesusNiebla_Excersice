### Test excercise

## Prerequisites
In order to run this suite it is necessary to hace node and npm on your computer installed

## How to run the Cypress suite
>NOTE:
    This proyect aws built on windows, in order for the command to work, 
    they need to be inputted on a CMD, powershell will not work.

1.- (Only if no node_modules is present) install all dependencies by running `npm install`.

2.- to run the suite with the cypress wizard, run this command: `npm run cy:open`.
    2.1.- to run the suite headless run the command: `npm run cy:run`.

3.-The cypress suite will appear as a wizzard, choose the test to run.

## NOTES
> For this excercise I left the constants file as a repository for boths static text and `data-testid` selectors, 
 if this was a real proyect I would've created a `selector` directory sepecifically for tracking the `data-testid`
 tags since those selector are build specifically for quickening the searching process of the test framework.

> Every selector has their declaration started with a `_sel_` in order to make the autocompleeting of variables easier to search.

> I marked the extra steps required by the 3rd step of the excercise with an `*` at the start and a comment on the code.

>No git ignored was added to this projecct, but the `node_modules` and any credentials should go inside a git ignore file.