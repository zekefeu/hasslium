# hasslium: A TS/JS preprocessor based on C's

This project is still in development, but is ready to be used in real projects. Feel free to check it out !

The documentation is under construction, but should be informative enough for now.

## Why ?

This preprocessor is mostly useful for:
 - Front-end apps
 - Commercial apps
 - Demo products

It allows you to include or exclude certain regions of your code (development & debug statements, etc), and to define macros to replace constants you would use all over your project.

It is built around of the C preprocessor's syntax to be easy to understand and to provide a steep learning curve.

## Installation

`$ npm install -D @fuka-g/hasslium`

## Usage

For now, no CLI support has been added yet. The only way to run it is through a js script file.

```ts
// hasslim.process(input: string[], options: processOptions, callback: (error: string, output: string[]))

import * as hasslium from "@fuka-g/hasslium";
import * as fs from "fs";

hasslium.process(fs.readFileSync("yourFilePath.js").toString().split("\n"), {}, (error, output) => {
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
 - Typed

## GCC's features

[See the original preprocessor's features.](https://gcc.gnu.org/onlinedocs/cpp/index.html)

## Syntax

All directives must start with `//#` .

 - Example: `//# define MACRO token`

You can either use `//# directive` or `//#directive` .

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