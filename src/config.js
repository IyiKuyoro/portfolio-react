const config = () => {
  const env = process.env.NODE_ENV;

  switch (env) {
    case 'production':
      return {
        backendUrl: 'https://iyikuyoro-be.herokuapp.com/api/v1',
      };
    default:
      return {
        backendUrl: 'https://iyikuyoro-be.herokuapp.com/api/v1',
      };
  }
};

module.exports = config();
