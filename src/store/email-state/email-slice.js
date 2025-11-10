import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    inbox: {},
    sent: {},
}

const emailSlice = createSlice({
    name: "email",
    initialState,
    reducers: {

        // whole setup from start or page refresh in a single request
        setUpInboxMails(state, action){
            state.inbox = action.payload
        },

        setUpSentMails(state, action){
            state.sent = action.payload
        },

        // sending and updating localstate every time
        sendEmailToInbox(state, action){
            state.inbox[action.payload.id] = action.payload
        },

        sendEmailToSent(state, action){
            state.sent[action.payload.id] = action.payload
        },

        // delete
        deleteEmailFromInbox(state, action){
            delete state.inbox[action.payload]
        },

        deleteEmailFromSent(state, action){
            delete state.sent[action.payload]
        }
    },  
})

export const emailActions = emailSlice.actions
export default emailSlice