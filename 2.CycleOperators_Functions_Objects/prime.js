function isPrime(num) {
    if (num === 1) {
        return false;
    }
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}
function algo (count) {
    let arr = [];
    let n = 1;
    while (arr.length !== parseInt(count, 10)) {
        if (isPrime(n) === true) {
            arr.push(n);
            n += 1;
        }
        else {
            n += 1;
        }
    }
    return arr;
}


console.log(algo(process.argv[2]));



