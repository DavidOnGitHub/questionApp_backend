import * as koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import configKoa from './configs/koa';
import configMongodb from './configs/mongodb';
import configPassport from './configs/passport';
import apiRouter from './routes/api/api';
import {authenticate} from './utils/authUtil';

const app = configKoa();
configMongodb();
configPassport(app);

app.use(bodyParser());

const router = new Router();
router.use('/api', apiRouter.routes());

app.use(router.routes());

app.listen(3000, () => { 
    console.log('listening on port 3000');    
});
