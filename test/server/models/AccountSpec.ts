import {expect} from 'chai';
import * as mongoose from 'mongoose';

import {IAccount, Account} from '../../../server/models/Account';

describe('Account model', function() {
    beforeEach(function(done) {
        if (mongoose.connection.readyState === 0) {
            mongoose.connect('mongodb://localhost:27017/unittest', (err) => {
                if (err) {
                    throw err;
                } else {
                    done();
                }
            })
        }
    });
    it('should save with hashed password', function(done) {
        let account = new Account({
            email: 'test@test.com',
            password: '1234'});
        account.save(function(result) {
            expect(result.name).to.equal('test');
            expect(result.accountId).to.equal('4');
            done();
        });
    });
})