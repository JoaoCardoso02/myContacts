
# Welcome to myContacts!

## Installation

First you need to install [Node.js](https://nodejs.org/). The version used was `12.18.2`

After that, do you need clone the code using and install the dependencies:

```
    git clone https://github.com/JoaoCardoso02/myContacts.git && cd myContacts
    cd backend && npm install

		cd ..

		cd frontend && npm install
```

It is necessary to create a table in a MySQL database called "myContacts" and create the tables with the SQL commands in the ./backend/src/database/sql folder.

OK, after that, it is necessary to start the project! Run on /backend and /frontend:

```
    npm start
```
Ready, is it!

## Front-end

Hello, this is a contact manager!
First, I was challenged by two pages created! Where number one is a data log page and the second is a view of the data.
But, I went beyond!
I created three pages, with some functions:
+ **Registration**
	+ Here, it's a user registration page;
+ **Login**
    + Here, it's a user login page;
+ **Main**
	+ Here, we have some functions:
		+ User:
			+ View personal data;
			+ Alter personal data;
			+ Delete your user;
			+ Alter password;
			+ Log Off.
		+ Contact:
			+ View personal contacts;
			+ Alter personal contacts;
			+ Delete your contacts;
			+ Create new contacts.

### Usage

The project is very simple! Do you need create a account, after that you log in  and you're in!
Now, you are inside the main page. Here, we have several functions, such as: modification of your personal data and manipulation of your contacts!

#### Manipulating your user
+ To change your data, you need to change the fields on the "Meus dados" tab and click "Confirmar";
+ To change your password is very easy! Click "Alterar senha", and in the box that will open, enter your new credential and click "Confirmar";
+ To delete your account, click on the trash can icon next to the title "Meus dados", with that, click "Confirmar" in the box that will open.

#### Manipulating your contacts

+ To create a new contact, click on the plus icon next to the title "Meus contatos", a box with some fields will open, after filling them out, click on "Confirmar";
+ To change a contact, hover over a contact, a box with two icons will open, click the pencil icon. In the open box, change the values, after that, click "Confirmar";
+ To delete a contact, hover over a contact, a box with two icons will open, click the trash can icon. In the open box, click "Confirmar".

#### Log out

+ To end your session, hover over the person icon in the upper left corner, and click "Sair"

## Back-end
For the back-end I created an API, where, I consume it with the axios in the front-end.
We have some endpoints available, but only the login and user registration functions are not necessary to have an access token.
To be able to have an access token, when logging in, the api will disable the token, and the front-end will add the token to the header of the next requests.

### List endpoints

#### Endpoints for users

| Method | Endpoint | Function |
|--|--|--|
| GET | /user/profile | Get data user logged
| GET | /user | Get all users
| POST | /user | Sign Up
| POST | /user/login | Sign In
| PUT | /user | Change data
| PUT | /user/password | Change password
| DELETE | /user | Delete user

#### Endpoints for contacts

| Method | Endpoint | Function |
|--|--|--|
| GET | /contact/:id | Get contact by id
| GET | /contact | Get all contacts by user logged
| POST | /contact | Create contact
| PUT | /contact | Change data
| DELETE | /contact/:id | Delete contact