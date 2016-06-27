import * as Koa from 'koa';
import * as cors from 'koa-cors';

export default function() {
	const app = new Koa();
	app.use(cors());
	console.log('koa configured');
	return app;
};