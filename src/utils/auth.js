import jwt from "jsonwebtoken"
export const userid = (request) => {
    const auth = request.request
      ? request.request.headers.authorization
      : request.request.headers.Authorization;
    if (auth.length === 0) {
        return null 
    }
    const token = auth.split(' ')[1]
    const verify =  jwt.verify(token, "mysecret");
    if (!verify) {
        throw new Error("User Doesnt Exist")
    }
    return verify.id
}