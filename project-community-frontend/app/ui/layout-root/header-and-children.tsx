'use client'

import { createContext, useEffect, useState } from "react";
import Header from "./header";
import { preFetchUserEndpoint } from "@/app/lib/endpoints";
import { User } from "@/app/lib/types";

export const UserStateContext = createContext(null);

export default function HeaderAndChildren({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    console.log(" =============================== <HeaderAndChildren> =============================== ")

    const [user, setUser] = useState<User>();

    useEffect(()=>{
        preFetchUserEndpoint().then(user=>{
          console.log("登录的用户为: ", user);
          user != undefined && setUser(user);
        })
      }
    , [])

    return (
        <UserStateContext.Provider value={{"user": user, "setUser": setUser}}>
            
            {/** 头部 */}
            <Header/>

            {/** 内容 */ }
            <div className="main">
              {children}
            </div>
        </UserStateContext.Provider>
    )
}