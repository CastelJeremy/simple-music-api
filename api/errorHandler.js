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

export { queryParamError, notFoundError, errorHandler };
