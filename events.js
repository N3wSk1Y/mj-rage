const connection = require('./connections.js').connection;

mp.events.add('playerEnteredVehicle', (player) => {
    if (player.vehicle && player.seat === 0 || player.seat === 255)
        player.customData.vehicle = player.vehicle;
});

mp.events.add('playerExitVehicle', (player) => {
    if (player.vehicle && player.seat === 0 || player.seat === 255)
        player.customData.vehicle = undefined;
});

mp.events.add('playerJoin', (player) => {
    player.customData = {};
    mp.players.forEach(_player => {
        if (_player != player)
            _player.call('playerJoinedServer', [player.id, player.name]);
    });
    player.health = 100;
    player.armour = 100;
});

mp.events.add('playerQuit', (player) => {
    try {
        const sql = "TRUNCATE `u1566125_rage`.`users`";
        connection.query(sql, function (err) {} )
    } catch(err) {
        console.error(err);
    }
});


