const ProblemSet = require('./library/ProblemSet');

class ProblemA {
    constructor(lines, i){
        this.N = parseInt(lines[i]);
        this.numbers = lines[i + 1].split(' ').map(e => parseInt(e));
        this.nextLine = i + 2;
    }

    solve(){
        this.numbers.sort((a,b) => a - b);
        let map = new Object();

        const numZeroes = this.numbers.lastIndexOf(0) + 1;
        const numNonZeroes = this.N - numZeroes;
        let total = numNonZeroes * numZeroes * (numZeroes - 1) / 2;

        for(let i = this.N - 1; i > 0; --i){
            for(let j = i - 1; j >= 0; --j){
                const string = (this.numbers[i] * this.numbers[j]).toString();
                if(map.hasOwnProperty(string)){
                    total += map[string];
                }
            }
            const string = this.numbers[i].toString();
            if(map.hasOwnProperty(string)){
                map[string] += 1;
            }
            else{
                map[string] = 1;
            }
        }
        return total;
    }
}

new ProblemSet(ProblemA, 'A-large-practice.in')
    .parse()
    .solve();