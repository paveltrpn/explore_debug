

function timeout(delay) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Request timed out'));
    }, delay);
  });
}

function syncStopped() {
  let a = 0
  for (let i = 0; i < 100; i++) {
    a = a + 1
  }
}

function foo(message, n) {
  let i = n
  for (let j = 0; j < i; j++) {
    console.log(message + " " + j)
  }
}

//function illegal() {
//  reurn 100
//}

function main() {
  console.log("=== start")

  // illegal()

  syncStopped()

  setImmediate(() => {
    console.log("=== hello from immidiate")
  })

  setTimeout(() => {
    console.log("timeout first")
    setTimeout(() => { console.log("timeout inner first") }, 2000)
    setTimeout(() => { console.log("timeout inner second") }, 2000)

  }, 2000)

  setTimeout(() => { console.log("timeout second") }, 2000)

  foo(" === this is from function call at ", 2)

  // Inside microtask execution
  Promise.resolve().then(() => {
    console.log(" === inside microtask, mark one")
  })

  console.log("=== end")
}

main()
