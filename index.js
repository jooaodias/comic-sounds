#!/usr/bin/env node
const exect = require('child_process').exec;
const path = require('path');
const fs = require('fs');
var colors = require('colors');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});;

const R = require('ramda');

const mainPath = path.dirname(fs.realpathSync(__filename));

const sound = function (option) {
    const optionSelected = { patrik: 'patrik', ze: "zedamanga" }
    const soundPath = path.join(mainPath, `./${optionSelected[option]}`);
    const linuxcmd = R.join('', ['paplay ', soundPath, '.ogg']);
    const windowscmd = R.join('', [path.join(mainPath, './forWindows.vbs'), ' ', soundPath, '.mp3']);
    const maccmd = R.join('', ['afplay ', soundPath, '.mp3']);

    const platform = process.platform;

    R.cond([
        [R.equals('linux'), exec(linuxcmd)],
        [R.equals('win32'), exec(windowscmd)],
        [R.equals('darwin'), exec(maccmd)],
    ], platform)

    function exec(cmd) {
        return exect(cmd, function (error) {
            R.ifElse(
                R.empty,
                () => console.log('VAMO DALE!'),
                (error) => console.error(error),
                error)
        });
    }

}

const chooseAudio = function () {
    console.log(colors.green("Escolha uma opção:"));
    console.log(colors.green("- Áudio 1"));
    console.log(colors.green("- Áudio 2"));
    console.log(colors.green("- Áudio 3"));

    readline.question('Digite o número da opção desejada: ', (escolha) => {
        escolha = parseInt(escolha);
        switch (escolha) {
            case 1:
                sound('patrik');
                break;
            case 2:
                sound('ze');
                break;
            case 3:
                sound();
                break;
            default:
                console.log("Opção inválida. Por favor, escolha uma opção de 1 a 3.");
        }
        readline.close();
    });
}

module.exports = chooseAudio;

if (!module.parent) {
    chooseAudio();
}