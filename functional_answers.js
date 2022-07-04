// Challenge 1
// Create a function addTwo that accepts one input and adds 2 to it.

// Ответ
const addTwo = (num) => num + 2;

console.log(addTwo(3));
console.log(addTwo(10));

// Challenge 2
// Create a function addS that accepts one input and adds an "s" to it.

// Ответ

const addS = (word) => word + "s";

console.log(addS("pizza"));
console.log(addS("bagel"));

// Challenge 3
// Create a function called map that takes two inputs:
// an array of numbers (a list of numbers)
// a 'callback' function - a function that is applied to each element of the array (inside of the function 'map')
// Have map return a new array filled with numbers that are the result of using the 'callback' function on each element of the input array.

// Ответ

const multiplyByTwo = (num) => num * 2;
const map = (array, callback) => {
  const res = [];
  for (let i = 0; i < array.length; i++) {
    res.push(callback(array[i]));
  }
  return res;
};
console.log(map([1, 2, 3, 4, 5], multiplyByTwo)); //-> [2,4,6,8,10]
console.log(multiplyByTwo(1)); //-> 2
console.log(multiplyByTwo(2)); //-> 4

// Challenge 4
// The function forEach takes an array and a callback, and runs the callback on each element of the array. forEach does not return anything.

// Ответ

const forEach = (array, callback) => {
  for (let i = 0; i < array.length; i++) {
    callback(array[i]);
  }
};
let alphabet = "";
const letters = ["a", "b", "c", "d"];
forEach(letters, (char) => (alphabet += char));
console.log(alphabet); //prints 'abcd'

// Challenge 5
// For this challenge, you're going to rebuild map as mapWith. This time you're going to use forEach inside of mapWith instead of using a for loop.

// Ответ
const mapwith = (array, callback) => {
  const res = [];
  forEach(array, (el) => res.push(callback(el)));
  return res;
};
console.log(mapwith([1, 2, 3, 4, 5], multiplyByTwo)); //-> [2,4,6,8,10]
console.log(multiplyByTwo(1)); //-> 2
console.log(multiplyByTwo(2)); //-> 4

// Challenge 6
// The function reduce takes an array and reduces the elements to a single value. For example it can sum all the numbers, multiply them, or any operation that you can put into a function.
// const nums = [4, 1, 3];
// const add = (a, b) => a + b;
// reduce(nums, add, 0);   //-> 8
// Here's how it works. The function has an "accumulator value" which starts as the initialValue and accumulates the output of each loop. The array is iterated over, passing the accumulator and the next array element as arguments to the callback. The callback's return value becomes the new accumulator value. The next loop executes with this new accumulator value. In the example above, the accumulator begins at 0. add(0,4) is called. The accumulator's value is now 4. Then add(4, 1) to make it 5. Finally add(5, 3) brings it to 8, which is returned.

// Ответ

const reduce = (array, callback, initialValue) => {
  let acc = initialValue;
  for (let i = 0; i < array.length; i++) {
    acc = callback(acc, array[i]);
  }
  return acc;
};

const nums = [4, 1, 3];
const add = (a, b) => a + b;
console.log(reduce(nums, add, 0)); //-> 8

// Challenge 7
// Construct a function intersection that compares input arrays and returns a new array with elements found in all of the inputs. BONUS: Use reduce!

// Ответ Вариант 1

const intersection = (ar1, ar2, ar3) => {
  const reduce = ar1.reduce((acc, cur) => {
    if (ar2.includes(cur) && ar3.includes(cur)) {
      return acc.concat(cur);
    } else {
      return acc;
    }
  }, []);
  return reduce;
};
console.log(
  intersection([5, 10, 15, 20], [15, 88, 1, 5, 7], [1, 10, 15, 5, 20])
); // should log: [5, 15]

// Ответ Вариант 2

const intersection = (...arrays) => {
  return arrays.reduce((acc, cur) => {
    return acc.filter((el) => cur.includes(el));
  });
};

