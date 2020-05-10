
const initializeIndexedDB = () => {
    if (!indexedDB) {
        return false;
    } else {
        return true;
    }
}

const createIndexedDB = (databaseName) => {
    let isInitialize = initializeIndexedDB();
    let request = null;
    if (isInitialize) {
        request = indexedDB.open(databaseName, 2);
      //  console.log("request", request);
    } else {
        request = false;
    }
    return request;
};

const insertIntoIndexedDb = (databaseName, storeName, items) => {
    console.log(databaseName, storeName, items);
    let request = createIndexedDB(databaseName);
    
        let db = null;
        request.onerror = (event)=> {
            console.log("error: ");
        };

        request.onsuccess = (event) =>{
            db = request.result;
           // console.log("success: " + db);
        };

        request.onupgradeneeded = ()=> {
            console.log("test");
            let db = request.result;
            if (!db.objectStoreNames.contains(storeName)) { // if there's no "books" store
                db.createObjectStore(storeName, { keyPath: 'id' }); // create it
            }

            let transaction = db.transaction([storeName], "readwrite");
            let storages = transaction.objectStore(storeName);
            request = storages.add(items);
    
            request.onerror = (event) => {
                console.log("Error", request.error);
            };

            request.onsuccess = (event) => { // (4)
                console.log("Book added to the store", request.result);
            };

        }




}






export { initializeIndexedDB, createIndexedDB, insertIntoIndexedDb }