import * as jwt from 'jwt-simple';
import {log} from './debugUtils';
import {IMiddleware} from 'koa-router';
import {XError, IXError, XErrorType} from '../models/XError';

const secret = 'temporary secret';
export function createToken(req: {
    hostname: string,
    accountId: string,
    createdTime: Date
    }): string {

    const expiryTime = new Date(req.createdTime.getTime() + 30 * 60000);
    var payload = {
        host: req.hostname,
        accountId: req.accountId,
        time: req.createdTime,
        expiryTime
    };
    
    return jwt.encode(payload, secret, 'HS512');
};

export function authenticate(ctx, next): IMiddleware {
    let token = ctx.request.header.authorization;
    if (!token) {
        ctx.response.status = 401;
        ctx.body = new XError(XErrorType.UNAUTHORIZED, 'User has not logged in');
        return null;
    }

    const accountId = ctx.request.accountId;
    const host = ctx.request.header.host;

    token = token.slice(7);
    const credentialsInToken = jwt.decode(token, secret);

    const expiryTime = new Date(credentialsInToken.expiryTime);
    const currentTime = new Date();

    if (accountId !== credentialsInToken.accountId || host !== credentialsInToken.host || expiryTime.getTime() < currentTime.getTime()) {
        ctx.response.status = 401;
        ctx.body = new XError(XErrorType.UNAUTHORIZED, 'User has not logged in');
        return null;
    }

    return next();
};
