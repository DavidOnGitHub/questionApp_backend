import * as Router from 'koa-router';
import {Question, IQuestion} from '../../models/Question';
import {Answer, IAnswer} from '../../models/Answer';
import {ITag, Tag} from '../../models/Tag';
import {getExtendedAnswer} from '../../utils/answerUtils';

import {log} from '../../utils/debugUtils';
import {authenticate} from '../../utils/authUtil';

let router = new Router();

router.get('/', async function(ctx) {
    try {
        ctx.body = await Question.find(ctx.request.query);
    } catch (err) {
        ctx.response.status = 500;
        ctx.body = err.message;
    }
});

router.get('/:id/answer', async function(ctx) {
    try {
        const question = await Question.findById(ctx.params.id).exec();
        const answers = await Answer.find({
            questionId: ctx.params.id
        }).exec();
        
        const promises = answers.map((answer) => getExtendedAnswer(answer, question));
        ctx.body = await Promise.all(promises);
    } catch (err) {
        ctx.response.status = 500;
        ctx.body = err.message;
    }
});

router.post('/', authenticate, async function(ctx) {
    const questionJson = Object.assign({}, ctx.request.body, {
        createdTime: new Date()
    });
    const questionToSave = new Question(questionJson);
    try {
         const question = await questionToSave.save<IQuestion>();
         const tags = await Tag.find({value: { '$in': question.tags}}).exec();
        
         question.tags.forEach(async function(tag) {
             if (!tags.find((questionTag) => questionTag.value === tag)) {
                 const newTag = new Tag();
                 newTag.value = tag;
                 await newTag.save<ITag>();
             }
         });
         ctx.body = question;
    } catch (err) {
        ctx.response.status = 500;
        ctx.body = err.message;
    }
});

router.put('/:id', async function(ctx) {
    try {
        const {title, content} = ctx.request.body;
        const question = await Question.findById(ctx.params.id).exec();
        Object.assign(question, {title, content});
        ctx.body = await question.save();
    } catch(err) {
        ctx.response.status = 500;
        ctx.body = err.message;
    }
});

export default router;