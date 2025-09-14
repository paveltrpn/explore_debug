import { Range } from "./range.js";
import * as smnp from "./string_mnp.js";

function timeout(delay) {
    const timeoutPromise = new Promise(() => {
        setTimeout(() => {
            console.log(" === timeout from promise");
        }, delay);
    });
}

function syncStopped() {
    let a = 0;
    for (let i = 0; i < 100; i++) {
        a = a + 1;
    }
}

function foo(message, n) {
    let i = n;
    for (let j = 0; j < i; j++) {
        console.log(message + " " + j);
    }
}

//function illegal() {
//  reurn 100
//}

function main() {
    // All sync calls executes in StartExecution(0)
    console.log("=== start");

    // illegal()

    const range = new Range(0, 5, 2);
    for (const item in range) {
        console.log(`iterate range at ${item}`);
    }

    syncStopped();

    timeout(200);

    setImmediate(() => {
        console.log("=== hello from immidiate");
    });

    setTimeout(() => {
        console.log("timeout first");
        setTimeout(() => {
            console.log("timeout inner first");
        }, 2000);
        setTimeout(() => {
            console.log("timeout inner second");
        }, 2000);
    }, 2000);

    setTimeout(() => {
        console.log("timeout, schedule Promise()");
        Promise.resolve().then(() => {
            console.log(" === Promise() after timeout");
        });
    }, 2000);

    foo(" === this is from function call at ", 2);

    // Inside microtask execution.
    // Executes before SpinEventLoopInternal()
    Promise.resolve().then(() => {
        console.log(" === inside microtask, mark one");
    });

    Promise.resolve().then(() => {
        console.log(" === inside microtask, mark two");
    });

    console.log("=== end");
}

// Entry point.
main();
