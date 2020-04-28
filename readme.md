![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)
​
# RESTful API
​
## Introduction
​
Your task is to build a RESTful Express API! You should include INDEX and CREATE for a single resource. There is no starter code for this assignment, so you should build everything from scratch.
​
There is nothing to stop you from copy / pasting from the classwork you have done today, but if you do **you will not learn anything** from this homework.
​
Instead we advise that you build out the API slowly and test as you go.
​
### Requirements
​
Use your lesson notes along with the classwork from today as a reference.
​
* You should have one model (of your choice)
* You should be able to perform INDEX and CREATE actions
* Include a seeds file
​
### Bonus
​
* Have a go at adding the other RESTful routes: SHOW, UPDATE and DELETE.


Steps to follow for tonight’s homework:
- Install packages
install any required packages (if you are not sure check your classwork's package json for the dependencies you'll need)
- config/environment.js
Set up the file (do look up how we did it in class you’re not expected to know the syntax for this)
call your database whatever you want your collection to be called
- index.js
require express, port - get the app running first (console.log). Check everything is working using $ yarn start
- index.js
Set up mongoose, databaseURI - make sure this connects. If they both work don’t forget to add your body-parser next. 
- logger
Set up the logger file. 
- index.js 
import the logger and check everything is working (don’t worry about the router yet)
- models
don’t forget to require mongoose!
Make the schema (and model), keep it simple!
- db/ seeds.js
Make seeds file and test that it builds (3 seeds is enough)
Don’t forget to import your model. 
Add the 'seed' script in your package.json (check the classwork's package json;
Don’t forget to run this command for the seeds to be added to the DB:
$ yarn seed 
- router & controllers 
Make routes and each controller - INDEX and CREATE are required, 
SHOW, UPDATE, DELETE are bonus
Only write one route at one time and test in insomnia in between. 
- index.js
don’t forget to import the router! 
---
The file structure should look like this:
-> config
   — environment.js
   — router.js
-> controllers
   — js file for your controllers
-> db
   — seeds.js
-> models
   — js file for your models
-> index.js


![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)
​
# Express API Authentication Lab
​
Taking the starter code provided add authentication to the existing API.
​
## Deliverables
​
You should submit a fully working API has authenticated routes and register and login endpoints. The API should return a JWT token at login, which can be used to access specific endpoints that would otherwise be unavailable.
​
You will need to make a user model, secure route middleware and authentication endpoints.
​
## Tips
​
* Work slowly toward your goal, and test frequently as you go.
* Do not copy / paste from code you have written during class, this will not help you understand how everything fits together.
* Use the seeds file to reset the database if you need.


Authentication Lab
Don't forget to install bcrypt & jsonwebtoken
1. Create the user model
- Build out the basic model
- Set up the virtual field for passwordConfirmation (watch the spelling)
2. Set up the user methods
- .pre('validate') to check for match between password and passwordConfirmation
- .pre('save') to hash password using bcrypt before saving to db
- Don't add the validatePassword yet.
- Export User model
3. Make auth controllers
- Make the register function
- Hook up the route for register and TEST!
- If you are getting 'module' missing errors it's likely that there's an issue with your importing and exporting
- Make the login function
4. Validation
- Add secret to `config/environment.js` and require it
- Remember to make `validatePassword()` in the user model
- Hook up the route for login and TEST!
5. Make a secureRoute folder in lib
- Make a `secureRoute()` function
- Check to see if a token exists
- Check if token is valid
6. Import secure route to routes and add it to any routes that should be secure. Leave this as the last step so that testing can be easier