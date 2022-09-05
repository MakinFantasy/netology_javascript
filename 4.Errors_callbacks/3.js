const readline = require('readline')
const { stdin: input, stdout: output } = require('process')
const rl = readline.createInterface( {input, output} )


let gameData = {
    tries: 0,
    userNum: NaN,
    minNum: 0,
    maxNum: 1000,
    randomNum: Math.floor(Math.random() * 1000)
}

async function getUserInput () {
    let promise = new Promise( function (resolve) {
        let userInput = null;
        rl.question('Input: \n', (input) => {
            userInput = input;
            return resolve(userInput)
        })
    })

    return await promise

}


async function game () {
    while (true) {
        let userInput = await getUserInput();
        if (userInput.toLowerCase() === 'exit') {
            break;
        }

        let number = parseInt(userInput);

        if (isNaN(number) || number < gameData.minNum || number > gameData.maxNum) {
            console.log(`Вы ввели не число в интервале ${gameState.minValue}-${gameState.maxValue}. Повторите попытку\n`)
            continue;
        }

        console.log('Your num: ', number, '\n')

        gameData.tries++;
        gameData.userNum = number;

        if (number === gameData.randomNum) {
            console.log('U won! Tries: ', gameData.tries)
            break;
        }

        if (number < gameData.randomNum) {
            console.log('More need\n')
        } else {
            console.log('less need\n')
        }
    }
    rl.close()
}

game();