import { Workbox } from 'workbox-window'
import Editor from './Editor'
import './Database'
import '../CSS/Style.css'

const Main = document.querySelector('#Main');
Main.innerHTML = '';

const LoadSpinner = () => {
    const Spinner = document.createElement('div');
    Spinner.classList.add('Spinner');
    Spinner.innerHTML = `
        <div class="Loading-Container">
            <div class="Loading-Spinner">
        </div>
    `;
    Main.appendChild(Spinner);
};

const Editor = new Editor();

if (typeof Editor === 'undefined') {
    LoadSpinner();
}

// Check If Service Workers Are Supported
if ('ServiceWorker' in navigator) {
    // Register Workbox Service Worker
    const WorkboxSW = new Workbox('/Source/SW.js');
    WorkboxSW.register();
} else {
    console.error('Service Workers Are Not Supported In This Browser');
}