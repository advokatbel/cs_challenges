// Вопросы  http://csbin.io/promises 
// https://www.codesmith.io/ 

// Challenge 1
// Let's start by reviewing asynchronous functions! Using setTimeout, print the string 'Hello!' after 1000ms.

// Ответ Вариант 1
function sayHello() {
    setTimeout(() => console.log('Hello!'), 1000);
}
sayHello();

// Ответ Вариант 2

const sayHello = () => setTimeout(() => console.log('Hello!'), 1000);
sayHello();


// Challenge 2
// Create a promise. Have it resolve with a value of 'Resolved!' in resolve after a delay of 1000ms, using setTimeout. Print the contents of the promise after it has been resolved by passing console.log to .then

// Ответ
const promise1 = new Promise(resolve => setTimeout(resolve('Hello!'),10000));
promise1.then(greeting => console.log(greeting));

// Challenge 3
// Create another promise. Now have it reject with a value of "Rejected!" without using setTimeout. Print the contents of the promise after it has been rejected by passing console.log to .catch

const promise2 = new Promise((resolve, reject) => reject('Rejected!'))
promise2.catch(error => console.log(error));

// Challenge 4
// Promises are asynchronous and we're now going to prove that they indeed are! Create a promise and have it resolve with the value of "Promise has been resolved!" Then uncomment the code at bottom of Challenge 4. What order do we expect "Promise has been resolved!" and "I'm not the promise!" to print? Why?

// Ответ 1
const promise = new Promise(resolve => resolve()); 
promise.then(() => console.log('Promise has been resolved!'));
console.log("I'm not the promise!");

// Ответ 2
// "I'm not the promise" будет выполнен перед "Promise has been resolved!", так как, хотя промис будет сразу разрешен, Call Stack  будет уже занят синхронным кодом (console.log), а промис после разрешения попадет на Call Stack только через очередь Microtask Queue - т.е. после выполнения синхронного кода, который уже начал исполняться.

// Challenge 5
// Write a function delay that returns a promise. And that promise should return a setTimeout that calls resolve after 1000ms

// Ответ

const delay = () => new Promise(resolve => setTimeout(resolve, 1000));
delay().then(() => console.log('Hello!'));

// Challenge 6
// This challenge we'll chain promises together using ".then" Create two variables: firstPromise and secondPromise Set secondPromise to be a promise that resolves to "Second!" Set firstPromise to be a promise that resolves to secondPromise Call the firstPromise with a ".then", which will return the secondPromise> promise. Then print the contents of the promise after it has been resolved by passing console.log to .then

// Ответ

const secondPromise = new Promise(resolve => resolve('Second!'));
const firstPromise = new Promise(resolve => resolve(secondPromise));
firstPromise.then(data => console.log(data));

// Challenge 7
// We have a API that gets data from a database, it takes an index parameter and returns a promise Your challenge is to use Promise.all to make 3 API calls and return all the data when the calls are complete

const fakePeople = [
    { name: 'Rudolph', hasPets: false, currentTemp: 98.6 },
    { name: 'Zebulon', hasPets: true, currentTemp: 22.6 },
    { name: 'Harold', hasPets: true, currentTemp: 98.3 },
  ]
  
  const fakeAPICall = (i) => {
    const returnTime = Math.floor(Math.random() * 1000);
    return new Promise((resolve, reject) => {
      if (i >= 0 && i < fakePeople.length) {
        setTimeout(() => resolve(fakePeople[i]), returnTime);
      } else {
        reject({ message: "index out of range" });
      }
    });
}
  
// Ответ

const getAllData = () => Promise.all([fakeAPICall(0), fakeAPICall(1), fakeAPICall(2)]).then(values => console.log(values));
getAllData();
  