console.log(
  intersection([5, 10, 15, 20], [15, 88, 1, 5, 7], [1, 10, 15, 5, 20])
); // should log: [5, 15]

// Challenge 8
// Construct a function union that compares input arrays and returns a new array that contains all elements. If there are duplicate elements, only add it once to the new array. Preserve the order of the elements starting from the first element of the first input array. BONUS: Use reduce!

// Ответ

const union = (...arrays) => {
  return arrays.reduce((acc, cur) => [...new Set(acc.concat(cur))]);
};

console.log(union([5, 10, 15], [15, 88, 1, 5, 7], [100, 15, 10, 1, 5]));
// should log: [5, 10, 15, 88, 1, 7, 100]

// Challenge 9
// Construct a function objOfMatches that accepts two arrays and a callback. objOfMatches will build an object and return it. To build the object, objOfMatches will test each element of the first array using the callback to see if the output matches the corresponding element (by index) of the second array. If there is a match, the element from the first array becomes a key in an object, and the element from the second array becomes the corresponding value.

// Ответ

const objOfMatches = (array1, array2, callback) => {
  return array1.reduce((acc, cur, index) => {
    if (callback(cur) == array2[index]) {
      acc[cur] = array2[index];
    }
    return acc;
  }, {});
};

console.log(
  objOfMatches(
    ["hi", "howdy", "bye", "later", "hello"],
    ["HI", "Howdy", "BYE", "LATER", "hello"],
    (str) => str.toUpperCase()
  )
);
// should log: { hi: 'HI', bye: 'BYE', later: 'LATER' }

// Challenge 10
// Construct a function multiMap that will accept two arrays: an array of values and an array of callbacks. multiMap will return an object whose keys match the elements in the array of values. The corresponding values that are assigned to the keys will be arrays consisting of outputs from the array of callbacks, where the input to each callback is the key.

// Ответ Вариант 1

const multiMap = (arrVals, arrCallbacks) => {
  let acc = [];
  const obj = {};
  for (let i = 0; i < arrVals.length; i++) {
    for (let j = 0; j < arrCallbacks.length; j++) {
      acc.push(arrCallbacks[j](arrVals[i]));
    }
    obj[arrVals[i]] = acc;
    acc = [];
  }
  return obj;
};

console.log(
  multiMap(
    ["catfood", "glue", "beer"],
    [
      (str) => str.toUpperCase(),
      (str) => str[0].toUpperCase() + str.slice(1).toLowerCase(),
      (str) => str + str,
    ]
  )
);
// should log: { catfood: ['CATFOOD', 'Catfood', 'catfoodcatfood'], glue: ['GLUE', 'Glue', 'glueglue'], beer: ['BEER', 'Beer', 'beerbeer'] }

// Ответ Вариант 2

const multiMap = (arrVals, arrCallbacks) => {
  const res = arrVals.reduce((acc, cur) => {
    acc[cur] = arrCallbacks.map((el) => el(cur));
    return acc;
  }, {});
  return res;
};
console.log(
  multiMap(
    ["catfood", "glue", "beer"],
    [
      (str) => str.toUpperCase(),
      (str) => str[0].toUpperCase() + str.slice(1).toLowerCase(),
      (str) => str + str,
    ]
  )
);
// should log: { catfood: ['CATFOOD', 'Catfood', 'catfoodcatfood'], glue: ['GLUE', 'Glue', 'glueglue'], beer: ['BEER', 'Beer', 'beerbeer'] }

// Challenge 11
// Create a function commutative that accepts two callbacks and a value. commutative will return a boolean indicating if the passing the value into the first function, and then passing the resulting output into the second function, yields the same output as the same operation with the order of the functions reversed (passing the value into the second function, and then passing the output into the first function).

// Ответ

const commutative = (func1, func2, value) => {
  return func1(func2(value)) == func2(func1(value));
};

// /*** Uncomment these to check your work! ***/
// const multBy3 = n => n * 3;
// const divBy4 = n => n / 4;
// const subtract5 = n => n - 5;
// console.log(commutative(multBy3, divBy4, 11)); // should log: true
// console.log(commutative(multBy3, subtract5, 10)); // should log: false
// console.log(commutative(divBy4, subtract5, 48)); // should log: false

