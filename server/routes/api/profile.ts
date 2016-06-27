import * as Router from 'koa-router';
import {IProfile, Profile} from '../../models/Profile';

let router = new Router();

router.get('/', async function(ctx) {
    try {
        const profiles = await Profile.find({'firstName': 'David'}).exec();
        ctx.body = profiles;
    } catch(err) {
        ctx.response.status = 500;
        ctx.body = err.message;
    }
});

export default router;