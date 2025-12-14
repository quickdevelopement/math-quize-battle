import shuffle from "./shuffle";


const generateQuestion = (level) => {

    const ops = ['+', '-', '*'];

    const max = 5 + level * 2;
    const a = Math.floor(Math.random() * max) + 1;
    const b = Math.floor(Math.random() * max) + 1;
    const op = ops[Math.min(ops.length -1, Math.floor(level /3))];

    let questionText = `${a} ${op} ${b}`;

    const correct = op == "+" ? a + b :
                    op == "-" ? a - b :
                    a * b;
    const options = new Set([correct]);

    while(options.size < 4) options.add(correct + Math.floor(Math.random() * 6) - 3);

    return {
        questionText,
        correct,
        options: shuffle(Array.from(options))
    }
};


export default generateQuestion;