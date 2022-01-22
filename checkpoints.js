const checkpoints = require('./configs/checkpoints.json').BusRoute;

function BusWay(n) {
    if(checkpoints[n].strop === false) var color = [ 49, 0, 191, 50 ]
    else var color = [ 254, 257, 54, 50 ]
    mp.checkpoints.new(1, new mp.Vector3(checkpoints[n].x, checkpoints[n].y, checkpoints[n].z), 8,
    {
        direction: new mp.Vector3(checkpoints[n+1].x, checkpoints[n+1].y, checkpoints[n+1].z),
        color: color,
        visible: true,
        dimension: 0
    });
    return checkpoints[n].stop;
}

exports.BusWay = BusWay;