import cors from 'cors';

const corsOptions = {
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
};

function corsHandler() {
    return cors(corsOptions);
}

export { corsHandler };
