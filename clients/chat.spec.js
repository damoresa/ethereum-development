'use strict';

// TODO: Add Mocha for assertions?

const chatService = require('./chat.service');

const main = async () => {
    try {
        console.log('Creates rooms');
        await chatService.createRoom({ name: 'Example room 1' });
        await chatService.createRoom({ name: 'Example room 2' });
        console.log('Finds rooms');
        const rooms = await chatService.getRooms();
        console.log(rooms);

        console.log('Creates messages');
        for (let roomCounter = 0; roomCounter < 2; roomCounter++) {
            for (let counter = 0; counter < 10; counter++) {
                await chatService.createMessage({
                    content: `${roomCounter}: Example message ${counter}`,
                    username: 'Example user',
                    language: 'es',
                    date: Date.now(),
                    roomId: roomCounter
                });
            }
        }
        console.log('Finds room messages');
        for (let roomCounter = 0; roomCounter < 2; roomCounter++) {
            const messages = await chatService.getRoomMessages(roomCounter);
            console.log(`Room ${roomCounter}`);
            console.log(messages);
        }
        console.log('Finds all messages');
        const messages = await chatService.getMessages();
        console.log(messages);

        console.log('Joins room');
        await chatService.joinRoom('Example user', 0);
        await chatService.joinRoom('Example user', 1);
        let userRooms = await chatService.getUserRooms('Example user');
        console.log(`Joined rooms: ${userRooms.length}`);

        console.log('Leaves room');
        await chatService.leaveRoom('Example user', 0);
        userRooms = await chatService.getUserRooms('Example user');
        console.log(`Joined rooms: ${userRooms.length}`);
    } catch (err) {
        console.error(err);
    }
};

main();
