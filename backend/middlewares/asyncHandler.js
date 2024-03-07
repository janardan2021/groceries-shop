function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}

const catchAsync = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}

const asyncHandler = fn => ((req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
})
// Promise.resolve(something) resolves something to a promise which is thenable and catchable
// The 'something' may be a value or some lines of code or a function or an async function.
// In our case it is an async function. If there is no error inside the async function, the
// code inside it will simply run and we dont need .then(). But we do need .catch() if the
// async function throws an error. That is why we are writing this middleware function.
// The .catch() will call next() with the thrown error like next(e)

export {wrapAsync, catchAsync, asyncHandler}