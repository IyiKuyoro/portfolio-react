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
        backendUrl: 'http://localhost:4000/api/v1',
        imageUploadPreset: 'example',
      };
  }
};

module.exports = config();
