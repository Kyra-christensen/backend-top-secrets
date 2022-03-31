const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = class UserService {
  static async create({ email, password }) {
    const passwordHash = await bcrypt.hashSync(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const user = await User.insert({
      email,
      passwordHash,
    });
    
    return user;
  }

  static async signIn({ email, password }) {
    const user = await User.findByEmail(email);

    if(!user) throw new Error('Invalid email');
      
    const passwordMatch = bcrypt.compareSync(password, user.passwordHash);

    if(!passwordMatch) throw new Error('Invalid password');

    return user;
  }
};
