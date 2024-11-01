# Zing_It_Chatting APP

## Setting up
You must have nodejs installed
initialize the app by `npm init`

In first terminal run `npx nodemon server.js`

In the second terminal you can use curl to test the various endpoins
OR
You can use postman to test the various endpoints


## APIs
1. SingUp API:
	* Post request
	* `http://localhost/3000/api/auth/signup`
2. Log-in API:
	* Post request
	* `http://localhost/3000/api/auth/login`
3. Get logged-in user API:
	* Get request
	* `http://localhost/3000/api/user/get-logged-user`
4. Get all user expecpt the current user API
	* Get request
	* `http://localhost/3000/api/user/get-all-users`
