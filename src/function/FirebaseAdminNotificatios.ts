import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";
import fetch from "node-fetch";

admin.initializeApp();

export const sendPushOnNotificationCreate =
    onDocumentCreated("notifications/{id}", async (event) => {

        const data = event.data?.data();
        if (!data) return;

        const { toUserId, fromUserId, type, postId } = data;

        if (toUserId === fromUserId) return;

        const receiverSnap = await admin.firestore()
            .doc(`users/${toUserId}`)
            .get();

        const expoPushToken = receiverSnap.data()?.expoPushToken;
        if (!expoPushToken) return;

        const senderSnap = await admin.firestore()
            .doc(`users/${fromUserId}`)
            .get();

        const senderName = `${senderSnap.data()?.firstName} ${senderSnap.data()?.lastName}` || "Someone";

        let body = "";

        if (type === "FOLLOW")
            body = `${senderName} started following you`;

        if (type === "LIKE")
            body = `${senderName} liked your post`;

        await fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                to: expoPushToken,
                title: "New notification",
                body,
                sound: "default",
                data: {
                    type,
                    fromUserId,
                    postId,
                },
            })
        });
    });
