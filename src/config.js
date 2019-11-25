const config = () => {
  const env = process.env.NODE_ENV;

  switch (env) {
    case 'production':
      return {
        backendUrl: 'https://iyikuyoro-be.herokuapp.com/api/v1',
        imageUploadPreset: 'portfolio-assets',
      };
    default:
      return {
        backendUrl: 'https://iyikuyoro-staging.herokuapp.com/api/v1',
        imageUploadPreset: 'example',
      };
  }
};

module.exports = config();
