import { unescape } from 'html-escaper';

window.addEventListener('load', async () => {
    if (self._title) {
        document.title = unescape(self._title);
    }

    if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.register(
            '/service-worker.js');
    }

    const onlineHandler = () => {
        console.log('online');
    };

    const offlineHandler = () => {
        console.log('offline');
    };

    if (navigator.onLine) {
        onlineHandler();
    } else {
        offlineHandler();
    }

    window.addEventListener('online', onlineHandler);
    window.addEventListener('offline', offlineHandler);
});