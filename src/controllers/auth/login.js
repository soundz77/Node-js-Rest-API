import handleAuthAndLogin from "../../utils/auth/handleAuthAndLogin.js";

const login = (req, res, next) => {
  handleAuthAndLogin(req, res, next);
};

export default login;
