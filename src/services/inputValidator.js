export const Validator = (rules , value) => {
    let isValid = true;

    if (!rules) {
        return true;
    }
    if ( rules.isEmail ) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test( value )
    }
    if (rules.isNumeric) {
        isValid = Number(value)
    }

    return isValid;
}