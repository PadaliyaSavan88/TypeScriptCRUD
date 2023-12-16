import express from 'express'
import authentication from './authentication.router';
import usersRouter from './users.router';

const router = express.Router()

export default (): express.Router => {
    authentication(router)
    usersRouter(router)
    return router;
}