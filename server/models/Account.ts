'use strict';

import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';
import {log} from '../utils/debugUtils';

interface IAccount extends mongoose.Document {
	email: string,
	password: string,
    activationToken: string,
    comparePassword(password: string, callback: (err, isMatch) => any): void,
    toJson(): Object
};
var _schema: mongoose.Schema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: false
	},
    activationToken: {
        type: String,
        required: false
    }
});

_schema.method('comparePassword', function(password, callback) {
    return bcrypt.compare(password, this.password, callback);
});

_schema.method('toJson', function() {
    const account = this.toObject();
    account.id = account._id;
	delete account.password;
    delete account.__v;
    delete account.activationToken;
    delete account._id;

	return account;
})

_schema.pre('save', function(next) {
    let account: IAccount = this;
    if (!account.isModified()) {
        return next();
    }
    if (account.password === '') {
        if (!account.activationToken) {
            console.log('no password no activationToken');
            return next();
        }
    }
    bcrypt.genSalt(1000, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(account.password, salt, ()=>{} ,(err, hash) => {
            if (err) {
                return next(err);
            }
            account.password = hash;
            next();
        })
    })
})

var Account = mongoose.model<IAccount>('Account', _schema);

export {IAccount, Account};