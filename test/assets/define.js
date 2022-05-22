/**
 * This test checks the preprocessor's ability to define, use and undefine macros.
 * 
 */
//# define DEFINE_1 "Hello world!"

//# define BOOL_TRUE true
//# define BOOL_FALSE false

//# define TEST_NUMBER 9

//#define SYSTEM_NAME Solar System

//# define PLANET_1 Mercury
//#define PLANET_2 Venus
//# define PLANET_3 The Earth
//#  define PLANET_4 Mars
//#   define PLANET_5 Jupiter
//#  define PLANET_6 Saturn
//# 	define PLANET_7 Uranus
//#							define PLANET_8 "Neptune"

// The EXTRA_PLANET macro is passed as an extra macro.

console.log(DEFINE_1);

if (BOOL_TRUE !== BOOL_FALSE) {
	console.log("There are TEST_NUMBER planets in the SYSTEM_NAME, including the dwarf planet EXTRA_PLANET.");
	console.log("There are PLANET_1, PLANET_2, PLANET_3, PLANET_4, PLANET_5, PLANET_6, PLANET_7, " + PLANET_8 + "and EXTRA_PLANET.");
}

//# define TEST_UNDEF ok

// This should be equal to ok
console.log("TEST_UNDEF");

//# undef TEST_UNDEF

// This should not be equal to ok
console.log("TEST_UNDEF");