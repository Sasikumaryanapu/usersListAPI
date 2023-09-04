# usersListAPI
Created an API for users list service , which allows to perform CRUD operations .

# Routes

For Adding the user

url : http://localhost:3000/users/addUser

For Updating a user

url : http://localhost:3000/users/updateUser

To get UsersList

url : http://localhost:3000/users/retriveUsers

To Remove user

url : http://localhost:3000/users/removeUser

# Schema

username : String  

email    : String  

password : String  

mobile   : Number  

profile  : Buffer 

# src/Models

 - userModel
   It holds the schema

# src/Controllers

 - userController 
   It holds all the functions to handle CRUD

# Packages

- NodeJS , ExpressJS , Mongoose , bcrypt , jsonwebtoken , Javascript 

# install Command 
  npm i or npm install

  This will install all the required packages to run the server.
  
