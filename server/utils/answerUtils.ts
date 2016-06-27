import {Profile} from '../models/Profile';
import {IAnswer} from '../models/Answer';
import {IQuestion} from '../models/Question';
import {log} from './debugUtils';

export async function getExtendedAnswer(answer: IAnswer, question: IQuestion) {
    const profile = await Profile.findOne({accountId: answer.accountId}).exec();
    const username = profile ? profile.username : 'removed account';
    return Object.assign({}, answer.toJSON(), {
        metadata: {
            username
        }
    });
};