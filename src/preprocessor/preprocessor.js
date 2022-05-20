"use strict";
/**
 * @deprecated use hasslium.process() instead
 */
export function processOne(input, options, callback) {
    console.error(new Error("DeprecationWarning: hasslium.processOne() is deprecated. Use hasslium.process() instead."));
    process(input, options, callback);
}
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
        options.macros.forEach(macro => {
            console.log(`v-013 │ - ${macro[0]}: ${macro[1]}`);
        });
        console.log("\nv-004 │ Input:", input);
    }
    // Initialization
    // eslint-disable-next-line prefer-const
    let activeMacros = [];
    // eslint-disable-next-line prefer-const
    let outputFile = [];
    if (options.macros.length > 0) {
        options.macros.forEach(macro => {
            if (macro[0] && macro[1]) {
                activeMacros.push(macro);
            }
            else {
                console.log("Error parsing provided macro:", macro);
            }
        });
    }
    if (verbose)
        console.log("\nv-005 │ === Preprocessing ===\n");
    // Loop through each given line
    input.forEach(line => {
        if (verbose)
            console.log("v-006 ├─➤", line);
        // Line without indentation
        const trimmedLine = line.trim();
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
                directiveArray.join(" ") // arguments: put the array back together
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
                        argumentsArray.join(" ") // value
                    ];
                    if (macro[0] && macro[1]) {
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
                        activeMacros = activeMacros.filter((macro) => { return macro[0] !== argumentsArray[0]; });
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
                    break;
                }
                case "elif": {
                    if (verbose)
                        console.log("v-023 │ Directive: elif");
                    break;
                }
                case "endif": {
                    if (verbose)
                        console.log("v-024 │ Directive: endif");
                    break;
                }
                case "else": {
                    if (verbose)
                        console.log("v-025 │ Directive: else");
                    break;
                }
                case "ifdef": {
                    if (verbose)
                        console.log("v-011 │ Directive: ifdef");
                    break;
                }
                case "ifndef": {
                    if (verbose)
                        console.log("v-026 │ Directive: ifndef");
                    break;
                }
                case "warning": {
                    if (verbose)
                        console.log("v-021 │ Directive: warning");
                    let message = currentDirective[1];
                    // If no warning is specified, return a generic message
                    if (!message)
                        message = "Unknown error.";
                    // Log to stderr and callback
                    console.error("Warning: " + message);
                    break;
                }
                case "error": {
                    if (verbose)
                        console.log("v-022 │ Directive: error");
                    let message = currentDirective[1];
                    // If no error is specified, return a generic message
                    if (!message)
                        message = "Unknown error.";
                    // Log to stderr and callback
                    console.error("Error: " + message);
                    callback("Error: " + message, null);
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
            // Apply macro filters, etc
        }
    });
    if (verbose) {
        const endTime = new Date();
        const timeTook = endTime.getTime() - startTime.getTime();
        console.log("\nv-017 │ === Preprocessing took " + timeTook + " ms ===\n");
    }
    callback(null, outputFile);
}
