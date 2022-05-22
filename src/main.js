"use strict";
// Exports
export * from "./preprocessor/preprocessor.js";

/*
// Test main process function (dev only)
import * as preprocess from "./preprocessor/preprocessor.js";
import * as fs from "fs";

preprocess.process(fs.readFileSync("./test/assets/1.js").toString().split("\n"), { macros: [["hella", "hello"], ["Hoi", "Hi"]], verbose: true }, (error, output) => {
    if (error) {
        console.error(error);
    }
    else {
        console.log("Output:", output);
    }
});
*/
