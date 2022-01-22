const connection = require('./connection.js').connection;
const BusWayPoint = require('./checkpoints').BusWay;

mp.events.add('playerJoin', (player) => {
    player.customData = {};
    mp.players.forEach(_player => {
        if (_player != player)
            _player.call('playerJoinedServer', [player.id, player.name]);
    });
    player.health = 100;
    player.armour = 100;
    try {
        const sql = "SELECT * FROM `users` WHERE `serial` = " + `'${player.serial}'`;
        connection.query(sql, function (err, result) {
            if(err) console.log(err)
            if(result.length > 0) {
                player.outputChatBox(`Вы авторизовались как ${result[0].name}`);
                player.outputChatBox(`Деньги: ${result[0].money}$`);
            }
            else player.outputChatBox(`Аккаунт не зарегистрирован, введите /reg <nickname>`);
        })
    } catch(err) {
        console.log(err);
    }
});

function EnterCheckpoint(n) {
    BusWayPoint(n)
    return EnterCheckpoint(n+1);
}

mp.events.add("playerEnterCheckpoint", (player, checkpoint) => {
    // EnterCheckpoint(1);
    console.log(checkpoint);
    // checkpoint.destroy();
});