// Challenge 12
// Create a function objFilter that accepts an object and a callback. objFilter should make a new object, and then iterate through the passed-in object, using each key as input for the callback. If the output from the callback is equal to the corresponding value, then that key-value pair is copied into the new object. objFilter will return this new object.

// Ответ Вариант 1

const objFilter = (obj, callback) => {
  const asArray = Object.entries(obj);
  const filtered = asArray.filter(([key, val]) => val == callback(key));
  const objNew = Object.fromEntries(filtered);
  return objNew;
};

const startingObj = {};
startingObj[6] = 3;
startingObj[2] = 1;
startingObj[12] = 4;
const half = (n) => n / 2;
console.log(objFilter(startingObj, half)); // should log: { 2: 1, 6: 3 }

// Ответ Вариант 2 (с reduce)

const objFilter = (obj, callback) => {
  const asArray = Object.entries(obj);
  const res = asArray.reduce((acc, cur) => {
    if (callback(cur[0]) == cur[1]) {
      acc[cur[0]] = cur[1];
    }
    return acc;
  }, {});
  return res;
};

const startingObj = {};
startingObj[6] = 3;
startingObj[2] = 1;
startingObj[12] = 4;
const half = (n) => n / 2;
console.log(objFilter(startingObj, half)); // should log: { 2: 1, 6: 3 }

// Challenge 13
// Create a function rating that accepts an array (of functions) and a value. All the functions in the array will return true or false. rating should return the percentage of functions from the array that return true when the value is used as input.

// Ответ

const rating = (arrOfFuncs, value) => {
  const res = arrOfFuncs.reduce((acc, cur) => {
    if (cur(value)) {
      acc = acc + 1;
    }
    return acc;
  }, 0);
  return (res / arrOfFuncs.length) * 100;
};

// /*** Uncomment these to check your work! ***/
// const isEven = n => n % 2 === 0;
// const greaterThanFour = n => n > 4;
// const isSquare = n => Math.sqrt(n) % 1 === 0;
// const hasSix = n => n.toString().includes('6');
// const checks = [isEven, greaterThanFour, isSquare, hasSix];
// console.log(rating(checks, 64)); // should log: 100
// console.log(rating(checks, 66)); // should log: 75

// Challenge 14
// Create a function pipe that accepts an array (of functions) and a value. pipe should input the value into the first function in the array, and then use the output from that function as input for the second function, and then use the output from that function as input for the third function, and so forth, until we have an output from the last function in the array. pipe should return the final output.

// Ответ Вариант 1

const pipe = (arrOfFuncs, value) => {
  return arrOfFuncs.reduce((acc, cur) => cur(acc), value);
};

const capitalize = (str) => str.toUpperCase();
const addLowerCase = (str) => str + str.toLowerCase();
const repeat = (str) => str + str;
const capAddlowRepeat = [capitalize, addLowerCase, repeat];
console.log(pipe(capAddlowRepeat, "cat")); // should log: 'CATcatCATcat'

// Ответ Вариант 2

const pipe = (arrOfFuncs, value) => {
  for (let i = 0; i < arrOfFuncs.length; i++) {
    value = arrOfFuncs[i](value);
  }
  return value;
};

const capitalize = (str) => str.toUpperCase();
const addLowerCase = (str) => str + str.toLowerCase();
const repeat = (str) => str + str;
const capAddlowRepeat = [capitalize, addLowerCase, repeat];
console.log(pipe(capAddlowRepeat, "cat")); // should log: 'CATcatCATcat'

// Challenge 15
// Create a function highestFunc that accepts an object (which will contain functions) and a subject (which is any value). highestFunc should return the key of the object whose associated value (which will be a function) returns the largest number, when the subject is given as input.

// Answer Variant A

