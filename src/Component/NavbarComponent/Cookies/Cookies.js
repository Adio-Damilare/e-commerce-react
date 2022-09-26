import Cookies from "js-cookies";

export const SetCookies=(cookiesname,data)=>{
    Cookies.setItem(cookiesname,data,{
        expires:"15",
        secure:true,
        sameSite:"strict",
        path:"/"
    })
}

export const GetCookies=(cookiesname)=>{

    return Cookies.getItem(cookiesname)
}
export const RemovCookies=(cookiesname)=>{
Cookies.removeItem(cookiesname)
}