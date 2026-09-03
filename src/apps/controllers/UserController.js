const bcryptjs = require('bcryptjs');
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

  async update(req, res) {
    const {
      name,
      avatar,
      bio,
      gender,
      old_password,
      new_password,
      confirm_new_password,
    } = req.body;

    const user = await Users.findOne({ where: { id: req.userID } });

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    let encryptedPassword = '';

    if (old_password) {
      if (!await user.checkPassword(old_password)) {
        return res.status(401).json({ error: 'Senha antiga está incorreta!' });
      }

      if (!new_password || !confirm_new_password) {
        return res.status(401).json({ error: 'É necessário informar a nova senha e a confirmação da nova senha!' });
      }

      if (new_password !== confirm_new_password) {
        return res.status(401).json({ error: 'A nova senha e a confirmação da nova senha não conferem!' });
      }

      encryptedPassword = await bcryptjs.hash(new_password, 8);
    }

    await Users.update(
      {
        name: name || user.name,
        avatar: avatar || user.avatar,
        bio: bio || user.bio,
        gender: gender || user.gender,
        password_hash: encryptedPassword || user.password_hash,
      },
      { where: { id: req.userID } },
    );

    return res.send({ message: 'Usuário atualizado com sucesso' });
  }

  async delete(req, res) {
    const userToDelete = await Users.findOne({ where: { id: req.userID } });

    if (!userToDelete) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    await Users.destroy({ where: { id: req.userID } });

    return res.status(200).json({ message: 'Usuário deletado com sucesso' });
  }

  async userProfile(req, res) {
    const user = await Users.findOne({
      attributes: ['id', 'name', 'user_name', 'email', 'avatar', 'bio', 'gender'],
      where: {
        id: req.userID,
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    const {
      id, name, user_name, email, avatar, bio, gender,
    } = user;

    return res.status(200).json({
      user: {
        id, name, user_name, email, avatar, bio, gender,
      },
    });
  }
}

module.exports = new UserController();
