import { GetDatabase, PutDatabase } from './Database'
import { Header } from './Header'

export default class {
    constructor() {
        const LocalData = localStorage.getItem('Content');

        // Check If CodeMirror Is Loaded
        if (typeof CodeMirror === 'undefined') {
            throw new Error('CodeMirror Is Not Loaded');
        }

        this.Editor = CodeMirror(document.querySelector('#Main'), {
            Value: '',
            Mode: 'javascript',
            theme: 'MonoKai',
            LineNumbers: true,
            LineWrapping: true,
            AutoFocus: true,
            IdentUnit: 2,
            TabSize: 2,
        });

        // When Editor's Ready, Set Value To Whatever Is Stored In IndexedDatabase
        // Fall Back To Local Storage If Nothing Is Stored In IndexedDatabase
        // If Neither Is Available, Set The Value To Header
        GetDatabase().then((Data) => {
            console.info('Loaded Data From IndexedDatabase, Injecting Into Editor');
            this.Editor.setValue(Data || LocalData || Header);
        });

        this.Editor.on('change', () => {
            localStorage,setItem('Content', this.Editor,getValue());
        });

        // Save Content Of Editor When Editor Itself Loses Focus
        this.Editor.on('blur', () => {
            console.log('The Editor Has Lost Focus');
            PutDatabase(localStorage.getItem('Content'));
        });
    }
}