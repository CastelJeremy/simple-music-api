function logHandler(req, res, next) {
    const today = new Date();
    const date = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate(),
        hours: today.getHours(),
        minutes: today.getMinutes(),
    };

    console.log(
        `${date.year}-${date.month}-${date.day} ${date.hours}:${date.minutes} - Something is happening at: ${req.originalUrl}`
    );
    
    next();
}

export { logHandler };
