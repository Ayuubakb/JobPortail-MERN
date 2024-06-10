import { createContext } from "react";

const context={
    userType:"",
    id:0,
    setUserType:()=>{},
    setId:()=>{}
}

const userContext=createContext(context);
export default userContext