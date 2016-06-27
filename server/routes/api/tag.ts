import * as Router from 'koa-router';
import {Tag} from '../../models/Tag';

const router = new Router();
router.get('/', async function(ctx) {
    try {
        ctx.body = await Tag.find({});
    } catch (err) {
        ctx.response.status = 500;
        ctx.body = err.message;
    }
});

export default router;