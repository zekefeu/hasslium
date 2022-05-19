"use strict";

export type macroType = [
	macro: string,
	token: string
]

export interface processOptions {
	macros?: macroType[],
	verbose?: boolean
}

export function processOne(input: string[], options: processOptions, callback: (error: string, output: string[]) => void) {

	// Arguments validation & parsing
	const verbose = options.verbose;

	// if (input.length === 0) callback("The input is empty.", null);
	// if (!options) callback("No options provided", null);
	
	if (verbose) {
		console.log("Verbose mode: ", verbose);
		console.log("\nRaw options:", options);
	
		console.log("\nDefined macros: ");
		
		options.macros.forEach(macro => {
			console.log(`- ${macro[0]}: ${macro[1]}`);
			
		});

		console.log("\nInput:", input);
	}


	callback(null, input);

}