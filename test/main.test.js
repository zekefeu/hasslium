import * as hasslium from "../src/main.js";
import * as fs from "fs";

describe("Defining macros", () => {
	test("Defining macros", () => {
		hasslium.process(
			fs.readFileSync("./test/assets/define.js").toString().split("\n"),	// Source
			{ macros: [["EXTRA_PLANET", "Pluto"]], verbose: false },			// Options
			(error, output) => {												// Callback
				expect(error).toBeNull();
				expect(output).toEqual(fs.readFileSync("./test/assets/define_result.js").toString().split("\n"));
			}
		);
	});
});

describe("Conditions", () => {
	test("Conditions", () => {
		hasslium.process(
			fs.readFileSync("./test/assets/conditions.js").toString().split("\n"),	// Source
			{ macros: [], verbose: false }, 										// Options
			(error, output) => {													// Callback
				expect(error).toBeNull();
				expect(output).toEqual(fs.readFileSync("./test/assets/conditions_result.js").toString().split("\n"));
			}
		);
	});
});

describe("Logging", () => {
	console.log = () => {};
	test("Logging", () => {
		hasslium.process(
			fs.readFileSync("./test/assets/logging.js").toString().split("\n"),	// Source
			{ macros: [], verbose: true }, 									// Options
			(error, output) => {												// Callback
				expect(error).toBeNull();
				expect(output).toEqual(fs.readFileSync("./test/assets/logging_result.js").toString().split("\n"));
			}
		);
	});
});

describe("Miscellaneous", () => {
	console.log = () => { };
	console.error = () => {};
	test("Miscellaneous", () => {
		hasslium.process(
			fs.readFileSync("./test/assets/misc.js").toString().split("\n"),	// Source
			{ macros: [["TEST", "true"], [""]], verbose: true }, 				// Options
			(error, output) => {												// Callback
				expect(error).toBeNull();
				expect(output).toEqual(fs.readFileSync("./test/assets/misc_result.js").toString().split("\n"));
			}
		);
	});
});

describe("Miscellaneous (no verbose)", () => {
	console.log = () => { };
	console.error = () => {};
	test("Miscellaneous", () => {
		hasslium.process(
			fs.readFileSync("./test/assets/misc_no_verbose.js").toString().split("\n"),	// Source
			{ macros: [], verbose: false }, 											// Options
			(error, output) => {														// Callback
				expect(error).toBeNull();
				expect(output).toEqual(fs.readFileSync("./test/assets/misc_no_verbose_result.js").toString().split("\n"));
			}
		);
	});
});

describe("Miscellaneous (error test)", () => {
	console.log = () => { };
	console.error = () => {};
	test("Miscellaneous (error test)", () => {
		hasslium.process(
			fs.readFileSync("./test/assets/misc_error.js").toString().split("\n"),	// Source
			{ macros: [], verbose: false }, 										// Options
			(error, output) => {													// Callback
				console.error(error, output);
			}
		);
	});
});