const { decryptedToken } = require('../../utils/token');
const { decrypt } = require('../../utils/crypt');

const verifyJwt = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ massage: 'Unset token!' });
  }

  try {
    const { userId } = await decryptedToken(authHeader);
    req.userID = parseInt(decrypt(userId));

    return next();
  } catch (error) {
    return res.status(401).json({ error });
  }
};

module.exports = verifyJwt;
