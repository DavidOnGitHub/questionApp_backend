import * as Router from 'koa-router';
import {IProfile, Profile} from '../../models/Profile';
import {IAccount, Account} from '../../models/Account';
import {jsonMessage} from '../../utils/JsonUtils';
import {log} from '../../utils/debugUtils';

let router = new Router();

router.post('/', async function(ctx) {
    let {email, password, username, activationToken} = ctx.request.body;
    log('username is ', username);
    if (!email || !password || !username) {
        ctx.response.status = 400;
        ctx.body = jsonMessage('email or password or username required');
    } else {
        try {
            const account = await Account.findOne({email}).exec();
            if (account) {
                console.log(`client = ${activationToken}`);
                console.log(`server = ${account.activationToken}`);
                if (activationToken === account.activationToken) {
                    account.password = password;
                    account.activationToken = null;
                    await account.save<IAccount>();
                    const newProfile = new Profile({
                        username,
                        accountId: account.id
                    });
                    await newProfile.save<IProfile>();
                    ctx.status = 200;
                    ctx.body = jsonMessage('Account and Profile successfully saved');
                } else if (account.activationToken) {
                    ctx.response.status = 400;
                    ctx.body = jsonMessage('activationToken mismatch');
                } else {
                    ctx.response.status = 400;
                    ctx.body = jsonMessage('account already registered');
                }
            } else {
                ctx.status = 400;
                ctx.body = jsonMessage('Account has not been signed up yet');
            }
        } catch (err) {
            console.log(err);
            ctx.response.status = 500;
            ctx.body = jsonMessage(err.message);
        }
    }
});

export default router;