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

  static async getArticleBySlug(slug) {
    const res = await fetch(
      `${config.backendUrl}/articles/${slug}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
    );

    return res.json();
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

    return res.json();
  }
}
