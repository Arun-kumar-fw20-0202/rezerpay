
const isAuth = async (req, res, next) => {
  try {
    const decode = {
        id: '123456789',
        name: 'John Doe',
        email: 'katillboyy@gmail.com',
    }
    req.profile = decode;
    next();
    //
  } catch (error) {
    return res.status(400).send({ message: error?.message, status: false });
  }
};

module.exports = isAuth;
