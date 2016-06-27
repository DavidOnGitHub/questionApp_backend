import * as mongoose from 'mongoose';

interface IAnswer extends mongoose.Document {
    content: string,
    createdTime: Date,
    questionId: string,
    accountId: string
}

let _schema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    createdTime: {
        type: Date,
        required: true
    },
    questionId: {
        type: String,
        required: true
    },
    accountId: {
        type: String,
        required: true
    }
});

const Answer = mongoose.model<IAnswer>('Answer', _schema);

export {IAnswer, Answer};