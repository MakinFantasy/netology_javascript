function isPrime(num) {
    if (num === 2) {
        return true;
    } else if (num > 1) {
        for (let i = 2; i < num; i++) {
            if (num % i !== 0) {
                return true;
            } else if (num === i * i) {
                return false
            } else {
                return false;
            }
        }
    } else {
        return false;
    }
}
function algo (count) {
    let arr = [];
    let n = 1;
    while (arr.length !== count) {
        if (isPrime(n) === true) {
            arr.push(n);
            n += 1;
        }
        else {
            n += 1;
        }
    }
    console.log(arr)
    return 0;
}


let res = algo(1000);
console.log(res);



