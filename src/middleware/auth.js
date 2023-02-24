import jwt from 'jsonwebtoken';
const { promisify } = require('util');

module.exports = {
  eAdmin: async function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(400).json({
        erro: true,
        message:
          'Erro: Necessárior realizar o login para acessar a página! {Missed Token}',
      });
    }
    const [, token] = authHeader.split(' ');

    if (!token) {
      res.status(400).json({
        erro: true,
        message:
          'Erro: Necessárior realizar o login para acessar a página! {Missed AccessToken?}',
      });
    }
    try {
      const decode = await promisify(jwt.verify)(token, 'secret');
      req.medicoCpf = decode.cpf;
      req.medicoId = decode.id;
      req.pacienteCpf = decode.cpf;
      req.pacienteId = decode.id
      req.admCpf = decode.cpf;
      return next();
    } catch (error) {
      res.status(400).json({
        erro: true,
        message:
          'Erro: Necessárior realizar o login para acessar a página! {Missed AccessToken}',
      });
    }
  },
};
