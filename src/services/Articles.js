import { ajax } from 'rxjs/ajax';

import config from '../config';

export default class ArticlesService {
  static getAllArticles() {
    return ajax({
      url: `${config.backendUrl}/articles`,
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
  }

  static getArticleBySlug(slug) {
    return ajax({
      url: `${config.backendUrl}/articles/${slug}`,
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
  }

  static publishArticle(article, userToken) {
    return ajax({
      url: `${config.backendUrl}/articles`,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(article),
    });
  }

  static republishArticle(article, slug, userToken) {
    return ajax({
      url: `${config.backendUrl}/articles/${slug}`,
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(article),
    });
  }
}
