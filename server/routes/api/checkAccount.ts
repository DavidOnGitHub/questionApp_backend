'use strict';

import * as Router from 'koa-router';
import {Account} from '../../models/Account';
import {Profile} from '../../models/Profile';
import {isEmail} from '../../utils/emailUtils';

let router = new Router();

router.post('/', async function(ctx) {
    let {account} = ctx.request.body;
    if (!account) {
        ctx.response.status = 400;
        ctx.body = 'account is not specified';
    } else {
        try{
            let accountFound = null;
            if (isEmail(account)) {
                accountFound = await Account.findOne({
                    email: account,
                    activationToken: null
                }).exec();
            } else {
                const profileFound = await Profile.findOne({username: account}).exec();
                if (profileFound) {
                    accountFound = await Account.findById(profileFound.accountId)
                }
            }
            
            const delay = new Promise(r => setTimeout(r, 2000));
            await delay;
            if (accountFound) {
                ctx.response.status = 417;
                ctx.body = {
                    message: 'Already exist'
                };
            } else {
                ctx.response.status = 200;
                ctx.body = {
                    message: 'Available'
                };
            }
        } catch (err) {
            ctx.response.status = 500;
            ctx.body = err.message;
        }
    }
});

export default router;