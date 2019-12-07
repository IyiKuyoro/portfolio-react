import { ajax } from 'rxjs/ajax';

import config from '../config';

export default class ArticlesService {
  static async getAllArticles() {
    const res = await fetch(
      `${config.backendUrl}/articles`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
    );

    return res.json();
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

  static async publishArticle(article, userToken) {
    const res = await fetch(
      `${config.backendUrl}/articles`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(article),
      },
    );

    if (res.status === 401) {
      throw Error('Your session has expired.');
    }

    return res.json();
  }

  static async republishArticle(article, slug, userToken) {
    const res = await fetch(
      `${config.backendUrl}/articles/${slug}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(article),
      },
    );

    if (res.status === 401) {
      throw Error('Your session has expired.');
    }

    return res.json();
  }
}
