"use server"
import { requireUser } from "../lib/auth/session"
import { getBillsByUser } from "../lib/db/dashboard-db"


// server action for getting a Users Bills
export async function getUsersBillsAction(){
    const user = await requireUser();
    return getBillsByUser(user.id);
}