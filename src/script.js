import { Range } from "./range.js";
import * as smnp from "./string_mnp.js";

let duration = "";

const formatDurationMessage = (diff, durationType) => {
    let min = "";
    let hrs = "";
    let dys = "";
    let wks = "";
    let mts = "";
    let yrs = "";

    if (11 <= diff % 100 && diff % 100 <= 14) {
        min = "минут";
        hrs = "часов";
        dys = "суток";
        wks = "недель";
        mts = "месяцев";
        yrs = "лет";
    } else if (diff % 10 == 1) {
        min = "минуту";
        hrs = "час";
        dys = "сутки";
        wks = "неделю";
        mts = "месяц";
        yrs = "год";
    } else if (2 <= diff % 10 && diff % 10 <= 4) {
        min = "минуты";
        hrs = "часа";
        dys = "суток";
        wks = "недели";
        mts = "месяца";
        yrs = "лет";
    } else {
        min = "минут";
        hrs = "часов";
        dys = "суток";
        wks = "недель";
        mts = "месяцев";
        yrs = "лет";
    }

    let form = "";
    switch (durationType) {
        case "min": {
            form = min;
            break;
        }
        case "hrs": {
            form = hrs;
            break;
        }
        case "dys": {
            form = dys;
            break;
        }
        case "wks": {
            form = wks;
            break;
        }
        case "mts": {
            form = mts;
            break;
        }
        case "yrs": {
            form = yrs;
            break;
        }
        default: {
            break;
        }
    }

    return `Обновлено ${diff} ${form} назад`;
};

const diff = 60 * 60 * 24 * 28 * 12;

if (diff < 60) {
    duration = "Обновлено меньше 1 минуты назад";
} else if (diff < 60 * 60) {
    duration = formatDurationMessage(Math.trunc(diff / 60), "min");
} else if (diff < 60 * 60 * 24) {
    duration = formatDurationMessage(Math.trunc(diff / (60 * 60)), "hrs");
} else if (diff < 60 * 60 * 24 * 7) {
    duration = formatDurationMessage(Math.trunc(diff / (60 * 60 * 24)), "dys");
} else if (diff < 60 * 60 * 24 * 28) {
    duration = formatDurationMessage(Math.trunc(diff / (60 * 60 * 24 * 7)), "wks");
} else if (diff < 60 * 60 * 24 * 28 * 12) {
    duration = formatDurationMessage(Math.trunc(diff / (60 * 60 * 24 * 28)), "mts");
} else {
    duration = formatDurationMessage(Math.trunc(diff / (60 * 60 * 24 * 28 * 12)), "yrs");
}

console.log(`diff is: ${duration}`);

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

    const fooObj = {};
    fooObj["newProp"] = 100;

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
