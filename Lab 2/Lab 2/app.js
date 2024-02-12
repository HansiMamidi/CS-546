/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
// import sortAndFilter from './arrayUtils.js';
import {sortAndFilter, merge,matrixMultiply} from './arrayUtils.js';

import {palindromes, censorWords, distance} from './stringUtils.js';

import {areObjectsEqual, calculateObject, combineObjects} from './objectUtils.js';

//sortByKey

let people = [ 
    {name: 'Ryan', age: '22', location: 'Hoboken', role: 'Student'}, 
    {name: 'Matt', age: '21', location: 'New York', role: 'Student'},
    {name: 'Matt', age: '25', location: 'New Jersey', role: 'Student'}, 
    {name: 'Greg', age: '22', location: 'New York', role: 'Student'}, 
    {name: 'Mike', age: '21', location: 'Chicago', role: 'Teacher'} ]; 
try {
console.log(sortAndFilter(people, ['name', 'asc'], ['location', 'asc'], 'role', 'Student')); 
/* output: 
[{name: 'Greg', age: '22', location: 'New York', role: 'Student'},
{name: 'Matt', age: '25', location: 'New Jersey', role: 'Student'},
{name: 'Matt', age: '21', location: 'New York', role: 'Student'},
{name: 'Ryan', age: '22', location: 'Hoboken', role: 'Student'}] 
*/
} catch (e) {
console.log(e);
}

try {

console.log(sortAndFilter(people, ['name'], ['location', 'asc'], 'role', 'Student')); 
/* output: 
[{name: 'Greg', age: '22', location: 'New York', role: 'Student'},
{name: 'Matt', age: '25', location: 'New Jersey', role: 'Student'},
{name: 'Matt', age: '21', location: 'New York', role: 'Student'},
{name: 'Ryan', age: '22', location: 'Hoboken', role: 'Student'}] 
*/
} catch (e) {
console.log(e);
}

//Merge
try {

console.log(merge([3,0,undefined,2,"Aiden"], ["CS-546" ,"Computer Science",8,15], [6,3,"!Patrick",25,29]));

} catch (e) {
console.log(e);
}

try {
console.log(merge(["bar", 0, 1, [[[5, "foo"]]]], [7, "buzz", ["fizz", 8]]));
} catch (e) {
console.log(e);
}
  

//Matrix Multiplication
try {

console.log(matrixMultiply([ [2,3], [3,4], [4,5] ], [ [1,1,1], [2,2,2] ], [ [3], [2], [1] ])); //  returns [ [48], [66], [84] ]

} catch (e) {
console.log(e);
}

try {

console.log(matrixMultiply([ [1,2],[1] ], [ [2], [6] ])); //  throws error

} catch (e) {
console.log(e);
}


//Palindromes test cases
try {
    console.log(palindromes(["Madam", "Loot", "Was it a cat I saw?", "Poor Dan is in a droop", "Anna", "Nope" ]));
    // console.log(palindromes()); // throws error
    // console.log(palindromes("hi")); //  throws error
    // console.log(palindromes("    ")); //  throws error
    // console.log(palindromes(1));  //throws error
  } catch (e) {
    console.log(e);
  }


  try {
    // console.log(palindromes()); // throws error
    console.log(palindromes("hi")); //  throws error
    // console.log(palindromes([[1],[2]])); //  throws error
    // console.log(palindromes(1));  //throws error
  } catch (e) {
    console.log(e);
  }
  
  try {
    console.log(palindromes()); //  throws error
  } catch (e) {
    console.log(e);
  }
  
 //censor words
let badWords = ["bread","chocolate","pop"];
try {
    console.log(censorWords("I like bread that has chocolate chips in it but I do not like lollipops", badWords))
 } catch (e) {
    console.log(e);
  }
  
try {
    console.log(censorWords("I like bread that has chocolate chips in it", ["   ", "wow"]))
 } catch (e) {
    console.log(e);
  } 
  
  
//Distance test cases
try {
    console.log(distance("sphinx of black quartz, judge my vow", "QUARTZ", "vOW")); // returns 3
  } catch (e) {
    console.log(e);
  }
  
try {
    console.log(distance("Bob met Adam on wednesday", "Adam", "Bob"))
  } catch (e) {
    console.log(e);
  }

try {
    console.log(distance())
  } catch (e) {
    console.log(e);
  }

  try {
    console.log( distance("Hello World!", "   !?!", "    ...  "))
  } catch (e) {
    console.log(e);
  }
  
//areObjectsEqual
const first = {a: 2, b: 3};
const second = {a: 2, b: 4};
const third = {a: 2, b: 3};
const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
const sixth = {name: {firstName: "Patrick", lastName: "Hill"}, age: 47, dob: '9/25/1975', hobbies: ["Playing music", "Movies", "Spending time with family"]} 
const seventh = {age: 47, name: {firstName: "Patrick", lastName: "Hill"}, hobbies: ["Playing music", "Movies", "Spending time with family"], dob: '9/25/1975'}
const eighth = {b:3, a:2}

try {
    console.log(areObjectsEqual(first, second, third)); // false
} catch (e) {
console.log(e);
}

try {
console.log(areObjectsEqual([1,2,3], [1,2,3]));
} catch (e) {
console.log(e);
}

//calculateObjects
try {
console.log(calculateObject({ a: 3, b: 7, c: 5 }, [(n => n * 2), (n => Math.sqrt(n))]))
} catch (e) {
console.log(e);
}

try {
console.log(calculateObject({ a: 1, b: 2, c: 3}, [false]))
} catch (e) {
console.log(e);
}  

//combineObjects
try {
console.log(combineObjects({ b: 7, c: 5 },{ d: 4, e: 9, a: 'waffle' },{ a: 8, d: 2 },{ d: 3, e: 'hello' }));
} catch (e) {
console.log(e);
}


try {
console.log(combineObjects({ wow: 'crazy', super: 'duper' },{}));
} catch (e) {
console.log(e);
}

