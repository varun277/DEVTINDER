const validator = require('validator')

const validateSignUpData = (req) => {
    const { firstName, lastName, emaildId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not valid")
    }
    else if (firstName?.length < 4 || firstName?.length > 50) {
        throw new Error("First Name should be in between 4 and 50 characters")
    }
    else if (!validator.isEmail(emaildId)) {
        throw new Error("Email should not valid")
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Paasword is not strong enough")
    }
}

module.exports = { validateSignUpData }