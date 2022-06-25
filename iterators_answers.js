// Challenge 1
// A) Create a for loop that iterates through an array and returns the sum of the elements of the array.
// B) Create a functional iterator for an array that returns each value of the array when called, one element at a time.

// Ответ - А
const sumFunc = (arr) => {
    let sum = 0;
    for (let i=0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}
const array = [1,2,3,4];
console.log(sumFunc(array)); // -> should log 10

// Ответ - В

const returnIterator = (arr)  => {
    let i = -1; // если счетчик не с нуля, то экономишь переменную - можно return arr[i] сразу
    const inner = () => {i++; return arr[i]};
    return inner;
}

const array2 = ['a', 'b', 'c', 'd'];
const myIterator = returnIterator(array2);
console.log(myIterator()); // -> should log 'a'
console.log(myIterator()); // -> should log 'b'
console.log(myIterator()); // -> should log 'c'
console.log(myIterator()); // -> should log 'd'

// Challenge 2
// Create an iterator with a next method that returns each value of the array when .next is called.

// Ответ

const nextIterator = (arr) => {
    let i = -1;
    const inner = {next: () => {i++; return arr[i]}}; 
    return inner;
};
 
const array3 = [1, 2, 3];
const iteratorWithNext = nextIterator(array3);
console.log(iteratorWithNext.next()); // -> should log 1
console.log(iteratorWithNext.next()); // -> should log 2
console.log(iteratorWithNext.next()); // -> should log 3

// Challenge 3
// Write code to iterate through an entire array using your nextIterator and sum the values.

// Ответ

const sumArray = (arr) => {
    let sum = 0;
    const iterator = nextIterator(arr);
  for (let i=0; i < arr.length; i++) {
      sum += iterator.next();
  }
  return sum;
  }
  
  const array4 = [1, 2, 3, 4];
  console.log(sumArray(array4)); // -> should log 10

//   Challenge 4
//   Create an iterator with a next method that returns each value of a set when .next is called

//Ответ - Вариант 1
const setIterator = (set) => {
    let i=-1;
    const arr = [...set.values()];
    const obj = {
        next: () => {
            i++;
            return arr[i];
        }
    }
    return obj;
}
const mySet = new Set('hey');
const iterateSet = setIterator(mySet);
console.log(iterateSet.next()); // -> should log 'h'
console.log(iterateSet.next()); // -> should log 'e'
console.log(iterateSet.next()); // -> should log 'y'

// Ответ - Вариант 2
const setIterator = (set) => {
    const mySet = set.values();
    const obj = {
        next: () => {
            return mySet.next().value;
        }
    }
    return obj;
}

// Challenge 5
// Create an iterator with a next method that returns an array with two elements (where the first element is the index and the second is the value at that index) when .next is called.

// Ответ
const indexIterator = (arr) => {
    let i=-1;
    const obj = {
        next: () => {
            i++;
            return [i,arr[i]];
        }
    }
    return obj;
  }
  
  // Uncomment the lines below to test your work
  const array5 = ['a', 'b', 'c', 'd'];
  const iteratorWithIndex = indexIterator(array5);
  console.log(iteratorWithIndex.next()); // -> should log [0, 'a']
  console.log(iteratorWithIndex.next()); // -> should log [1, 'b']
  console.log(iteratorWithIndex.next()); // -> should log [2, 'c']
  
//   Challenge 6
//   Create an iterator that returns each word from a string of words on the call of its .next method (hint: use regex!)
//   Then attach it as a method to the prototype of a constructor Words. Hint: research Symbol.iterator!

// Ответ

function Words(string) {
    this.str = string;
}

Words.prototype[Symbol.iterator] = function() {
const re = /\S+/g;
const str = this.str;

return {
    next: function() {
        const match = re.exec(str);
        if (match) {
            return {value: match[0], done: false};
        }
        return {value: undefined, done: true};
    }
}
};
  
  const helloWorld = new Words('Hello World');
  for (let word of helloWorld) { console.log(word); } // -> should log 'Hello' and 'World'

//   Challenge 7
// Build a function that walks through an array and returns the element concatenated with the string "was found after index x", where x is the previous index.
// Note: if it is the first element it should say that it is the first

function valueAndPrevIndex(array){
    let index = -1;
    const string1 = ' was found after index ';
    const string2 = ' is the first element';
    const obj = {
      sentence: () => {
        index++;
        if (index) {
          return array[index] + string1 + (index-1);
      } else {
        return array[0] + string2;
      }
    }
  }
    return obj;
    }
  

const returnedSentence = valueAndPrevIndex([4,5,6])
console.log(returnedSentence.sentence());
console.log(returnedSentence.sentence());
console.log(returnedSentence.sentence());


// Challenge 8
// Write a function that will console.log "hello there", or "gibberish", every three seconds depending on if the word passed into the function is 'english'.
// Do not use any type of loop constructor and only make the call to createConversation once.

// Ответ

function* createConversation(string) {
    setTimeout(() => console.log(''), 3000);
    if (string == 'english') { 
        yield console.log('hello there');
    } else {
        yield console.log('gibberish');
    }
  }

console.log(createConversation('english').next());

// Challenge 9
// Use async/await to console.log a sentence comprised of a noun and verb in which the non async function takes in a noun, concatenates it with a hard coded verb and returns it to the async function to be console.logged after a duration of 3 seconds. Call the async function only once, feeding it a noun to make this happen.

// Ответ

function waitForVerb(noun) {
    return " barks";
  }
  
  async function f(noun) {
    
    await setTimeout(() => {
      console.log(noun + waitForVerb(noun));
    }, 3000);
    
  }
  
  f("dog");
  
  