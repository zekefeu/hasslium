// Tests mostly for code coverage

//# undef

//# define
//# define A
//# define U 1

//# if U = 1
//# warning help im losing my mind
//# endif

//# undef B

console.log("Hi");

//# if AAA = 100
console.log("nope");
//# elif 
console.log("nope");
//# warning hi
//# endif

//# warning

//# undef A
//# lol
//# if A
//# else
//# ifndef

