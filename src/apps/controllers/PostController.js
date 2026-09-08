const Posts = require('../models/Posts');
const Likes = require('../models/Likes');

class PostController {
  async create(req, res) {
    const { image, description } = req.body;

    const newPost = await Posts.create({
      image,
      description,
      author_id: req.userID,
    });

    if (!newPost) {
      return res.status(400).json({ message: 'Erro ao criar o post' });
    }

    return res.status(200).json({ data: { image, description } });
  }

  async delete(req, res) {
    const { id } = req.params;

    const verifyPost = await Posts.findOne({ where: { id } });

    if (!verifyPost) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }

    if (verifyPost.author_id !== req.userID) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    const deletedPost = await Posts.destroy({ where: { id } });

    if (!deletedPost) {
      return res.status(400).json({ message: 'Erro ao deletar o post' });
    }

    return res.status(200).json({ message: 'Post deletado com sucesso' });
  }

  async update(req, res) {
    const { id } = req.params;

    const verifyPost = await Posts.findOne({ where: { id } });

    if (!verifyPost) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }

    if (verifyPost.author_id !== req.userID) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    const postUpdate = await Posts.update(req.body, { where: { id } });

    if (!postUpdate) {
      return res.status(400).json({ message: 'Erro ao atualizar o post' });
    }

    return res.status(200).json({ message: 'Post atualizado com sucesso' });
  }

  async addLike(req, res) {
    const { id } = req.params;

    const verifyPost = await Posts.findOne({ where: { id } });

    if (!verifyPost) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }

    const verifyLike = await Likes.findOne({
      where: { user_id: req.userID, post_id: id },
    });

    if (verifyLike) {
      return res.status(400).json({ message: 'Você já curtiu este post' });
    }

    await Likes.create({ user_id: req.userID, post_id: id });

    const postUpdate = await Posts.update(
      { number_likes: verifyPost.number_likes + 1 },
      { where: { id } },
    );

    if (!postUpdate) {
      return res.status(400).json({ message: 'Erro ao adicionar like' });
    }

    return res.status(200).json({
      message: 'Like adicionado com sucesso',
      numberLikes: postUpdate.number_likes,
    });
  }
}

module.exports = new PostController();
