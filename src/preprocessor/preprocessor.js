"use strict";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { version } from "node:process";
import { fileURLToPath } from "node:url";
import { evalExpression } from "./eval.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const nodeVersion = version.substring(1, version.length);
const packageJson = JSON.parse(fs.readFileSync(__dirname + "/../../package.json").toString());
/**
 * The library's main function. Takes an array of strings and processes it with the given options.
 * @param input The input array
 * @param options See above
 * @param callback Callback with error and output
 * @returns error: null if successful, string message if not
 * @returns output: array of strings if successful, null if not
 *
 * TODO: rewrite doc
 */
export function process(input, options, callback) {
    // Arguments validation & parsing
    const verbose = options.verbose;
    const startTime = new Date();
    // if (input.length === 0) callback("The input is empty.", null);
    // if (!options) callback("No options provided", null);
    if (verbose) {
        console.log("v-001 │ Verbose mode:", verbose);
        console.log("\nv-002 │ Raw options:", options);
        console.log("\nv-003 │ Defined macros:");
        options.macros.forEach((macro) => {
            console.log(`v-013 │ - ${macro[0]}: ${macro[1]}`);
        });
        console.log("\nv-004 │ Input:", input);
    }
    // Initialization
    // eslint-disable-next-line prefer-const
    let activeMacros = [];
    // eslint-disable-next-line prefer-const
    let outputArray = [];
    // eslint-disable-next-line prefer-const
    let conditionalStack = [];
    // eslint-disable-next-line prefer-const
    let executedStack = [];
    if (options.macros.length > 0) {
        options.macros.forEach((macro) => {
            if (macro[0] && macro[1]) {
                activeMacros.push(macro);
            }
            else {
                if (verbose)
                    console.log("v-036 │ Error parsing provided macro:", macro);
            }
        });
    }
    const buildTime = new Date().getTime().toString();
    activeMacros.push(["__ORIGIN_PLATFORM__", os.platform()]);
    activeMacros.push(["__ORIGIN_BUILD_TIME__", buildTime]);
    activeMacros.push(["__ORIGIN_NODE_VERSION__", nodeVersion]);
    activeMacros.push(["__HASSLIUM_VERSION__", packageJson.version]);
    if (verbose) {
        console.log("\nv-041 │ __ORIGIN_PLATFORM__", os.platform());
        console.log("v-042 │ __ORIGIN_BUILD_TIME__", buildTime);
        console.log("v-043 │ __ORIGIN_NODE_VERSION__", nodeVersion);
        console.log("v-044 │ __ORIGIN_HASSLIUM_VERSION__", packageJson.version);
        console.log("\nv-005 │ === Preprocessing ===\n");
    }
    // Loop through each given line
    input.forEach((line) => {
        // Line without indentation
        const trimmedLine = line.trim();
        if (verbose)
            console.log("v-006 ├─➤", trimmedLine);
        if (trimmedLine.startsWith("//#")) {
            // Directive processing & tokenization
            // Get the directive without '//#'
            const fullDirective = trimmedLine.substring(3, trimmedLine.length).trim();
            /**
             * Types of directives
             *
             * -> define
             * directive macro token
             *
             * -> undef, ifdef, ifndef, else, endif
             * directive macro
             *
             * -> if, elif
             * directive expression
             *
             * -> error, warning
             * directive message
             */
            // Make an array out of the directive
            const directiveArray = fullDirective.split(" ");
            // Create an array containing our directive and arguments
            // Note to self: currentDirective is an array (tuple ?), not an object
            const currentDirective = [
                directiveArray.shift(),
                directiveArray.join(" "), // arguments: put the array back together
            ];
            if (verbose)
                console.log("v-007 │ Parsed directive:", currentDirective);
            switch (currentDirective[0]) {
                case "define": {
                    if (verbose)
                        console.log("v-008 │ Directive: define");
                    const argumentsArray = currentDirective[1].split(" ");
                    // Defining the macro we want to add
                    const macro = [
                        argumentsArray.shift(),
                        argumentsArray.join(" "), // value
                    ];
                    if (macro[0]) {
                        if (!macro[1])
                            macro[1] = "true";
                        activeMacros.push(macro);
                        if (verbose)
                            console.log("v-016 │ New macros list:", activeMacros);
                    }
                    else {
                        if (verbose)
                            console.log("v-015 │ Unknown macro definition:", macro);
                    }
                    break;
                }
                case "undef": {
                    if (verbose)
                        console.log("v-009 │ Directive: undef");
                    // Argument array (first value contains the macro we want to remove, we don't care about the rest)
                    const argumentsArray = currentDirective[1].split(" ");
                    if (argumentsArray[0]) {
                        // Filtering the macros by their key
                        activeMacros = activeMacros.filter((macro) => {
                            return macro[0] !== argumentsArray[0];
                        });
                        if (verbose) {
                            console.log("v-018 │ Removing macro:", argumentsArray[0]);
                            console.log("v-019 │ New macros list:", activeMacros);
                        }
                    }
                    else {
                        if (verbose)
                            console.log("v-020 │ Unknown macro:", argumentsArray);
                    }
                    break;
                }
                case "if": {
                    if (verbose)
                        console.log("v-010 │ Directive: if");
                    const evalResult = evalExpression(currentDirective[1], activeMacros);
                    if (verbose)
                        console.log("v-032 │ Evaluation result:", evalResult);
                    if (evalResult !== null) {
                        conditionalStack.push(evalResult);
                        executedStack.push(evalResult);
                    }
                    else if (verbose)
                        console.log("v-031 │ Expression is invalid");
                    break;
                }
                case "elif": {
                    if (verbose)
                        console.log("v-023 │ Directive: elif");
                    if (executedStack[executedStack.length - 1])
                        conditionalStack[conditionalStack.length - 1] = false;
                    if (conditionalStack.length > 0 &&
                        conditionalStack[conditionalStack.length - 1] === false) {
                        const evalResult = evalExpression(currentDirective[1], activeMacros);
                        if (verbose)
                            console.log("v-034 │ Evaluation result:", evalResult);
                        if (evalResult !== null) {
                            if (!executedStack[executedStack.length - 1]) {
                                conditionalStack[conditionalStack.length - 1] = evalResult;
                            }
                            if (evalResult)
                                executedStack[executedStack.length - 1] = true;
                        }
                        else if (verbose)
                            console.log("v-035 │ Expression is invalid");
                    }
                    break;
                }
                case "endif": {
                    if (verbose)
                        console.log("v-024 │ Directive: endif");
                    conditionalStack.pop();
                    executedStack.pop();
                    break;
                }
                case "else": {
                    if (verbose)
                        console.log("v-025 │ Directive: else");
                    if (conditionalStack.length > 0) {
                        if (conditionalStack[conditionalStack.length - 1] === false &&
                            executedStack[executedStack.length - 1] === false) {
                            conditionalStack[conditionalStack.length - 1] = true;
                        }
                        else
                            conditionalStack[conditionalStack.length - 1] = false;
                    }
                    break;
                }
                case "ifdef": {
                    if (verbose)
                        console.log("v-011 │ Directive: ifdef");
                    // Go through all the macros and check if the macro we're looking for is defined
                    // and push it to the conditional stack
                    const filterResult = !!activeMacros.filter((macro) => {
                        return macro[0] == currentDirective[1];
                    }).length;
                    conditionalStack.push(filterResult);
                    executedStack.push(filterResult);
                    break;
                }
                case "ifndef": {
                    if (verbose)
                        console.log("v-026 │ Directive: ifndef");
                    // Go through all the macros and check if the macro we're looking for is not defined
                    // and push it to the conditional stack
                    const filterResult = !activeMacros.filter((macro) => {
                        return macro[0] == currentDirective[1];
                    }).length;
                    conditionalStack.push(filterResult);
                    executedStack.push(filterResult);
                    break;
                }
                case "warning": {
                    if (verbose)
                        console.log("v-021 │ Directive: warning");
                    let print = true;
                    if (conditionalStack.length > 0) {
                        if (verbose)
                            console.log("v-037 │ Conditional stack:", conditionalStack);
                        conditionalStack.forEach((condition) => {
                            if (!condition)
                                print = false;
                        });
                    }
                    if (print) {
                        let message = currentDirective[1];
                        // If no warning is specified, return a generic message
                        if (!message)
                            message = "Unknown error.";
                        // Log to stderr
                        console.error("Warning: " + message);
                    }
                    break;
                }
                case "error": {
                    if (verbose)
                        console.log("v-022 │ Directive: error");
                    let print = true;
                    if (conditionalStack.length > 0) {
                        if (verbose)
                            console.log("v-039 │ Conditional stack:", conditionalStack);
                        conditionalStack.forEach((condition) => {
                            if (!condition)
                                print = false;
                        });
                    }
                    if (print) {
                        let message = currentDirective[1];
                        // If no error is specified, return a generic message
                        if (!message)
                            message = "Unknown error.";
                        // Log to stderr and callback
                        console.error("Error: " + message);
                        callback("Error: " + message, null);
                    }
                    break;
                }
                default: {
                    // Just ignore it and move on
                    if (verbose)
                        console.log("v-012 │ Unknown directive.");
                    break;
                }
            }
        }
        else {
            // Line is not a macro
            // Apply the conditional filter
            // The conditional directives (if, elif, else etc)
            // Are represented by a lifo stack array
            let print = true;
            if (conditionalStack.length > 0) {
                if (verbose)
                    console.log("v-028 │ Conditional stack:", conditionalStack);
                conditionalStack.forEach((condition) => {
                    if (!condition)
                        print = false;
                    if (verbose)
                        console.log("v-030 │ Eval:", condition);
                });
            }
            // Outputs the processed line
            if (print) {
                // Apply macros
                activeMacros.forEach((macro) => {
                    line = line.replaceAll(macro[0], macro[1]);
                });
                // Prevents empty lines and comment lines from getting pushed to the output array
                // Does NOT work on multi-line comments and comments at the end of lines
                if (line && !line.trim().startsWith("//")) {
                    if (verbose)
                        console.log("v-029 │ Pushing", line);
                    // Push the line to the array that is going to be returned
                    outputArray.push(line);
                }
            }
        }
    });
    if (verbose) {
        if (conditionalStack.length > 0)
            console.log("v-033 │ Conditional stack not empty at the end of input.");
        const endTime = new Date();
        const timeTook = endTime.getTime() - startTime.getTime();
        console.log("\nv-017 │ === Preprocessing took " + timeTook + " ms ===\n");
    }
    else {
        if (conditionalStack.length > 0)
            console.warn("Warning: Conditional stack not empty at the end of input.");
    }
    callback(null, outputArray);
}
