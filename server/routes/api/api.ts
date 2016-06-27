import * as Router from 'koa-router';
import profileRouter from './profile';
import answerRouter from './answer';
import checkAccountRouter from './checkAccount';
import loginRouter from './login';
import registerRouter from './register';
import questionRouter from './question';
import tagRouter from './tag';
import signUpRouter from './signUp';


const router = new Router();
router.use('/profile', profileRouter.routes());
router.use('/login', loginRouter.routes());
router.use('/register', registerRouter.routes());
router.use('/checkAccount', checkAccountRouter.routes());
router.use('/question', questionRouter.routes());
router.use('/answer', answerRouter.routes());
router.use('/tag', tagRouter.routes());
router.use('/signUp', signUpRouter.routes());

export default router;