export function evalExpression(expression, activeMacros) {
    const expressionArray = expression.split(" ");
    // if the format is invalid, return null
    if (expressionArray.length < 3)
        return null;
    // === Left hand evalutaion
    let leftHandOpEval = null;
    // Walk through the macros and attribute the left hand operator it's corresponding value
    activeMacros.forEach(macro => {
        if (macro[0] == expressionArray[0])
            leftHandOpEval = macro[1];
    });
    // If it's not a valid macro, use it's actual value instead
    if (leftHandOpEval === null)
        leftHandOpEval = expressionArray[0];
    // === Right hand evaluation
    let rightHandOpEval = null;
    // Walk through the macros and attribute the right hand operator it's corresponding value
    activeMacros.forEach(macro => {
        if (macro[0] == expressionArray[2])
            rightHandOpEval = macro[1];
    });
    // If it's not a valid macro, use it's actual value instead
    if (rightHandOpEval === null)
        rightHandOpEval = expressionArray[2];
    // === Operator evaluation
    let operatorEval = null;
    // Validates the operator's type
    if (expressionArray[1] === "=" ||
        expressionArray[1] === "!=" ||
        expressionArray[1] === "<" ||
        expressionArray[1] === "<=" ||
        expressionArray[1] === ">=" ||
        expressionArray[1] === ">") {
        operatorEval = expressionArray[1];
    }
    else {
        // If it's not recognized, return null
        return null;
    }
    if (operatorEval === "=")
        return leftHandOpEval == rightHandOpEval;
    else if (operatorEval === "!=")
        return leftHandOpEval != rightHandOpEval;
    else if (operatorEval === "<")
        return leftHandOpEval < rightHandOpEval;
    else if (operatorEval === "<=")
        return leftHandOpEval <= rightHandOpEval;
    else if (operatorEval === ">=")
        return leftHandOpEval >= rightHandOpEval;
    else if (operatorEval === ">")
        return leftHandOpEval > rightHandOpEval;
}
