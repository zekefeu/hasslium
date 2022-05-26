# hasslium: A TS/JS preprocessor based on C's

**This project is still in development, but it's ready to be used in real projects.** Feel free to check it out, feedback is appreciated !

The documentation is under construction, but should be informative enough for now.

**A boilerplate is available to see how to use it ->** [fuka-g/hasslium-boilerplate](https://www.github.com/fuka-g/hasslium-boilerplate)

## Why ?

This preprocessor is mostly useful for:
 - Front-end apps
 - Commercial apps
 - Products you want to make a demo version of

It allows you to include or exclude certain regions of your code (development & debug statements, etc), and to define macros to replace constants you would use all over your project.

It is built around of the C preprocessor's features and syntax to be easy to understand and to provide a steep learning curve.

## Installation

`$ npm install -D hasslium`

## Usage

For now, no CLI support has been added yet. The only way to run it is through a js script file.

The main function takes an array of strings as the input, an `options` object, and a callback

The options object takes a `macros` array (see examples below) to define macros before processing your file.

You can turn the verbose mode on for debugging purposes, even though the messages are pretty cryptic for now.

```ts
export interface processOptions {
	macros?: macroType[],
	verbose?: boolean
}
```

Here's an example:

```ts
import * as hasslium from "hasslium";
import * as fs from "fs";

const inputArray: string[] = fs.readFileSync("yourFilePath.js").toString().split("\n");

// hasslium.process(input: string[], options: processOptions, callback: (error: string, output: string[]))
hasslium.process(inputArray, { macros: [["ENV", "dev"], ["TEST_MACRO", "value"]], verbose: false }, (error, output) => {
	if (error) {
		console.error(error);
	} else {
		console.log("Output:", output);
	}
});
```

## Features

 - Almost all of the C preprocessor's directives
 - Fast
 - Tested & typed

## GCC's features

[See the original preprocessor's features.](https://gcc.gnu.org/onlinedocs/cpp/index.html)

## Syntax

All directives must start with `//#` .

 - Example: `//# define MACRO token`

You can either use `//# directive` or `//#directive`.

## Directives

### Defining macros

```ts
//# define macro token

//# undef macro
```

### Conditions

Conditional

```ts
//# if macro condition

//# elif macro condition

//# else

//# endif
```

If a macro is defined / undefined

```ts
//# ifdef macro

//# ifndef macro
```

### Diagnostics

```ts
//# warning message

//# error message
```

## Known bugs

😀

## Contributing

Contributions are welcome !