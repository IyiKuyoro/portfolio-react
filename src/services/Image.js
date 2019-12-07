import { ajax } from 'rxjs/ajax';

import config from '../config';

export default class ImageService {
  static uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('fileName', file.name.split('.')[0]);

    return ajax({
      url: `${config.backendUrl}/images/upload`,
      method: 'POST',
      body: formData,
    });
  }

  static deleteImage(publicId) {
    return ajax({
      url: `${config.backendUrl}/images?publicId=${publicId}`,
      method: 'DELETE',
    });
  }
}
