'use strict';

const smartContract = require('./smart-contract');

const parseMessage = (message) => {
    return {
        messageId: message['code'],
        message: message['message'],
        username: message['username'],
        language: message['language'],
        date: message['date'],
        roomId: message['roomId']
    };
};

const parseRoom = (room) => {
    return {
        roomId: room['code'],
        name: room['name'],
        // All rooms persisted on blockchain are
        // public
        private: false
    };
};

class ChatService {
    async createMessage(message) {
        const transactionData = smartContract.contract.methods.createMessage(
            message.content,
            message.username,
            message.language,
            message.date,
            message.roomId).encodeABI();

        return await smartContract.sendSignedTransaction(transactionData);
    }

    async createRoom(room) {
        const transactionData = smartContract.contract.methods.createRoom(room.name).encodeABI();

        return await smartContract.sendSignedTransaction(transactionData);
    }

    async getMessages() {
        const messageIds = await smartContract.contract.methods.getMessages().call({ from: smartContract.caller });
        const promises = [];
        messageIds.forEach((messageId) => {
            promises.push(smartContract.contract.methods.getMessage(messageId).call({ from: smartContract.caller }));
        });
        const messages = await Promise.all(promises);
        return messages.map(parseMessage);
    }

    async getRoomMessages(roomId) {
        const messageIds = await smartContract.contract.methods.getRoomMessages(roomId).call({ from: smartContract.caller });
        const promises = [];
        messageIds.forEach((messageId) => {
            promises.push(smartContract.contract.methods.getMessage(messageId).call({ from: smartContract.caller }));
        });
        const messages = await Promise.all(promises);
        return messages.map(parseMessage);
    }

    async getRooms() {
        const roomIds = await smartContract.contract.methods.getRooms().call({ from: smartContract.caller });
        const promises = [];
        roomIds.forEach((roomId) => {
            promises.push(smartContract.contract.methods.getRoom(roomId).call({ from: smartContract.caller }));
        });
        const rooms = await Promise.all(promises);
        return rooms.map(parseRoom);
    }

    async getUserRooms(userId) {
        const roomIds = await smartContract.contract.methods.getUserRooms(userId).call({ from: smartContract.caller });
        const promises = [];
        roomIds.forEach((roomId) => {
            promises.push(smartContract.contract.methods.getRoom(roomId).call({ from: smartContract.caller }));
        });
        const rooms = await Promise.all(promises);
        return rooms;
    }

    async joinRoom(userId, roomId) {
        const transactionData = smartContract.contract.methods.joinRoom(userId, roomId).encodeABI();

        return await smartContract.sendSignedTransaction(transactionData);
    }

    async leaveRoom(userId, roomId) {
        const transactionData = smartContract.contract.methods.leaveRoom(userId, roomId).encodeABI();

        return await smartContract.sendSignedTransaction(transactionData);
    }
}

module.exports = new ChatService();