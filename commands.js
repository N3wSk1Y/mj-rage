const connection = require('./connections.js').connection;

mp.events.addCommand('reg', (player, _, name) => {
    if (name && name.trim().length > 0) {
        try {
        const sql = "INSERT INTO `users` (`id`, `serial`, `name`, `money`, `job`) VALUES (NULL, " + `${player.serial}, ${name}, ${0}, NULL)`;
        connection.query(sql, function (err) {} )
        } catch(err) {
            console.error(err);
        }
    } else {
        player.outputChatBox(`ОШИБКА: /reg <nickname>`);
    }
}
);

mp.events.addCommand('startjob', (player) => {
    const pos = player.position;
    if(player.customData.vehicle){
        const sql = "INSERT INTO `users` (`id`, `serial`, `name`, `money`, `job`) VALUES (NULL, '1', '2', '3', '4')";
        connection.query(sql, function (err) {} )
    } else {
        player.outputChatBox(`ОШИБКА: Вы не в транспорте!`);
    }
}
);

mp.events.addCommand('info', (player) => {
    const pos = player.position;
    console.log(pos);
    console.log(player.serial);
}
);

mp.events.addCommand('spawnbus', (player) => {
    player.position = {
        x: 36.8188835144043,
        y: -24.30612564086914,
        z: 69.23573303222656
      }
    Vector3 = {
        x: 36.7188835144043,
        y: -24.30612564086914,
        z: 69.23573303222656
      }
    player.customData.vehicle = mp.vehicles.new(mp.joaat('airbus'), Vector3);
})