const highestFunc = (objOfFuncs, subject) => {
  const arr = Object.entries(objOfFuncs);
  let resFunc;
  const res = arr.reduce(
    (acc, cur) => {
      resFunc = cur[1](subject);
      if (resFunc > acc[1]) {
        acc[0] = cur[0];
        acc[1] = resFunc;
      }
      return acc;
    },
    ["", 0]
  );
  return res[0];
};

const groupOfFuncs = {};
groupOfFuncs.double = (n) => n * 2;
groupOfFuncs.addTen = (n) => n + 10;
groupOfFuncs.inverse = (n) => n * -1;

console.log(highestFunc(groupOfFuncs, 5)); // should log: 'addTen'
console.log(highestFunc(groupOfFuncs, 11)); // should log: 'double'
console.log(highestFunc(groupOfFuncs, -20)); // should log: 'inverse'

// Closure
// Challenge 1
// Create a function createFunction that creates and returns a function. When that created function is called, it should print "hello".

// Answer

createFunction = () => () => console.log("hello");
const function1 = createFunction();
// now we'll call the function we just created
function1(); //should console.log('hello');

// Challenge 2
// Create a function createFunctionPrinter that accepts one input and returns a function. When that created function is called, it should print out the input that was used when the function was created.

// Solution

const createFunctionPrinter = (input) => () => console.log(input);
const printSample = createFunctionPrinter("sample");
const printHello = createFunctionPrinter("hello");
// now we'll call the functions we just created
printSample(); //should console.log('sample');
printHello(); //should console.log('hello');

// Challenge 3
// Examine the code for the outer function. Notice that we are returning a function and that function is using variables that are outside of its scope.
// Uncomment those lines of code. Try to deduce the output before executing.

const outer = () => {
  let counter = 0; // this variable is outside incrementCounter's scope
  const incrementCounter = () => {
    counter++;
    console.log("counter", counter);
  };
  return incrementCounter;
};

const willCounter = outer();
const jasCounter = outer();

willCounter(); // 1
willCounter(); // 2
willCounter(); // 3

jasCounter(); // 1
willCounter(); // 4

// Challenge 4
// Now we are going to create a function addByX that returns a function that will add an input by x.

// Solution

const addByX = (x) => (y) => x + y;
const addByTwo = addByX(2);
console.log(addByTwo(1)); //should return 3
console.log(addByTwo(2)); //should return 4
console.log(addByTwo(3)); //should return 5

const addByThree = addByX(3);
console.log(addByThree(1)); //should return 4
console.log(addByThree(2)); //should return 5

const addByFour = addByX(4);
console.log(addByFour(4)); //should return 8
console.log(addByFour(10)); //should return 14

// Challenge 5
// Write a function once that accepts a callback as input and returns a function. When the returned function is called the first time, it should call the callback and return that output. If it is called any additional times, instead of calling the callback again it will simply return the output value from the first time it was called.

// The Solution

const once = (func) => {
  let hasBeenRun = false;
  let value;
  const inner = (n) => {
    if (hasBeenRun === false) {
      hasBeenRun = true;
      value = func(n);
      return value;
    } else {
      return value;
    }
  };
  return inner;
};

const addByTwo = (n) => n + 2;
const onceFunc = once(addByTwo);

// UNCOMMENT THESE TO TEST YOUR WORK!
console.log(onceFunc(4)); //should log 6
console.log(onceFunc(10)); //should log 6
console.log(onceFunc(9001)); //should log 6

// Challenge 6
// Write a function after that takes the number of times the callback needs to be called before being executed as the first parameter and the callback as the second parameter.

// The Solution

const after = (count, func) => {
  let currentCount = 0;
  const inner = () => {
    currentCount++;
    if (currentCount === 3) func();
  };
  return inner;
};

const called = () => console.log("hello");
const afterCalled = after(3, called);

afterCalled(); // -> nothing is printed
afterCalled(); // -> nothing is printed
afterCalled(); // -> 'hello' is printed

