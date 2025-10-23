# Node.js Fundamentals

## What is Node.js?
Node.js is a scalable and large ecosystem that makes asynchronous programming possible.

## How does Node.js differ from running JavaScript in the browser?
The issue with JS is that the stack only processes one register, so only one instruction can be processed at a time. By using Node.js, we can queue many callbacks in order to perform many tasks. Node.js runs on the operating system of the hardware that runs it, so it has the ability to begin operations and use the filing system to perform operations.

## What is the V8 engine, and how does Node use it?
The v8 engine is what powers JS in a node application. 

## What are some key use cases for Node.js?
Node:
- is fast
- is scalable
- has a large ecosystem of libraries. 

## Explain the difference between CommonJS and ES Modules. Give a code example of each.
The difference between the two is in the way that they import and export modules. 
**CommonJS (default in Node.js):**
```js
// controller.js
const mySample = require('./sample.js)
console.log(x)

// sample.js
const x=3
module.exports = { x }
```

**ES Modules (supported in modern Node.js):**
```js
// controller.js
import { x } from './sample.js'
console.log(x)

// sample.js
export const x = 3
``` 