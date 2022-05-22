# hasslium: A TS/JS preprocessor based on C's

This project is in early development, but feel free to check it out !

The documentation is under construction, but should be informative enough for now.

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

### TODO
 - for now, everything except directive parsing
 - CLI usage
 - "object-like macros" - defines / undef
 - conditions (if else elif endif etc)
 - include ? useful ?
 - log, error
 - TESTING
 - function macros
 - nesting macros handling
 - ifdef, ifndef

## GCC's features

[See the original preprocessor's features.](https://gcc.gnu.org/onlinedocs/cpp/index.html)

🔴 - Unimplemented

🟠 - Working prototype (not tested yet)

🟢 - Fully implemented

🟣 - Won't implement (Irrelevant in JS / obsolete / ...)

```
🟣 #assert:	 	Obsolete Features
🟠 #define:	 	Object-like Macros
🟠 #elif:	 	Elif
🟠 #else:	 	Else
🟠 #endif:	 	Ifdef
🟠 #error:	 	Diagnostics
🟣 #ident:	 	Other Directives
🟠 #if:	 	Conditional Syntax
🟠 #ifdef:	 	Ifdef
🟠 #ifndef:	 	Ifdef
🟣 #import:	 	Alternatives to Wrapper #ifndef
🟣 #include:	 	Include Syntax
🟣 #include_next:	 	Wrapper Headers
🟣 #line:	 	Line Control
🟣 #pragma GCC dependency:	 	Pragmas
🟣 #pragma GCC error:	 	Pragmas
🟣 #pragma GCC poison:	 	Pragmas
🟣 #pragma GCC system_header:	 	System Headers
🟣 #pragma GCC system_header:	 	Pragmas
🟣 #pragma GCC warning:	 	Pragmas
🟣 #pragma once:	 	Pragmas
🟣 #sccs:	 	Other Directives
🟣 #unassert:	 	Obsolete Features
🟠 #undef:	 	Undefining and Redefining Macros
🟠 #warning:	 	Diagnostics
```

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