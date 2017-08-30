module.exports = {
  'secret' : 'token created',
  'database' : 'mongodb://localhost/users-db',
  'permissions' : {
    'admin': ['PUT'],
    'user': ['GET']
  }
};
