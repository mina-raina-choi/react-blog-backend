require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose'); 

const api = require('./api');


const {
    PORT: port = 4000,
    MONGO_URI: mongoURI
} = process.env


// 몽구스 연결
mongoose.Promise = global.Promise; // node의 promise를 사용하도록 설정...
mongoose.connect(mongoURI, { useNewUrlParser: true}).then(
    console.log('connected to mongoose')
).catch((e) => {
    console.error(e);
});

const app = new Koa();
const router = new Router();

// 라우터설정
router.use('/api', api.routes());

// 라우터적용전에 bodyparser
app.use(bodyParser());

// 앱 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log('listening to port ', port);
})