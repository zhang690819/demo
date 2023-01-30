import http from "@/utils/http";

export default {
    login: (data: httpPayLoad.UserData): Promise<string> => http<httpPayLoad.UserData,string>({url: "/user/login_pwd", method: "post", data})
}