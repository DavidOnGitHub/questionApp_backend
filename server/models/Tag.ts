import * as mongoose from 'mongoose';

interface ITag extends mongoose.Document {
    value: string
}

let _schema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    }
});

const Tag = mongoose.model<ITag>('Tag', _schema);

export {ITag, Tag};