// Challenge 8
// Create a function russianRoulette that accepts a number (let us call it n), and returns a function. The returned function will take no arguments, and will return the string 'click' the first n - 1 number of times it is invoked. On the very next invocation (the nth invocation), the returned function will return the string 'bang'. On every invocation after that, the returned function returns the string 'reload to play again'.

// The Solution

const russianRoulette = (num) => {
  let invocation = 0;
  const inner = () => {
    invocation++;
    if (invocation <= num - 1) return "click";
    else if (invocation === num) return "bang";
    else return "reload to play again";
  };
  return inner;
};

// /*** Uncomment these to check your work! ***/
const play = russianRoulette(3);
console.log(play()); // should log: 'click'
console.log(play()); // should log: 'click'
console.log(play()); // should log: 'bang'
console.log(play()); // should log: 'reload to play again'
console.log(play()); // should log: 'reload to play again'

// Challenge 9
// Create a function average that accepts no arguments, and returns a function (that will accept either a number as its lone argument, or no arguments at all). When the returned function is invoked with a number, the output should be average of all the numbers have ever been passed into that function (duplicate numbers count just like any other number). When the returned function is invoked with no arguments, the current average is outputted. If the returned function is invoked with no arguments before any numbers are passed in, then it should return 0.

// The Solution

const average = () => {
  let avg = 0;
  let num = 0;
  let sum = 0;
  const inner = (n) => {
    if (n) {
      num++;
      sum = sum + n;
      avg = sum / num;
      return avg;
    } else return avg;
  };
  return inner;
};

// /*** Uncomment these to check your work! ***/
const avgSoFar = average();
console.log(avgSoFar()); // should log: 0
console.log(avgSoFar(4)); // should log: 4
console.log(avgSoFar(8)); // should log: 6
console.log(avgSoFar()); // should log: 6
console.log(avgSoFar(12)); // should log: 8
console.log(avgSoFar()); // should log: 8

// Challenge 10
// Create a function makeFuncTester that accepts an array (of two-element sub-arrays), and returns a function (that will accept a callback). The returned function should return true if the first elements (of each sub-array) being passed into the callback all yield the corresponding second elements (of the same sub-array). Otherwise, the returned function should return false.

// The Solution

const makeFuncTester = (arrOfTests) => {
  const inner = (callback) => {
    const res = arrOfTests.reduce((acc, cur) => {
      if (callback(cur[0]) === cur[1]) acc = "true";
      else acc = "false";
      return acc;
    }, "");
    return res;
  };
  return inner;
};

// /*** Uncomment these to check your work! ***/
const capLastTestCases = [];
capLastTestCases.push(["hello", "hellO"]);
capLastTestCases.push(["goodbye", "goodbyE"]);
capLastTestCases.push(["howdy", "howdY"]);
const shouldCapitalizeLast = makeFuncTester(capLastTestCases);
const capLastAttempt1 = (str) => str.toUpperCase();
const capLastAttempt2 = (str) => str.slice(0, -1) + str.slice(-1).toUpperCase();
console.log(shouldCapitalizeLast(capLastAttempt1)); // should log: false
console.log(shouldCapitalizeLast(capLastAttempt2)); // should log: true

// Challenge 11
// Create a function makeHistory that accepts a number (which will serve as a limit), and returns a function (that will accept a string). The returned function will save a history of the most recent "limit" number of strings passed into the returned function (one per invocation only). Every time a string is passed into the function, the function should return that same string with the word 'done' after it (separated by a space). However, if the string 'undo' is passed into the function, then the function should delete the last action saved in the history, and return that delted string with the word 'undone' after (separated by a space). If 'undo' is passed into the function and the function's history is empty, then the function should return the string 'nothing to undo'.

// The Solution

const makeHistory = (limit) => {
  const history = [];
  const inner = (str) => {
    if (str === "undo") {
      if (!history.length) return "nothing to undo";
      return history.pop() + " undone";
    }
    if (history.length === limit) {
      history.shift();
    }
    history.push(str);
    return str + " done";
  };
  return inner;
};

