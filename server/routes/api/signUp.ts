import * as Router from 'koa-router';
import {jsonMessage} from '../../utils/JsonUtils';
import {Account, IAccount} from '../../models/Account';
import {sendSignUpEmail} from '../../utils/emailUtils';
import {randomString} from '../../utils/stringUtils';

const router = new Router();
router.post('/', async function(ctx) {
    let {email} = ctx.request.body;
    if (!email) {
        ctx.response.status = 400;
        ctx.body = jsonMessage('email or password or name required');
    } else {
        try {
            const account = await Account.findOne({email}).exec();
            if (account && !account.activationToken) {
                ctx.response.status = 400;
                ctx.body = jsonMessage('Email address already registered');
            } else {
                const activationToken = randomString(60);
                const activationUrl = `http://localhost:8888/password?email=${email}&activationToken=${activationToken}`;
                const accountToSave = account || new Account();
                Object.assign(accountToSave, {email, activationToken});
                await accountToSave.save();
                await sendSignUpEmail(email, activationUrl);
                ctx.status = 200;
                ctx.body = jsonMessage('Sign up successful');
            }
        } catch (err) {
            ctx.response.status = 500;
            ctx.body = jsonMessage(err.message);
        }
    }
});

export default router;