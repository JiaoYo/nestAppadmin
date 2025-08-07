module.exports = {
  jwtSecretKey: 'MyNode',
  expiresIn: '10h',
  whiteList: ['/api/login', '/api/regUser', '/api/status']
}
export default module.exports;