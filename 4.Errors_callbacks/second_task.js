const readline = require('readline')
const { stdin: input, stdout: output} = require('process')
const fs = require('fs')

const rl = readline.createInterface( {input, output} )

let gameData = {
    counter: 0,
    userInput: NaN,
    minNumber : 0,
    maxNumber: 1000,
    random: Math.floor(Math.random() * 1000),
}

function question (logger) {
    rl.question('Enter number or exit: ', (input) => {
        if (input.toLowerCase() === 'exit') {
            rl.close()
            return;
        }

        let userNum = parseInt(input);

        if (userNum > gameData.maxNumber || userNum < gameData.minNumber || isNaN(userNum)) {
            logger(`Wrong number. number is from ${gameData.minNumber} ot ${gameData.maxNumber}\n`)
            question(logger)
        }

        logger(`Your num is ${userNum}\n`);

        gameData.counter++;


        if (userNum < gameData.random) {
            logger('more\n')
        } else {
            logger('less\n')
        }

        if (userNum === gameData.random) {
            logger('Your right! Gongrats, mate, gj\n')
            logger(`Your count of tries is: ${gameData.counter}\n`)
            rl.close();
            return;
        }

        rl.pause();
        question(logger)
    });
}

function logsFile ( path ) {
    if (path) {
        fs.writeFileSync(path, "", "utf-8" );
    }

    return function out(string) {
        if (path) {
            fs.appendFile(path, string, "utf-8", (err) => {
                if (err) {
                    console.log("File error\n");
                }
            })
        }
        console.log(string);
    }
}

function main () {
    let logger = logsFile("./logs")
    question(logger);
}

main();