# Project 3 - E-Commerce

This is your third project, an E-commerce app. It's a multi page application.

You will be using https://styled-components.com/ + SASS, free of choice depending on components and complexity.

## Redux

You will be using @redux-toolkit. It is preconfigured and ready to go. It's located in the redux folder.
You will add your slices in redux/slices.
Any complex reducers of a slice can be in redux/reducers/sliceName/reducer.ts
Extra reducers and thunks api calls can be in the redux/actions/sliceName/actions.ts.

An example of a slice with reducers and thunks is in the features folder, take a look, read the comments and make it similar to that.

## API

https://dummyjson.com/docs is the API docs, the api route will be given.

In the services folder there is the BaseService.ts where the instance of AXIOS (api config) is configured. On user login you will need to save the whole user in localstorage and get his token and append it in the Authorization.
Error handling is also configured, take a look since you will do it in the future.

The base url is coming from .env and its inserted into the axios config (check instances) if you need more API's you will add them in the instances object.

ProductService.ts is the service for the products endpoint of the API. Your structure should follow it, add additional functions in the productService for getting data with filters, pagination etc.

For a different endpoint of the API (ex Carts) you will create a new file CartsService and make it like ProductService, etc etc.

An example of an API call is in the features/counter/Counter.tsx with the getData function. Use it like this in the thunks.

# Design

https://www.figma.com/file/7a1D68vj9u4Nf5XuPhrjp9/ecommerce-1?type=design&node-id=0%3A1&mode=design&t=Dtt15tLFTj26P33i-1

## Folder Structure

In the **app** folder there are hooks for redux, use them as it says so.
In the routes.tsx you can define your routes for all of the pages, some examples are written, react-router-dom is configured (check App.tsx), for an item details you can do the path as /item/:id then get the id with useParams hook in the component (check features/Counter.tsx for navigation examples)

Pages will be added in the pages folder (pages/pageName/index.tsx) and its components in the components folder like normal.

In definitions.d.ts you can store your types so that you dont go hunting for them everywhere.

Inside the **src** folder you will create your **components** folder. Each component must be put in its own folder. Example: components/komponenta-folder/index.tsx.

Absolute importing is configured for imports. (https://plainenglish.io/blog/why-and-how-to-use-absolute-imports-in-react)

For global style (variables, color variables, breakpoints etc) you can put them in **src/styles/config.ts** with exports and import them in your styled components files. For component styles you can put it in the same folder as the component (components/komponenta-folder/Styles.js)

## Tasks + Logic

Jira board is here: https://milena-internships-projects.atlassian.net/jira/software/projects/ECC/boards/3

key: ECC

Your tasks are in the TO DO column, you can work on them in any order you want (recommended in the order they are but as you wish).

When you start working on a task, you move it to **IN PROGRESS** column and create the branch in git like this: `feature/ECO03-tasknumber_description`. (JIRA and bitbucket are linked and we can track progress from both).

When you commit, your commit must start with `ECC03-tasknumber` and then your description, so commits are linked too.

When you're done with the task, you move it to **TESTING** and assign it to me, and create the pull request.
If everything is OK i will move it to **DONE** and merge the request.
If its not OK i will comment what is wrong on the JIRA task and return it to **IN PROGRESS**

When you are done with the task you create a pull request from that branch to **master**, I will explain more in details and do code-review and what to change/improve if necessary.

When the feature branch code is ready it will be merged to master. You will fetch and pull on master again then create your new branch for the new task.

Multiple commits (if available/needed) are encouraged as a practice. In bigger projects you must make a lot of commits sometimes in a branch, and that is better in case you need to revert back, cherry-pick and rebase,

easier to solve conflicts etc.

If you notice a bug/issue after a branch has been merged, you can create a new branch for the fix as `bugfix/name` that is created from master and not any other branch, then create another pull request.

Never commit and push code directly in master branch!

## Installation

Run `npm install` in the terminal from the root folder. After its done run `npm start` and go to `localhost:3000` to find your project.

## Notes

Follow the DRY Logic (Don't Repeat Yourself) - https://en.wikipedia.org/wiki/Don%27t_repeat_yourself

Create as many components as possible, re-use functions, re-use css.

The project is pre-configured which means that eslint code styling rules are enforced, prettier is configured and set to automatically format your code to be more readable (you can disable it by deleting the .vscode folder, but its recommended to format on save as most clients projects work like that).

You can take a look in the configuration files (eslint, prettier, editorconfig, git, (its a simple config but a popular one that most clients and projects use. Sometimes there are even more strict rules applied but we'll get to that))

Readable code is a must. If something is getting complicated (function/component) you should add some comments to explain it. Its just practice for now but necessary for the future.

Your React code should be in JavaScript (files should end in .js or .jsx). You will learn and use TypeScript later.

And always ask if something isn't clear. Juniors(any level even Seniors) are always encouraged to ask as many questions about any doubts they have, never assume how things work because clients 99% of the time don't think as developers. If something isn't clear to you regarding design, functionalities its always better to ask.

If you have any doubts about how things are planned and designed, if you think that "this will not work like this" or "it doesn't make any sense" make a polite comment to who ever is in charge regarding what you think. Sometimes they agree with you and you can improve the logic, sometimes they force you to do it.

**Good luck and have fun :)**
