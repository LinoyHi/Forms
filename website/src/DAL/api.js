const formData = {
    firstName: {
        id: 4,
        serverName: 'firstName',
        placeholder: "first name",
        label: "First Name", iconName: "person-circle",
        validations: { minLen: 2, require: true },
        eror: "",
        type: "text",
        options: [],
        class: "col-lg-6 col-md-12",
        value: ""
    },
    lastName: {
        id: 5,
        serverName: 'lastName',
        placeholder: "last name",
        label: "Last Name", iconName: "person-circle",
        validations: { minLen: 2, require: true },
        eror: "",
        type: "text",
        options: [],
        class: "col-lg-6 col-md-12",
        value: ""
    },
    username: {
        id: 0,
        serverName: 'name',
        placeholder: "Enter Username",
        label: "Username", iconName: "person-fill",
        validations: { minLen: 5, numbers: true, require: true },
        eror: "",
        type: "text",
        options: [],
        class: "col-lg-6 col-md-12",
        value: ""
    },
    password: {
        id: 1,
        serverName: 'password',
        placeholder: "Enter Password",
        label: "Password", iconName: "key-fill",
        validations: { require: true, minLen: 2 },
        eror: "",
        type: "current-password",
        class: "col-lg-6 col-md-12",
        value: "",
        ViewType: "password",
    },
    Email: {
        id: 2,
        serverName: 'email',
        placeholder: "Enter Email",
        label: "Email", iconName: "inbox-fill",
        validations: { require: true, email: true },
        eror: "",
        type: "text",
        options: [],
        class: "col-lg-6 col-md-12",
        value: ""
    },
    phone: {
        id: 6,
        serverName: 'phone',
        placeholder: "phone number",
        label: "Phone Number", iconName: "telephone-fill",
        validations: { minLen: 9 },
        eror: "",
        type: "phone",
        options: [],
        class: "col-lg-6 col-md-12",
        value: ""
    },
    City: {
        id: 7,
        serverName: 'city',
        placeholder: "city",
        label: "City", iconName: "pin-map-fill",
        validations: {},
        eror: "",
        type: "text",
        options: [],
        class: "col-lg-6 col-md-12",
        value: ""
    },
    Country: {
        id: 8,
        serverName: 'country',
        placeholder: "country",
        label: "Country", iconName: "map",
        validations: {},
        eror: "",
        type: "text",
        options: [],
        class: "col-lg-6 col-md-12",
        value: ""
    },
    Address: {
        id: 3,
        serverName: 'address',
        placeholder: "Street,number,city,zip",
        label: "Address", iconName: "building",
        validations: { minLen: 10 },
        eror: "",
        type: "text",
        options: [],
        class: "col-12",
        value: ""
    },
}

export async function getSignUpFormData() {
    return formData
}

export async function getLoginFormData() {
    const Username = { ...formData.username }
    const Password = { ...formData.password }
    Username.class = 'singleLine'
    Username.label = Username.label.concat([' or Email'])
    Username.placeholder = Username.placeholder.concat([' or Email'])
    Password.class = 'singleLine'
    return { usernameOrEmail: Username, password: Password }
}

export async function checkUser(user) {
    return await fetch('http://localhost:4005/users/login', {
        credentials: 'include', method: 'POST'
        , headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify(user)
    })
}

export async function newUser(newuser) {
    return await fetch('http://localhost:4005/users/signup', {
        credentials: 'include', method: 'POST'
        , headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify(newuser)
    })
}

export async function getUser() {
    return await fetch('http://localhost:4005/users/connected', {
        credentials: 'include', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

export async function getExpiration(encryptedUser) {
    return await fetch(`http://localhost:4005/users/confirmUser/${encryptedUser}`, {
        credentials: 'include', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

export async function fogotPasswordMail(data) {
    return await fetch('http://localhost:4005/users/forgotPassword', {
        credentials: 'include', method: 'POST'
        , headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify(data)
    })
}

export async function validateCode(identifier, code){
    return await fetch('http://localhost:4005/users/confirmUser', {
        credentials: 'include', method: 'Post'
        , headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify({userIdentifier:identifier , code})
    })
}

export async function changePassword(identifier,password){
    return await fetch(`http://localhost:4005/users/update/${identifier}`, {
        credentials: 'include', method: 'PATCH'
        , headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify({password})
    })
}