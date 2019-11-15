const config = () => {
  const env = process.env.NODE_ENV;

  switch (env) {
    case 'production':
      return {
        backendUrl: 'https://iyikuyoro-staging.herokuapp.com/',
      };
    default:
      return {
        backendUrl: 'http://localhost:4000/api/v1',
      };
  }
};

module.exports = config();
