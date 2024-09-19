const BasePath = "http://localhost:8000/api/v1/";

//#region User
export const SignUpPath = BasePath + "user/signup";
export const SignInPath = BasePath + "user/signin";
export const UpdatePath = BasePath + "user";
export const GetUsersPath = BasePath + "user/bulk";
export const GetMe = BasePath + "user/me";
//#endregion

//#region Account
export const GetBalancePath = BasePath + "account/balance";
export const TransferPath = BasePath + "account/transfer";
//#endregion
