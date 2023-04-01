import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores } from "../models/index.js";

export default class AutorController {
  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = autores.find();
      req.resultado = autoresResultado;
      next();
    } catch (err) {
      next(err);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autor = await autores.findById(id);

      if (autor !== null) {
        res.status(200).json(autor);
      } else {
        next(new NaoEncontrado("Id do autor não localizado."));
      }
    } catch (error) {
      next(error);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);
      await autor.save();
      res.status(201).send(autor.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autor = await autores.findById(id);
      if (autor == null) {
        next(new NaoEncontrado("Id do autor não localizado."));
      } else {
        await autores.findByIdAndUpdate(id, { $set: req.body });
        res.status(200).send({ message: "Autor atualizado com sucesso." });
      }
    } catch (error) {
      next(error);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autor = await autores.findById(id);
      if (autor == null) {
        next(new NaoEncontrado("Id do autor não localizado."));
      } else {
        await autores.findByIdAndDelete(id);
        res.status(200).send({ message: "Autor removido com sucesso" });
      }
    } catch (error) {
      next(error);
    }
  };
}
