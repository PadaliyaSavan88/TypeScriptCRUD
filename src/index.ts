import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import router from './router';
import "./config/mongoose"

const app = express()

app.use([
    cors({ credentials: true }),
    cookieParser(),
    compression(),
    express.json()
])

app.use(bodyParser.urlencoded({
    extended: true
}))

// const server = http.createServer(app)
app.listen(8080, () => {
    console.log("Magic Happens At Port 8080!!")
})
app.use('/', router())