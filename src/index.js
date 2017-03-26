import http from 'http';
import ioServer from 'socket.io';

const server = http.createServer();
const io = ioServer(server);

const configs = [
    {
        uid: 'dface01',
        tappId: 93,
        locationId: 98482
    },
    {
        uid: 'dface02',
        tappId: 274728,
        locationId: 98482
    }
];

function getConfig(uid) {
    return configs.find(config => config.uid === uid);
}

io.on('connection', function (client) {
    client.on('register', (uid) => {
        const config = getConfig(uid);

        if (config) {
            client.join(uid);
            client.emit('config', config);
        }
    });

    client.on('changeTapp', ({ uid, tappId }) => {
        const config = getConfig(uid);

        if (config) {
            config.tappId = tappId;
            io.to(uid).emit('config', config)
        }
    });

    client.on('reload', (uid) => {
        const config = getConfig(uid);

        if (config) {
            io.to(uid).emit('reload');
        }
    });
});

server.listen(3000);