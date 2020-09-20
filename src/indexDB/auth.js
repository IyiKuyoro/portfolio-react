/* eslint-disable no-alert */
/* eslint-disable no-console */
export function saveUser(userInfo) {
  return new Promise((resolve, reject) => {
    const storedInfo = {
      ...userInfo,
      created: new Date(),
    };

    const openRequest = indexedDB.open('iyikuyoro-portfolio-database', 1);

    openRequest.onupgradeneeded = () => {
      const db = openRequest.result;
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'userName' });
      }
    };

    openRequest.onerror = () => {
      console.error('Error', openRequest.error);
    };

    openRequest.onsuccess = () => {
      const db = openRequest.result;
      db.onversionchange = () => {
        db.close();
        alert('Database is outdated, please reload the page.');
      };

      // DB is ready for use
      const transaction = db.transaction('users', 'readwrite');
      const users = transaction.objectStore('users');
      const request = users.add(storedInfo);

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

export function getUser() {
  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open('iyikuyoro-portfolio-database', 1);

    openRequest.onupgradeneeded = () => {
      const db = openRequest.result;
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'userName' });
      }
    };

    openRequest.onerror = () => {
      console.error('Error', openRequest.error);
    };

    openRequest.onsuccess = () => {
      const db = openRequest.result;
      db.onversionchange = () => {
        db.close();
        alert('Database is outdated, please reload the page.');
      };

      // DB is ready for use
      const transaction = db.transaction('users', 'readwrite');
      const users = transaction.objectStore('users');
      const request = users.getAll();

      request.onsuccess = () => {
        if (request.result !== undefined) {
          resolve(request.result[0]);
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

export function clearUser() {
  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open('iyikuyoro-portfolio-database', 1);

    openRequest.onupgradeneeded = () => {
      const db = openRequest.result;
      if (!db.objectStoreNames.contains('users')) {
        reject();
      }
    };

    openRequest.onerror = () => {
      console.error('Error', openRequest.error);
    };

    openRequest.onsuccess = () => {
      const db = openRequest.result;
      db.onversionchange = () => {
        db.close();
        alert('Database is outdated, please reload the page.');
      };

      // DB is ready for use
      const transaction = db.transaction('users', 'readwrite');
      const users = transaction.objectStore('users');
      const request = users.clear();

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject();
      };
    };
  });
}
