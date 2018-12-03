const fs = require('fs');

module.exports = class ProblemSet {

    constructor(Problem, input, output = 'solutions.out'){
        this.problems = []
        this.solutions = [];
        this.Problem = Problem;
        this.input = input;
        this.output = output;
    }

    parse(){
        const lines = fs.readFileSync(this.input, {encoding: 'UTF-8'}).split('\n');
        const testCaseCount = parseInt(lines[0]);
        let currentLine = 1;
        for(let i = 0; i < testCaseCount; ++i){
            const problem = new this.Problem(lines, currentLine);
            this.problems.push(problem);
            currentLine = problem.nextLine;
        }
        return this;
    }
    
    solve(){
        this.problems.forEach(p => {
            this.solutions.push(p.solve());
        });

        const solutionString = this.solutions.map((s,i) => `Case #${i + 1}: ${s}`).join('\n');
        fs.writeFileSync(this.output, solutionString);
    }

}