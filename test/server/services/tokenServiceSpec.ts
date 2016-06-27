import {expect} from 'chai';
import tokenService = require('../../../server/utils/authUtil');

// var expect = chai.expect;

describe('tokenService', function() {
    it('should generate a token', function() {
        let mockRequest = {
            hostname: 'banyula.com.au',
            username: 'david.xg.dai@gmail.com',
            createdTime: new Date()
        };
        // let token = tokenService.createToken(mockRequest);
        // expect(token).not.to.be.undefined;
    });
});