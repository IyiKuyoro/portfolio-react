import config from '../config';

export default class ImageService {
  static async uploadImage(file) {
    console.log(file.name.split('.')[0]);
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
}
