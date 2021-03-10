function queryParamError(msg) {
    return {
        statusCode: 400,
        payload: {
            statusCode: 400,
            error: 'Bad Request',
            message: msg,
        },
    };
}

function unauthorizedError(msg) {
    return {
        statusCode: 401,
        payload: {
            statusCode: 401,
            error: 'Unauthorized',
            message: msg,
        },
    };
}

function notFoundError(msg) {
    return {
        statusCode: 404,
        payload: {
            statusCode: 404,
            error: 'Not Found',
            message: msg,
        },
    };
}

function internalServerError(msg = 'Something has gone wrong on our end please try again') {
    return {
        statusCode: 500,
        payload: {
            statusCode: 500,
            error: 'Internal Server Error',
            message: msg,
        }
    }
}

function errorHandler(err, req, res, next) {
    if (err.statusCode && err.payload) {
        res.status(err.statusCode);
        res.json(err.payload);
    } else {
        res.status(err.statusCode);
        res.json({
            statusCode: 500,
            error: 'Internal Server Error',
        });
    }
}

export { queryParamError, unauthorizedError, notFoundError, internalServerError, errorHandler };
