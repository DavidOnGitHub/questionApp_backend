import * as passport from 'koa-passport';
import * as passportLocal from 'passport-local';
import {Account} from '../models/Account';
import {Profile} from '../models/Profile';
import {isEmail} from '../utils/emailUtils';
import {log} from '../utils/debugUtils';

var LocalStrategy = passportLocal.Strategy;

function configPassport(app): void {
    app.use(passport.initialize());
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    const strategy = new LocalStrategy({usernameField: 'accountName'}, async function(accountName, password, done){
        const accountCriteria = {
            activationToken: null
        };

        try {
            let username = null, email = null;
            if (isEmail(accountName)) {
                email = accountName;
                Object.assign(accountCriteria, {
                    email
                });
            } else {
                username = accountName
                const profile = await Profile.findOne({
                    username
                }).exec();
                // log('profile ', profile);
                if (!profile) {
                    return done(null, false, {
                        message: 'User not found with user name ' + accountName
                    });
                } else {
                    Object.assign(accountCriteria, {
                        _id: profile.accountId 
                    });
                    
                }
            }
            const account = await Account.findOne(accountCriteria).exec();
            // log('account ', account);
            if (!account) {
                return done(null, false, {
                    message: 'User not found with email ' + accountName
                });
            } else {
                account.comparePassword(password, async function(err, isMatch) {
                    if (err) {
                        return done(err);
                    }
                    if (!isMatch) {
                        return done(null, false, {
                            message: 'Username password misMatch'
                        });
                    }
                    if (!username) {
                        const profile = await Profile.findOne({
                            accountId: account.id
                        }).exec();
                        if (!profile) {
                            return done(null, false, {
                                message: 'Profile not found'
                            });
                        }
                        username = profile.username;
                    }
                    return done(null, Object.assign({}, account.toJson(), {username}));
                });
            }
        } catch(error) {
            log('passport error ', error)
            return done(null, false, {
                message: error.message
            });
        }
    });
    passport.use(strategy);
    console.log('passport configured.');
}

export default configPassport;