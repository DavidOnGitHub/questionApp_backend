import {expect} from 'chai';
import * as mongoose from 'mongoose';

import {IProfile, Profile} from '../../../server/models/Profile';

describe('Profile model', function() {
    it('should have correct properties in new instance', function() {
        let result = new Profile({
            username: 'test',
            accountId: '4'});
        expect(result.username).to.equal('test');
        expect(result.accountId).to.equal('4');
    })
})