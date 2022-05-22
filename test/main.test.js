import * as hasslium from "../src/main.js";
import * as fs from "fs";

describe("Preprocessor testing", () => {
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

	test("Logging", () => {
		hasslium.process(
			fs.readFileSync("./test/assets/logging.js").toString().split("\n"),	// Source
			{ macros: [], verbose: false }, 									// Options
			(error, output) => {												// Callback
				expect(error).toBeNull();
				expect(output).toEqual(fs.readFileSync("./test/assets/logging_result.js").toString().split("\n"));
			}
		);
	});
});
