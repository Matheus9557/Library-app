const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const sendMail = require('../lib/sendMail');

const store = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.readByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'O email já está em uso. Tente novamente com um email diferente.' });
    }

    const hash = await bcrypt.hash(password, parseInt(process.env.SALT, 10));
    const newUser = { name, email, password: hash };

    const user = await User.createAutoInc(newUser);
    await sendMail.createNewUser(newUser.email);

    res.status(201).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
};

const authenticate = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.readByEmail(email);

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = await jwt.sign(
        { userId: user.id },
        process.env.SECRET_KEY,
        { expiresIn: 3600 } // 1h
      );

      const tokenBearer = `Bearer ${token}`;

      res.set('Authorization', tokenBearer);
      res.json({ token });
    } else {
      console.log('Senha inválida.');
      res.status(401).json({ error: 'Senha inválida.' });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Token inválido ou usuário não cadastrado.' });
  }
};

module.exports = { store, authenticate };
