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
});

server.listen(3000);