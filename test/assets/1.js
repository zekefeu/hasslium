//# define TEST "Hello World !"

//# define ERROR_TEST

//#define LOLLMAO 10

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

//# if LOLLMAO = 10
console.log("lollmao === 3");
//# else
console.log("nope.");
//# endif

hello();

///# warning hello world !
///# error