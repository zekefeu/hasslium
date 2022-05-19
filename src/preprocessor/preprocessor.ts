"use strict";

export type macroType = [
	macro: string,
	token: string
]

export interface processOptions {
	macros?: macroType[],
	verbose?: boolean
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
export function processOne(input: string[], options: processOptions, callback: (error: string, output: string[]) => void) {

	// Arguments validation & parsing
	const verbose = options.verbose;

	const startTime = new Date();

	// if (input.length === 0) callback("The input is empty.", null);
	// if (!options) callback("No options provided", null);
	
	if (verbose) {
		console.log("Verbose mode:", verbose);
		console.log("\nRaw options:", options);
	
		console.log("\nDefined macros:");
		
		options.macros.forEach(macro => {
			console.log(`- ${macro[0]}: ${macro[1]}`);
		});

		console.log("\nInput:", input);
	}

	// eslint-disable-next-line prefer-const
	let activeMacros = [];

	// eslint-disable-next-line prefer-const
	let outputFile = [];

	options.macros.forEach(macro => {
		//console.log(macro);
		activeMacros.push(macro);
	});

	if (verbose) console.log("--- Preprocessing --- ");

	input.forEach(line => {
		if (verbose) console.log(">", line);

		const trimmedLine = line.trim();
		
		if (trimmedLine.startsWith("//#")) {
			if (verbose) console.log("Line is a macro");
			
			const fullCommand = trimmedLine.substring(3, trimmedLine.length).trim();

			if (verbose) console.log("Command:", fullCommand);
			
		} else {
			// Line is not a macro
		}
	});
	
	if (verbose) {
		const endTime = new Date();
		const timeTook = endTime.getTime() - startTime.getTime();
		
		console.log("Preprocessing took " + timeTook + " ms.");
	}
	
	callback(null, outputFile);
}