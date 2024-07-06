import { openDB } from 'idb'

const InitDatabase = async () => {
    openDB('jate', 1, {
        upgrade(Database) {
            if (Database.objectStoreNames.contains('jate')) {
                console.log('JATE Database Already Exists');
                return;
            }
            Database.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
            console.log('Jate Database Created!');
        },
    });
}

// Add Logic To A Method That Accepts Some Content & Adds It To Database
export const PutDatabase = async (Content) => {
    console.log('PUT To The Database');
    const JateDatabase = await openDB('jate', 1);
    const Transaction = JateDatabase.transaction('jate', 'readwrite');
    const Store = Transaction.objectStore('jate');
    const Request = Store.put({ id: 1, value: Content });
    const Result = await Request;
    console.log('Data Saved To The Database!', Result.value);
};

// Add Logic For A Method That Gets All Content From The Database
export const GetDatabase = async () => {
    console.log('GET From The Database');
    const JateDatabase = await openDB('jate', 1);
    const Transaction = JateDatabase.transaction('jate', 'readonly');
    const Store = Transaction.objectStore('jate');
    const Request = Store.get(1);
    const Result = await Request;
    Result
        ? console.log('Data Retrieved From The Database!', Result.value)
        : console.log('Data Not Found In The Database');
    // Check If Variable Is Defined & If It Is Return It
    // See MDN Docs On Optional Chaining (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
    return Result?.value;
};

InitDatabase();