import authClient from "@/lib/auth-client";

const getSession = async()=>{
    const ses = await authClient.getSession();

    return ses.data;
}

export default getSession;