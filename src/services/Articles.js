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
}
