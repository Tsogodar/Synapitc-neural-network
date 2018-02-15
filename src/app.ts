// import bibilioteki synaptic
import * as synaptic from 'synaptic'
//deklarackja zmiennych
let perceptron: object;
let trainingSet: object[];
let trainer: object;
let options:object;
// obiekt przechowujący opcję treningowe
options = {
    rate: .01,
    iterations: 100000,
    error: .001,
    cost: synaptic.Trainer.cost.MSE,
    schedule: {
        every: 1,
        do: (data) => {
            if (data.error < .001) {
                console.log(`Uczenie zakończone w ${data.iterations} powtórzeniach`);
                return true;
            }
        }
    }
};
// oznaczenia symboli
// k   p   n
// 1   0   0
// 0   1   0
// 0   0   1
// treningowy zestaw danych
trainingSet = [
    //kamień-papier
    {
        input: [1, 0, 0, 0, 1, 0],
        output: [0, 1, 0]
    },
    //papier-kamień
    {
        input: [0, 1, 0, 1, 0, 0],
        output: [0, 1, 0]
    },
    //kamień-nożyce
    {
        input: [1, 0, 0, 0, 0, 1],
        output: [1, 0, 0]
    },
    //nożyce-kamień
    {
        input: [0, 0, 1, 1, 0, 0],
        output: [1, 0, 0]
    },
    //papier-nożyce
    {
        input: [0, 1, 0, 0, 0, 1],
        output: [0, 0, 1]
    },
    //nożyce-papier
    {
        input: [0, 0, 1, 0, 1, 0],
        output: [0, 0, 1]
    }
];
// inicjalizacja perceptronu z wykorzystaniem architekta
perceptron = new synaptic.Architect.Perceptron(6, 3, 3);
// inicjalizacja nauki perceptronu
trainer = new synaptic.Trainer(perceptron).train(trainingSet, options);
//podanie  danych testowych i wyświetlenie winików
console.log(`Nożyce vs kamień [1,0,0]\nWynik sieci: ${perceptron['activate']([0, 0, 1, 1, 0, 0])}`);
console.log(`Papier vs kamień [0,1,0]\nWynik sieci: ${perceptron['activate']([0, 1, 0, 1, 0, 0])}`);
console.log(`Papier vs nożyce [0,0,1]\nWynik sieci: ${perceptron['activate']([0, 0, 1, 0, 1, 0])}`);
