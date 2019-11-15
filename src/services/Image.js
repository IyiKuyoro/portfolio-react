import config from '../config';

export default class ImageService {
  static async uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('fileName', file.name.split('.')[0]);

    const res = await fetch(
      `${config.backendUrl}/images/upload`,
      {
        method: 'POST',
        body: formData,
      },
    );

    return res.json();
  }

  static async deleteImage(publicId) {
    const res = await fetch(
      `${config.backendUrl}/images?publicId=${publicId}`,
      {
        method: 'DELETE',
      },
    );

    return res.json();
  }
}
