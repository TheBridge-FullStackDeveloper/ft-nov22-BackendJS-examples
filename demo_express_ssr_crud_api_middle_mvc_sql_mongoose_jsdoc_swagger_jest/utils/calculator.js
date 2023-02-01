const calculator = {
    add: (a, b) => {

        if (a !== undefined && b !== undefined) {
            if (typeof a === "number" && typeof b === "number") {
                return a + b;
            }
            else {
                return NaN;
            }
        }
        return null;
    },
    sub: (a, b) => a - b,
    div: (a, b) => {
        if (a !== undefined && b !== undefined) {
            return a / b;
        }else{
            return null;
        }
    }
    ,
    mul: (a, b) => a * b
}

module.exports = calculator;

// console.log(calculator.add(2,2))
// console.log(calculator.sub(1,2))
// console.log(calculator.div(4,2))