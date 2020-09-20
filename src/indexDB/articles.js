/* eslint-disable no-alert */
/* eslint-disable no-console */
function upgradeNeeded(openRequest) {
  const db = openRequest.result;
  if (!db.objectStoreNames.contains('articles')) {
    db.createObjectStore('articles', { keyPath: 'key' });
  }
}

function onError(openRequest) {
  console.error('Error', openRequest.error);
}

function onVersionChange(db) {
  db.close();
  alert('Database is outdated, please reload the page.');
}

export function saveArticle(article) {
  return new Promise((resolve, reject) => {
    const storedArticle = {
      ...article,
      created: new Date(),
    };

    const openRequest = indexedDB.open('iyikuyoro-portfolio-database', 1);
    openRequest.onupgradeneeded = upgradeNeeded;
    openRequest.onerror = () => onError(openRequest);

    openRequest.onsuccess = () => {
      const db = openRequest.result;
      db.onversionchange = () => onVersionChange(db);

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
  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open('iyikuyoro-portfolio-database', 1);
    openRequest.onupgradeneeded = () => upgradeNeeded(openRequest);
    openRequest.onerror = () => onError(openRequest);

    openRequest.onsuccess = () => {
      const db = openRequest.result;
      db.onversionchange = () => onVersionChange(db);

      // DB is ready for use
      const transaction = db.transaction('articles', 'readwrite');
      const articles = transaction.objectStore('articles');
      const request = articles.getAll();

      request.onsuccess = () => {
        if (request.result !== undefined) {
          const last = request.result.length - 1;
          resolve(request.result[last]);
        } else {
          resolve(undefined);
        }
      };

      request.onerror = () => {
        reject();
      };
    };
  });
}

export function deleteArticle() {
  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open('iyikuyoro-portfolio-database', 1);
    openRequest.onupgradeneeded = () => upgradeNeeded(openRequest);
    openRequest.onerror = () => onError(openRequest);

    openRequest.onsuccess = () => {
      const db = openRequest.result;
      db.onversionchange = () => onVersionChange(db);

      const transaction = db.transaction('articles', 'readwrite');
      const articles = transaction.objectStore('articles');
      const request = articles.clear();

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject();
      };
    };
  });
}
