// APIサーバ機能
import express from "express";
import bodyParser from 'body-parser';

const app = express();
app.set('port', (process.env.PORT || 8080));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Run Server
app.listen(app.get('port'), function () {
    console.log('server launched');
});

// ルートページ
app.get('/', function (req, res) {
    res.header('Content-Type', 'text/plain;charset=utf-8');
    res.status(200);
    res.send('Bot Rebooted');
    console.log('root page accessed');
});


import schedule from 'node-schedule';
import * as room from './src/Room';
import * as usersSettings from './src/UsersSettings';

let users = usersSettings.setup();

// 時限式で強制ログアウト
schedule.scheduleJob({
    minute: [...Array(6).keys()].map(i => i * 10)
}, function () {
    room.getStayingUsers(users);
});

room.getStayingUsers(users);
