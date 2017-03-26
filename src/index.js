import http from 'http';
import ioServer from 'socket.io';
import { getConfig, setTappId } from './repositorys/dface-repository';

const server = http.createServer();
const io = ioServer(server);

io.on('connection', function (client) {
    client.on('register', async(uid) => {
        const config = await getConfig(uid);

        if (config) {
            client.join(uid);
            client.emit('config', config);
        }
    });

    client.on('changeTapp',async ({ uid, tappId }) => {
        setTappId(uid, tappId);

        const config = await getConfig(uid);

        if (config) {
            config.tappId = tappId;
            io.to(uid).emit('config', config)
        }
    });

    client.on('reload', (uid) => {
        io.to(uid).emit('reload');
    });
});

server.listen(3000);