import * as mongoose from 'mongoose';

interface IQuestion extends mongoose.Document {
    title: string,
    content: string,
    tags: Array<string>
    createdTime: Date,
    accountId: string
}

var _schema: mongoose.Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: false
    },
    createdTime: {
        type: Date,
        required: true
    },
    accountId: {
        type: String,
        required: true
    }
});

let Question = mongoose.model<IQuestion>('Question', _schema);

export {IQuestion, Question};