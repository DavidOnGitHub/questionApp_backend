import * as mongoose from 'mongoose';

export default function() {
	mongoose.connect('mongodb://localhost:27017/questionApp');
	let db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error.....'));
	db.once('open', function callback() {
		console.log('questionApp db opened');
	});
};
