import * as Router from 'koa-router';
import * as passport from 'koa-passport';
import * as bodyParser from 'koa-bodyparser';
import {IAccount, Account} from '../../models/Account';
import {IProfile, Profile} from '../../models/Profile';
import {createToken} from '../../utils/authUtil';

import {log} from '../../utils/debugUtils';

let router = new Router();

router.post('/', function(ctx) {
    return passport.authenticate('local', function(user, info, status) {
        if (user) {
            let token = createToken({
                hostname: ctx.request.header.host,
                accountId: user.accountId, 
                createdTime: new Date()
            });
            ctx.response.status = 200; 
            ctx.body = {
                user,
                token
            };
        } else {
            console.log(info);
            ctx.response.status = 401;
            ctx.body = info;
        }
    })(ctx); 
    
});

export default router;