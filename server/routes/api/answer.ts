import * as Router from 'koa-router';

import * as mongoose from 'mongoose';
import {IAnswer, Answer} from '../../models/Answer';
import {Account} from '../../models/Account';
import {Question} from '../../models/Question';
import {getExtendedAnswer} from '../../utils/answerUtils';
import {jsonMessage} from '../../utils/jsonUtils';
import {authenticate} from '../../utils/authUtil';
import {log} from '../../utils/debugUtils';

const router = new Router();

router.post('/', authenticate, async function(ctx) {
    let answerToSave = new Answer(ctx.request.body);
    answerToSave.createdTime = new Date();
    try {
        const answer = await answerToSave.save<IAnswer>();
        const question = await Question.findById(answer.questionId).exec();
        const extendedAnswer = await getExtendedAnswer(answer, question);
        if (!extendedAnswer) {
            ctx.body = jsonMessage('Error calculating metadata');
            return;
        }
        
        ctx.body = extendedAnswer;
    } catch(err) {
        console.log(`error = ${err}`);
        ctx.body = err;
    }
});

export default router;