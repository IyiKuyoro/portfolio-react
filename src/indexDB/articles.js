export function saveArticle(article) {
  return new Promise((resolve, reject) => {
    const storedArticle = {
      ...article,
      created: new Date(),
    };

    const openRequest = indexedDB.open('iyikuyoro-portfolio-database', 1);

    openRequest.onupgradeneeded = () => {
      const db = openRequest.result;
      if (!db.objectStoreNames.contains('articles')) {
        db.createObjectStore('articles', { keyPath: 'title' });
      }
    };

    openRequest.onerror = () => {
      console.log('Error', openRequest.error);
    };

    openRequest.onsuccess = () => {
      const db = openRequest.result;
      db.onversionchange = () => {
        db.close();
        alert('Database is outdated, please reload the page.');
      }

      // DB is ready for use
      const transaction = db.transaction('articles', 'readwrite');
      const articles = transaction.objectStore('articles');
      const request = articles.put(storedArticle);

      // Successfully saved new user to DB
      request.onsuccess = () => {
        resolve();
      };

      // Could not save new user to DB
      request.onerror = () => {
        reject();
      };
    };
  });
}

export function getArticle() {
  
}

export function deleteArticle() {

}
