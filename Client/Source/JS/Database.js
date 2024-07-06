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
    console.error('PutDatabase Not Implemented');
}

// Add Logic For A Method That Gets All Content From The Database
export const GetDatabase = async () => {
    console.error('GetDatabase Not Implemented');
}

InitDatabase();