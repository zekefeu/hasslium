# hasslium

Bringing GNU GCC's preprocessor's features to JS/TS.

## Features

### TODO

 - CLI usage
 - "object-like macros" - defines / undef
 - conditions (if else elif endif etc)
 - include ? useful ?
 - log, error
 - TESTING
 - function macros
 - nesting macros handling
 - ifdef, ifndef

 
```
foo = X;
#define X 4
bar = X;

produces

foo = X;
bar = 4;

```

## Directives

### Defining macros

```
//# define macro token

//# undef macro

//# define
```

### Conditions

```
//# if macro (condition)

//# else

//# elif macro (condition)

//# endif
```

### Diagnositcs

```
//# log message

//# error message

```

## GCC's features

[See the original preprocessor's features.](https://gcc.gnu.org/onlinedocs/cpp/index.html)

```
#assert:	 	Obsolete Features
#define:	 	Object-like Macros
#elif:	 	Elif
#else:	 	Else
#endif:	 	Ifdef
#error:	 	Diagnostics
#ident:	 	Other Directives
#if:	 	Conditional Syntax
#ifdef:	 	Ifdef
#ifndef:	 	Ifdef
#import:	 	Alternatives to Wrapper #ifndef
#include:	 	Include Syntax
#include_next:	 	Wrapper Headers
#line:	 	Line Control
#pragma GCC dependency:	 	Pragmas
#pragma GCC error:	 	Pragmas
#pragma GCC poison:	 	Pragmas
#pragma GCC system_header:	 	System Headers
#pragma GCC system_header:	 	Pragmas
#pragma GCC warning:	 	Pragmas
#pragma once:	 	Pragmas
#sccs:	 	Other Directives
#unassert:	 	Obsolete Features
#undef:	 	Undefining and Redefining Macros
#warning:	 	Diagnostics
```