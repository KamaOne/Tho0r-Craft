export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('Tho0rCraftDB', 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('gallery')) {
        db.createObjectStore('gallery');
      }
    };
  });
};

export const saveGallery = async (gallery: any[]) => {
  try {
    const db = await initDB();
    return new Promise<void>((resolve, reject) => {
      const tx = db.transaction('gallery', 'readwrite');
      const store = tx.objectStore('gallery');
      const request = store.put(gallery, 'items');
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Failed to save gallery to IndexedDB:", error);
  }
};

export const loadGallery = async (): Promise<any[]> => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('gallery', 'readonly');
      const store = tx.objectStore('gallery');
      const request = store.get('items');
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Failed to load gallery from IndexedDB:", error);
    return [];
  }
};
