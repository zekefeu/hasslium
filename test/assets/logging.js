//# define TRUE true

//# ifdef TRALSE
//# error nope
console.log("nope");
//# endif

//# ifdef TRUE
//# warning true
console.log("yes");
//# endif
