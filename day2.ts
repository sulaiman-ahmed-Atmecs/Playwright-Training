// TypeScript Interface
interface validateCredentials {
    user: string,
    password: string
}


const credentials: validateCredentials = {
    user : "user",
    password : "password"
}

// Assume we are submitting a form here
var submitForm = (arg: validateCredentials) => {
    console.log(arg.user);
    console.log(arg.password);

}

submitForm(credentials);