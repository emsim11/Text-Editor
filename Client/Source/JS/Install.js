document.addEventListener('DOMContentLoaded', function() {
    const InstallButton = document.getElementById('Install-Button');
    // Logic For Installing The PWA
    if (InstallButton) {
        // Add Event Listener Only If InstallButton Is Not Null
        InstallButton.addEventListener('click', async () => {
            // Add An Event Handler To The `BeforeInstallPrompt` Event
            window.addEventListener('beforeinstallprompt', (Event) => {
                window.deferredPrompt = Event;
                InstallButton.classList.toggle('Hidden', false);
            });
        });
    } else {
        console.error('InstallButton is null or not found');
    }
});

// Implement A Click Event Handler on The `InstallButton` Element
InstallButton.addEventListener('click', async () => {
    const PromptEvent = window.deferredPrompt;

    if (!PromptEvent) {
        return;
    }
    PromptEvent.prompt();
    window.deferredPrompt = null;
    InstallButton.classList.toggle('Hidden', true);
});

// Add A Handler For The `AppInstalled` Event
window.addEventListener('appinstalled', (Event) => {
    window.deferredPrompt = null;
});