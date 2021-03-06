const connection = require('./connection.js').connection;
const BusWayPoint = require('./checkpoints').BusWay;

mp.events.addCommand('reg', (player, _, name) => {
    if (name && name.trim().length > 0) {
        try {
            const sql = "INSERT INTO `users` (`id`, `serial`, `name`, `money`, `job`) VALUES (NULL, " + `'${player.serial}', '${name.trim()}', ${0}, NULL)`;
            connection.query(sql, function (err) {
                if(err) console.log(err)
            })
            player.outputChatBox(`Вы авторизовались как ${name.trim()}`);
        } catch(err) {
            console.log(err);
        }
    } else player.outputChatBox(`ОШИБКА: /reg <nickname>`);

}
);

mp.events.addCommand('startjob', (player) => {
    if(player.vehicle) {
        if(!player.customData.job) {
            if(player.customData.name) {
                const sql = "UPDATE `users` SET `job` = 'busDriver' WHERE `users`.`serial` = " + `'${player.serial}'`;
                connection.query(sql, function (err) {} )
                player.outputChatBox(`Работа водителя автобуса начата, двигайтесь по меткам! Закончить работу - /stopjob`)
                player.customData.job = 'busDriver';

                BusWayPoint(0);
                player.customData.jobStep = 1;
            } else player.outputChatBox(`ОШИБКА: Зарегистрировать аккаунт - /reg <nickname>`);
        } else player.outputChatBox(`ОШИБКА: Вы уже работаете. Уволиться с работы - /stopjob`);
    } else player.outputChatBox(`ОШИБКА: Вы не в транспорте!`);
}
);

mp.events.addCommand('stopjob', (player) => {
    if(player.customData.job) {
        const sql = "UPDATE `users` SET `job` = NULL WHERE `users`.`serial` = " + `'${player.serial}'`;
        connection.query(sql, function (err) {} )
        player.outputChatBox(`Вы были уволены с работы!`);
        player.vehicle.destroy();
    } else player.outputChatBox(`ОШИБКА: Вы не на работе!`);
}
);

mp.events.addCommand('info', (player) => {
    const pos = player.position;
    console.log(pos);
    console.log(player.serial);
    console.log(player.customData)
}
);

mp.events.addCommand('spawnbus', (player) => {
    player.position = {
        x: 42,
        y: -13,
        z: 69
      }
    Vector3 = {
        x: 36,
        y: -24,
        z: 69
      }
    mp.vehicles.new(mp.joaat('airbus'), Vector3);
})