// /*** Uncomment these to check your work! ***/
const myActions = makeHistory(2);
console.log(myActions("jump")); // should log: 'jump done'
console.log(myActions("undo")); // should log: 'jump undone'
console.log(myActions("walk")); // should log: 'walk done'
console.log(myActions("code")); // should log: 'code done'
console.log(myActions("pose")); // should log: 'pose done'
console.log(myActions("undo")); // should log: 'pose undone'
console.log(myActions("undo")); // should log: 'code undone'
console.log(myActions("undo")); // should log: 'nothing to undo'

// Challenge 12
// Inspect the commented out test cases carefully if you need help to understand these instructions.

// Create a function blackjack that accepts an array (which will contain numbers ranging from 1 through 11), and returns a DEALER function. The DEALER function will take two arguments (both numbers), and then return yet ANOTHER function, which we will call the PLAYER function.
// On the FIRST invocation of the PLAYER function, it will return the sum of the two numbers passed into the DEALER function.

// On the SECOND invocation of the PLAYER function, it will return either:

// the first number in the array that was passed into blackjack PLUS the sum of the two numbers passed in as arguments into the DEALER function, IF that sum is 21 or below, OR
// the string 'bust' if that sum is over 21.

// If it is 'bust', then every invocation of the PLAYER function AFTER THAT will return the string 'you are done!' (but unlike 'bust', the 'you are done!' output will NOT use a number in the array). If it is NOT 'bust', then the next invocation of the PLAYER function will return either:

// the most recent sum plus the next number in the array (a new sum) if that new sum is 21 or less, OR
// the string 'bust' if the new sum is over 21.

// And again, if it is 'bust', then every subsequent invocation of the PLAYER function will return the string 'you are done!'. Otherwise, it can continue on to give the next sum with the next number in the array, and so forth.
// You may assume that the given array is long enough to give a 'bust' before running out of numbers.

// BONUS: Implement blackjack so the DEALER function can return more PLAYER functions that will each continue to take the next number in the array after the previous PLAYER function left off. You will just need to make sure the array has enough numbers for all the PLAYER functions.

// The Solution

const blackjack = (array) => {
  let invocation = 0;
  let sum = 0;
  let indexArray = 0;
  let bust = false;
  const deal = (num1, num2) => {
    const player = () => {
      invocation++;
      if (invocation === 1) {
        sum = sum + num1 + num2;
        return sum;
      }
      sum = array[indexArray] + sum;
      indexArray++;
      if (sum <= 21) return sum;
      if (sum > 21 && !bust) {
        bust = true;
        return "bust";
      } else return "you are done!";
    };
    return player;
  };
  return deal;
};

// /*** Uncomment these to check your work! ***/

// /*** DEALER ***/
const deal = blackjack([
  2, 6, 1, 7, 11, 4, 6, 3, 9, 8, 9, 3, 10, 4, 5, 3, 7, 4, 9, 6, 10, 11,
]);

// /*** PLAYER 1 ***/
const i_like_to_live_dangerously = deal(4, 5);
console.log(i_like_to_live_dangerously()); // should log: 9
console.log(i_like_to_live_dangerously()); // should log: 11
console.log(i_like_to_live_dangerously()); // should log: 17
console.log(i_like_to_live_dangerously()); // should log: 18
console.log(i_like_to_live_dangerously()); // should log: 'bust'
console.log(i_like_to_live_dangerously()); // should log: 'you are done!'
console.log(i_like_to_live_dangerously()); // should log: 'you are done!'

// /*** BELOW LINES ARE FOR THE BONUS ***/

// /*** PLAYER 2 ***/
// const i_TOO_like_to_live_dangerously = deal(2, 2);
// console.log(i_TOO_like_to_live_dangerously()); // should log: 4
// console.log(i_TOO_like_to_live_dangerously()); // should log: 15
// console.log(i_TOO_like_to_live_dangerously()); // should log: 19
// console.log(i_TOO_like_to_live_dangerously()); // should log: 'bust'
// console.log(i_TOO_like_to_live_dangerously()); // should log: 'you are done!
// console.log(i_TOO_like_to_live_dangerously()); // should log: 'you are done!

