import colors from 'colors';

const logger = (request, response, next) => {
    console.log(`request method: ${request.method} request.protocol: ${request.protocol} request url: ${request.hostname}${request.originalUrl}`);
    next();
};


export default logger;
