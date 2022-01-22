const connection = require('./connection.js').connection;
const BusWayPoint = require('./checkpoints').BusWay;
const Route = require('./configs/checkpoints.json').BusRoute;

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
                player.customData.money = result[0].money;
                player.customData.name = result[0].name;
            }
            else player.outputChatBox(`Аккаунт не зарегистрирован, введите /reg <nickname>`);
        })
    } catch(err) {
        console.log(err);
    }
});

mp.events.add("playerEnterCheckpoint", (player, checkpoint) => {
    if(player.vehicle){
        checkpoint.hideFor(player);
        if(Object.keys(Route).length == player.customData.jobStep){
            player.vehicle.destroy();
            player.outputChatBox(`Маршрут пройден!`);
            return;
        }
        if(player.customData.nextIsStop){
            player.outputChatBox(`Остановка! Ожидайте 10 секунд.`)
            setTimeout(() => {
                player.outputChatBox(`Продолжайте движение.`);
                continueRoute();
            }, 10000);
        } else continueRoute()

    function continueRoute () {
        player.customData.nextIsStop = BusWayPoint(player.customData.jobStep);
        player.customData.jobStep += 1;
        try {
            const sql = "UPDATE `users` SET `money` = `money` + 100 WHERE `users`.`serial` = " + `'${player.serial}'`;
            connection.query(sql, function (err, result) {
                if(err) console.log(err);
                player.customData.money += 100;
                player.outputChatBox(`Деньги ( +100$ ) = ${player.customData.money}$`);
            })
        } catch(err) {
            console.log(err);
        }
    }
}
});
