const Route = require('./configs/checkpoints.json').BusRoute;

function BusWay(n) {
    const config = Route[n];
    const IsStop = config.stop;

    if(!IsStop) var color = [ 49, 0, 191, 50 ]
    else var color = [ 254, 257, 54, 50 ]
    const point = mp.checkpoints.new(1, new mp.Vector3(config.x, config.y, config.z), 8,
    {
        direction: new mp.Vector3(config.x, config.y, config.z),
        color: color,
        visible: true,
        dimension: 0
    });
    return IsStop;
}

exports.BusWay = BusWay;
