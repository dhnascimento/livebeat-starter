import { ID } from "appwrite";
import { account } from "./appwrite";

export async function logIn(email: string) {
    const data = await account.createMagicURLSession(ID.unique(), email, `${window.location.origin}/session`);
}

export interface VerifySessionOptions {
    userId: string;
    secret: string;
}

export async function verifySession({ userId, secret }: VerifySessionOptions) {
    console.log({userId, secret})
    const data = await account.updateMagicURLSession(userId, secret);
    return data;
}

export async function getCurrentSession() {
    const session = await account.getSession('current');
    console.log(session);
    return {
        session
    }
}

export async function deleteCurrentSession() {
    await account.deleteSession('current');
}   