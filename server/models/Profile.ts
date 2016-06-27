import * as mongoose from 'mongoose';

interface IProfile extends mongoose.Document {
    username: string,
    accountId: string
}

var _schema: mongoose.Schema = new mongoose.Schema({
        username: {
            type: String,
            required: false
        },
        accountId: {
            type: String,
            required: true
        }
    });
    

var Profile = mongoose.model<IProfile>('Profile', _schema);

export {IProfile, Profile};