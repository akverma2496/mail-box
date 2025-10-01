import axios from "axios";
import { transformEmail } from "../../utilities/transformEmail";
import { emailActions } from "./email-slice";
import { db, ref, onValue } from "../../../firebase.config";
const mailDB = import.meta.env.VITE_DATABASE_KEY


export const sendEmailToInbox = ({ to, subject, body, email }) => {
    return async (dispatch) => {
        const receiver = transformEmail(to)
        const formatDate = new Date();
        const date = formatDate.toLocaleDateString();
        const time = formatDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        try {
            const { data } = await axios.post(
                `${mailDB}/users/${receiver}/inbox.json`,
                {
                    subject, body, from: email, date, time, read: false
                },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            console.log(data)
            // dispatch(emailActions.sendEmailToInbox({ subject, body, from:email, id: data.name }))

        } catch (error) {
            console.log(error.response.data.error.message);
        }
    }
}

export const sendEmailToSent = ({ to, subject, body, email }) => {
    return async (dispatch) => {
        const sender = transformEmail(email)
        const formatDate = new Date();
        const date = formatDate.toLocaleDateString();
        const time = formatDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        try {
            const { data } = await axios.post(
                `${mailDB}/users/${sender}/sent.json`,
                {
                    to, subject, body, date, time
                },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            console.log(data)
            dispatch(emailActions.sendEmailToSent({ to, subject, body, id: data.name, date, time }))

        } catch (error) {
            console.log(error.response.data.error.message);
        }
    }
}



export const setUpEmailState = (email) => {
    return async (dispatch) => {
        const user = transformEmail(email)
        try {
            const { data } = await axios.get(`${mailDB}/users/${user}.json`);
            console.log(data)
            dispatch(emailActions.setUpInboxMails(data?.inbox) || {})
            dispatch(emailActions.setUpSentMails(data?.sent) || {})
        } catch (error) {
            console.log(error.response.data.error.message);
        }
    }
}


export const deleteEmailFromInbox = (email, id) => {
    return async (dispatch) => {
        const user = transformEmail(email)
        try {
            const { data } = await axios.delete(`${mailDB}/users/${user}/inbox/${id}.json`);
            dispatch(emailActions.deleteEmailFromInbox(id))
        } catch (error) {
            console.log(error.response.data.error.message);
        }
    }
}

export const deleteEmailFromSent = (email, id) => {
    return async (dispatch) => {
        const user = transformEmail(email)
        try {
            const { data } = await axios.delete(`${mailDB}/users/${user}/sent/${id}.json`);
            dispatch(emailActions.deleteEmailFromSent(id))
        } catch (error) {
            console.log(error.response.data.error.message);
        }
    }
}



export const listenToInboxData = (email) => async (dispatch) => {
    console.log("somehow reached there")
    const user = transformEmail(email)
    const inboxRef = ref(db, `users/${user}/inbox/`);
    console.log(inboxRef)

    onValue(inboxRef, (snapshot) => {
        const inboxEmails = snapshot.val();
        if (inboxEmails) {
            dispatch(emailActions.setUpInboxMails(inboxEmails))
        }
    }, (error) => {
        console.log(error)
    });
};



export const markEmailAsRead = (id, value, email) => {
    console.log("hey going to make request")
    return async (dispatch) => {
        const user = transformEmail(email)

        try {
            const { data } = await axios.put(
                `${mailDB}/users/${user}/inbox/${id}.json`,
                {
                    ...value, read: true
                },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );

        } catch (error) {
            console.log(error);
        }
    }
}