function getPasswordChecker(password) {
    return function (input) {
        return input === password;
    }
}


function check(func, actual, bool) {
    if (func(actual) !== bool) {
        throw Error('failed')
    } else {
        console.log('OK')
    }

}


function rightPass () {
    const checker = getPasswordChecker('zxc');
    check(checker, 'zxc', true);
}

function wrongPass () {
    const checker = getPasswordChecker('zxc');
    check(checker, 'xcz', false)
}

function errorCheck () {
    const checker = getPasswordChecker('zxc');
    check(checker, 'xzc', true)
}

rightPass()
wrongPass()
errorCheck()