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