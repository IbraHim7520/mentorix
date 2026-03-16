import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BACKKEND_URL,
    fetchOptions: {
        credentials: 'include'
    }
    
})


export default authClient;