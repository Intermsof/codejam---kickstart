const ProblemSet = require('./library/ProblemSet');

class ProblemA {
    constructor(lines, i){
        const firstLine = lines[i].split(' ');
        this.N = parseInt(firstLine[0]);
        this.P = parseInt(firstLine[1]);
        this.strings = lines.slice(i + 1, i + 1 + this.P);
        this.nextLine = i + 1 + this.P;
    }
    
    solve(){
        this.strings.sort((a,b)=> a.length - b.length);
        let removed = new Array(this.strings.length).fill(false);
        for(let i = 0; i < this.strings.length; ++i){
            for(let j = i + 1; j < this.strings.length; ++j){
                const stringA = this.strings[i];
                const stringB = this.strings[j];
                if(stringB.startsWith(stringA)){
                    removed[j] = true;
                }
            }
        }
        let total = Math.pow(2,this.N);
        for(let i = 0; i < this.strings.length; ++i){
            if(!removed[i]){
                total -= Math.pow(2, this.N - this.strings[i].length);
            }
        }
        return total;
    }
}

class ProblemB {
    
    constructor(lines, i ){
        this.N = parseInt(lines[i]);
        this.scores = lines[i + 1].split('').map(e => parseInt(e));
        this.nextLine = i + 2;
    }

    solve(){
        let numMuralPainted = Math.floor( (this.N + 1) / 2);
        let largest = this.scores.slice(0, numMuralPainted).reduce(((a,c) => a + c));
        let value = largest;
        for(let i = numMuralPainted; i < this.N; ++i){
            value = value - this.scores[i - numMuralPainted] + this.scores[i];
            if(value > largest){
                largest = value;
            }
        }

        return largest;
    }
}

class ProblemC {
    constructor(lines, i){
        const firstLine = lines[i].split(' ');
        this.N = parseInt(firstLine[0]);
        this.M = parseInt(firstLine[1]);
        this.nextLine = i + 1;
    }

    solve(){
        const F = 2 * (this.N - this.M);
        let info = [...Array(this.M + 1)].map(e => {
            return [...Array(this.M + 1)].map(e => {
                return [...Array(F)].map(e => {
                    return new Array(2).fill(0);
                });
          });
        });

        for(let i = 0; i < this.N + 1; ++i){
            info[0][i][0] = i - 1;
            info[0][i][1] = i;
        }

        let mod = 1000000007;

        for(let i = 1; i < this.N + 1; ++i){
            info[i][0][0] = 0;
            info[i][0][1] = ((2 * i) * info[i - 1][1][0]) % mod;

            for(let j = 1; j < this.N + 1 - i; ++j){
                const placeUnpairedCount = ((2 * i) * info[i - 1][j + 1][0]) % mod;
                //calculate 0
                info[i][j][0] = placeUnpairedCount
                    + ((j - 1) * info[i][j - 1][1]) % mod;
                //calcualte 1
                info[i][j][1] = placeUnpairedCount
                    + (j * info[i][j - 1][1]) % mod;
            }
        }

        return info[this.N][0][1];
    }
}

new ProblemSet(ProblemC, 'C-small-practice.in')
    .parse()
    .solve();