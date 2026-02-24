"use client"
import { IUser } from "@/Interfaces/LoggedInUser.interface"
import authClient from "@/lib/auth-client"

export const UserSession = ()=>{
    const {data: session , isPending , error , refetch} = authClient.useSession()
    console.log(session)
    return {
        user: session?.user as IUser,
        session: session?.session,
        isPending,
        error,
        refetch
    }

}