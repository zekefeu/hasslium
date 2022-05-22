//# define TEST "Hello World !"

//# define ERROR_TEST

//#define

//#undef

// eslint-disable-next-line no-undef
console.log(TEST);
//#undef TEST

function hello() {
	console.log("world");
	//# ifdef ERROR_TEST
	console.log("lol");
	//# endif

}

hello();

//# warning hello world !
///# error