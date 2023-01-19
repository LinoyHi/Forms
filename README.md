# Forms
<details open>
    <summary>This Project Include:</summary>
    <ul>
        <li> MySQL</li>
        <li> react</li>
        <li> Redux/Toolkit</li>
        <li> Redux/Persist</li>
        <li> nestJS</li>
        <li> typeORM <sub>//connecting to mysql//</sub></li>
        <li> bootstrap</li>
        <li> bcrypt</li>
    </ul>
</details>


# Which Forms?
- [x] Sign in 
- [x] Sign up 
<details open>
    <summary>Forms for forgot password</summary>
    <ul>
        <li> - [X] Email code confirmation <sub>//sent code in email//</sub></li>
        <li> - [x] Change password</li>
    </ul>
</details>

# How To Connect Your MySQL?
Go to the web-server folder = > src folder = > config folder => config file
![image](https://user-images.githubusercontent.com/108211669/198382456-b2e9e295-8405-45ff-b58d-12a1ca83bdf1.png)

# How To Connect Your Business Email?
Go to the web-server folder = > src folder = > users folder => users.service.ts file => sendMail function
![image](https://user-images.githubusercontent.com/108211669/212913263-0cf83432-4ff5-46dd-a106-19a1bdf545ee.png)
the mail I posted is fake and only in use for those projects you can keep it as it is just keep in mind you won't be able to log in to this email
<br/>
**if you do change** 
<br/>
please change the mail in both **transporter** AND **mailOptions**

## How To Get The Pass NodeMailer Ask For?
<details close>
    <summary>Gmail instructions</summary>
    <ul>
        <li> Enter the security on your account </li>
        <li> Find the 2 step verification </li>
        <li> After approving that you'll get a other apps passwords </li>
        <li> Enter for another write nodeMailer and you'll recive a password </li>
        <li> Enter that password as your pass </li>
        <li> Send a mail to check connection :) </li>
    </ul>
</details>

# How to add/change validation?
### What is already optional?
<details open>
    <summary>Four validations already exsist:</summary>
    <li>- [x] require <sub>checks if any input was added also if a line is required there's a red star next to it</sub></li>
    <li>- [x] email <sub>checks if the input is the correct format for an email using regax</sub></li>
    <li>- [x] minLen <sub>checks if the input lengths is at least the amount you asked for</sub></li>
    <li>- [x] numbers <sub>checks if the input has at least 1 number</sub></li>
</details>
 

### How to add a new validation?
Go to the validation file (website folder => src folder => common folder => validation) add your if statement to check your validation
### How to add a validation to a field?
To add them simply go to the api file (website folder => src folder => DAL folder => api) and change the data object 
<details>
    <summary>for example</summary>
    <ul>
        <img src='https://user-images.githubusercontent.com/108211669/198567878-b28285b9-0842-4bb5-b07c-375342a7d0a2.png'/>
    </ul>
</details>

# Pictures
<details>
    <summary>Log in form</summary>
    <ul>
        <li><img alt='image of the Log in form' src='https://user-images.githubusercontent.com/108211669/213479511-6e766e34-977a-4881-9aaa-afdecd6be757.png'/> </li>
    </ul>
</details>
<details>
    <summary>Sign up form</summary>
    <ul>
        <li><img alt='image of the Sign up form' src='https://user-images.githubusercontent.com/108211669/213479708-764d19b4-8a83-4264-8cf9-4db2f5254a4b.png'/></li>
    </ul>
</details>
<details>
    <summary>Forgot Password Process</summary>
    <ul>
        <li><img alt='image of the enter code form' src='https://user-images.githubusercontent.com/108211669/213480214-348ef531-a17b-4d7c-ab76-13b073bf66cc.png'/></li>
        <li><img alt='image of the code email' src='https://user-images.githubusercontent.com/108211669/213480351-7d52a366-12ea-413b-bf61-b6b2a5f2f889.png'/></li>
        <li><img alt='image of the change password form' src='https://user-images.githubusercontent.com/108211669/213480482-6dd5c005-1d01-40f6-8d81-f304a7ce7ee4.png'/></li>
        <li>phone mode - <img alt='image of the password on phone mode' src='https://user-images.githubusercontent.com/108211669/213480878-461711ef-a53b-40d5-b229-c3b8c7cccd7f.png'/></li>
    </ul>
</details>
<details open>
    <summary>Home page</summary>
    <ul>
      <details>
         <summary>before login in</summary>
         <ul>
            <li><img src='https://user-images.githubusercontent.com/108211669/201970481-f3a6b51f-be93-41d4-b0d8-c354acff78a9.png'/>
            <p>a click on the light blue text would take the user back to the log in form and a click on the sign up button would take the user to the sign up form</p>             </li>
         </ul>
      </details>
      <details>
         <summary>after login in</summary>
         <ul>
            <li><img src='https://user-images.githubusercontent.com/108211669/201971086-ab8c2229-5062-49a7-b40d-27a8c3ebf919.png'/>
            <p>after pressing enter in the login form the user would be transfered to the home page and the user first name would be used, a click onthe log out button             will changed the page back to its state before login in</p></li>
         </ul>
      </details>
    </ul>
</details>


# More
please read the inside README of both web-server and website files
web-server is more information about nestJS
and website is more information about react