// /*** PLAYER 3 ***/
// const i_ALSO_like_to_live_dangerously = deal(3, 7);
// console.log(i_ALSO_like_to_live_dangerously()); // should log: 10
// console.log(i_ALSO_like_to_live_dangerously()); // should log: 13
// console.log(i_ALSO_like_to_live_dangerously()); // should log: 'bust'
// console.log(i_ALSO_like_to_live_dangerously()); // should log: 'you are done!
// console.log(i_ALSO_like_to_live_dangerously()); // should log: 'you are done!

// Challenge 1
// Create a function functionValidator that accepts an array of functions and two different values (let's call them input and output). This function should return a new array containing *only* the functions from the original array that, when invoked with input, return the value output. Use reduce!)

// The Solution 

const functionValidator = (funcArr, input, output) => {
  const res = funcArr.reduce((acc, cur) => {
  if (cur(input) === output) acc.push(cur);
  return acc;
}, []) 
return res;
}

const addFive = num => num + 5;
const multiplyByTwo = num => num * 2;
const subtractOne = num => num - 1;
const fnArr = [addFive, multiplyByTwo, subtractOne];

console.log(functionValidator(fnArr, 5, 10)) // should log [num => num + 5, num => num * 2]

// Challenge 2
// Create a function allClear that accepts an array of evaluator functions (each returning a boolean value), and a single value. Using reduce, return a single boolean value indicating whether the value "passes" every single one of the evaluator functions (i.e. returns true).

// The Solution

const allClear = (funcArr, value) => {
  return funcArr.reduce((acc, cur) => {
      if (!cur(value)) acc = false;
      return acc;
  }, true)
}

const isOdd = num => num % 2 === 1;
const isPositive = num => num > 0;
const multipleOfFive = num => num % 5 === 0;
const numFnArr = [isOdd, isPositive, multipleOfFive];
console.log(allClear(numFnArr, 25)) // should log true 
console.log(allClear(numFnArr, -25)) // should log false

// Challenge 3
// Write a function numSelectString that accepts an array of numbers and returns a string. This function should use filter, sort, and reduce to return a string containing only the odd numbers from the array, separated by commas, in ascending order.

// The Solution

const numSelectString = (numArr) => {
  return numArr
    .sort((a, b) => a - b)
    .filter((n) => n % 2)
    .reduce((acc, cur) => acc + ", " + cur);
};

const nums = [17, 34, 3, 12];
console.log(numSelectString(nums)); // should log "3, 17"

// Challenge 4
// Write a function movieSelector that accepts an array of objects containing movie information (id, title, and score). Chain together invocations of map, filter AND reduce to return an array containing only movies with a score greater than 5. The titles should be all uppercase strings.

// The Solution

const movieSelector = (moviesArr) => {
  return moviesArr
    .filter((el) => el.score > 5)
    .map((obj) => obj.title.toUpperCase());
};

const movies = [
  { id: 1, title: "Pan's Labyrinth", score: 9 },
  { id: 37, title: "Manos: The Hands of Fate", score: 2 },
  { title: "Air Bud", score: 5 },
  { title: "Hackers", score: 7 },
];
console.log(movieSelector(movies)); // should log [ "PAN'S LABYRINTH", "HACKERS" ]

// Challenge 5
// Create a function curriedAddThreeNums that adds three numbers together when run thrice in succession as follows:

// The Solution

const curriedAddThreeNums = (num1) => {
  return (num2) => {
    return (num3) => {
      return num1 + num2 + num3;
    };
  };
};

console.log(curriedAddThreeNums(3)(-1)(1)); // should log 3

// Challenge 6
// Use partial application with your previously-defined curriedAddThreeNums to create a new function curriedAddTwoNumsToFive that when run twice in succession, adds two numbers to five as follows:

// The Solution

const curriedAddTwoNumsToFive = curriedAddThreeNums(5);

console.log(curriedAddTwoNumsToFive(6)(7)); //should return 18
