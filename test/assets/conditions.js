// This test checks the preprocesseor's ability to do logic, comparisons
// And to include or exclude specific snippets of code

//# define FIFTY_SIX 56
//# define FOURTY_TWO 42

// Shouldn't do anything
//# if FOURTY_TWO >>>>> FIFTY_SIX

//# if
//# if 1
//# if 1 =

//# if 5 != 5
console.log("nope");
//# endif

//# if FIFTY_SIX > FOURTY_TWO
console.log("1");
//# else
console.log("nope");
//# endif

//# if FIFTY_SIX = FOURTY_TWO
console.log("nope");
//# elif FIFTY_SIX < FOURTY_TWO
console.log("nope");
//# else
console.log("2");
//# endif

//# ifdef FIFTY_SIX
console.log("3");
//# endif

//# ifndef FOURTY_TWO
console.log("nope");
//# endif

//# if FIFTY_SIX >= FOURTY_TWO
console.log("4");
//# elif FOURTY_TWO = FOURTY_TWO
console.log("nope");
//# elif FOURTY_TWO = FOURTY_TWO
console.log("nope");
//# endif

//# if FIFTY_SIX <= FOURTY_TWO
console.log("nope");
//# elif FOURTY_TWO != FOURTY_TWO
console.log("nope");
//# elif FOURTY_TWO != FOURTY_TWO
console.log("nope");
//# elif FIFTY_SIX >= FOURTY_TWO
console.log("5");
//# endif