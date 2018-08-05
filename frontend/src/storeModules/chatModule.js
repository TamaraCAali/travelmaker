//TODOS: loadchat, getChat
import chatService from '@/services/chatService';
export const LOAD_CHAT = 'room/loadByRoom';
export default {
    state: {
        chat: {
            _id: 'chat-room-mongo_id',
            room: 'activeUser_id + desireduser_id',
            usernames: ['Moshe', 'Omer'],
            msgs: [
                { creator: 1, msg: 'Lochets', createdAt: 1532595342052 },
                { creator: 0, msg: 'Whattt', createdAt: 1532595423061 },
                { creator: 1, msg: 'Yes', createdAt: 1532595787693 }
            ]
        }
    },
    mutations: {
        
    },
    actions: {
        [LOAD_CHAT](context, { room }) {
            return chatService.getByRoom(room);
        },
    },
    getters: {

    }
}