import React from 'react';

const MySessionPage = async() => {
    const sessionsResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/tutoring-sessions/tutor-sessions`, {credentials: 'include'});
    const sessionData = await sessionsResponse.json();
    console.log( "Session Data:------->",sessionData)
    return (
        <div>
            this is my session page
        </div>
    );
};

export default MySessionPage;