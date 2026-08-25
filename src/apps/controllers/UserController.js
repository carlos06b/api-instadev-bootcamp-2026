const Users = require('../models/Users');

class UserController {
  async create(req, res) {
    const verifyUser = await Users.findOne({ where: { email: req.body.email } });

    if (verifyUser) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    const user = await Users.create(req.body);

    if (!user) {
      return res.status(400).json({ error: 'Erro ao criar usuário' });
    }
    return res.send({ message: 'Usuário criado com sucesso' });
  }
}
module.exports = new UserController();
