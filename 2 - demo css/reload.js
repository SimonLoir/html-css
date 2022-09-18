/**
 * Auto-reload script used during the demo.
 * This script is not part of the training.
 */

let last = {}, // Store that helps us keep track of the last known content of each file
    files = [
        // We add the current html file to the list of files to watch
        window.location.href,
        // We add the provided css files to the list of files to watch
        ...Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(
            (e) => e.href
        ),
        // We add the provided js files to the list of files to watch
        ...Array.from(document.querySelectorAll('script')).map((e) => e.src),
    ];

document.addEventListener('DOMContentLoaded', async () => {
    // We get the content of each file from the server each 2 seconds
    setInterval(async () => {
        for (let i = 0; i < files.length; i++) {
            const filename = files[i];
            const data = await fetch(filename).then((e) => e.text());

            // If the content of the file has changed, we reload the page
            if (last[filename] && last[filename] !== data)
                return window.location.reload();

            // We store the content of the file
            last[filename] = data;
        }
    }, 2000);
});
