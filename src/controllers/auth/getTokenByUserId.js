import TokenModel from "../../models/TokenModel.js";

const getTokenByUserId = async (req) => {
  const token = await TokenModel.findOne({ userId: req.params.userId });
  return token;
};

export default getTokenByUserId;
