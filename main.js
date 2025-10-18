async function main() {
    const loader = document.getElementById('loader');

    try {
        // The read-only disk image from Leaning Technologies' fast cloud backend
        const cloudDevice = await CheerpX.CloudDevice.create(
            "wss://disks.webvm.io/debian_large_20230522_5044875331.ext2"
        );
        // Read-write local storage for disk blocks, it is used both as a cache and as persistent writable storage
        const idbDevice = await CheerpX.IDBDevice.create("block1");
        // A device to overlay the local changes to the disk with the remote read-only image
        const overlayDevice = await CheerpX.OverlayDevice.create(
            cloudDevice,
            idbDevice
        );
        // Direct access to files in your HTTP server
        const webDevice = await CheerpX.WebDevice.create("");
        // Convenient access to JavaScript binary data and strings
        const dataDevice = await CheerpX.DataDevice.create();

        const cx = await CheerpX.Linux.create({
            mounts: [
                { type: "ext2", path: "/", dev: overlayDevice },
                { type: "dir", path: "/app", dev: webDevice },
                { type: "dir", path: "/data", dev: dataDevice },
                { type: "devs", path: "/dev" },
            ],
        });

        // Interact with a console
        const consoleEl = document.getElementById("console");
        cx.setConsole(consoleEl);
        
        // Hide loader and show terminal
        loader.classList.add('hidden');
        
        const motd = `Welcome to CheerpX Linux Shell!
        
A full Linux environment is running in your browser.

Try some commands:
  ls -la
  python3
  cat /app/welcome.txt

`;
        // Use `cx.run` with `cat` to print the MOTD.
        await cx.run('/bin/cat', [], { stdin: motd });

        // Run a full-featured shell in your browser.
        await cx.run("/bin/bash", ["--login"], {
            env: [
                "HOME=/home/user",
                "USER=user",
                "SHELL=/bin/bash",
                "EDITOR=vim",
                "LANG=en_US.UTF-8",
                "LC_ALL=C",
                "TERM=xterm-256color",
            ],
            cwd: "/home/user",
            uid: 1000,
            gid: 1000,
        });

    } catch (err) {
        console.error(err);
        loader.innerHTML = `<p style="color: red;">An error occurred while loading CheerpX:</p><pre style="color: #ffcccc; max-width: 80%; overflow-wrap: break-word;">${err.message}</pre><p class="small-text">This might be due to missing Cross-Origin Isolation headers on the server.</p>`;
    }
}

main();
