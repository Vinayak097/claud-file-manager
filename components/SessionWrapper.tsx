"use client"

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{session :Session}>


export default  function SessionWrapper({session, children}:Props){
   
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}