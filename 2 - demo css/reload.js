/**
 * Auto-reload script used during the demo.
 */
let last = {},
    files = [
        window.location.href,
        ...Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(
            (e) => e.href
        ),
        ...Array.from(document.querySelectorAll('script')).map((e) => e.src),
    ];

document.addEventListener('DOMContentLoaded', async () => {
    setInterval(async () => {
        for (let i = 0; i < files.length; i++) {
            const filename = files[i];
            const data = await fetch(filename).then((e) => e.text());
            if (last[filename] && last[filename] !== data)
                return window.location.reload();
            last[filename] = data;
        }
    }, 2000);
});
