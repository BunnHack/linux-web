# CheerpX Linux Shell

This project runs a full Linux environment in the browser using [CheerpX](https://leaningtech.com/cheerpx/).

## Running Locally

CheerpX uses `SharedArrayBuffer` to achieve high performance, which requires the web page to be served in a **cross-origin isolated** context. This means the server must send specific HTTP headers:

- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Embedder-Policy: require-corp`

Failure to do so will result in a browser error, as CheerpX will not be able to initialize.

### Using Nginx

A simple way to serve the project locally with the correct headers is to use `nginx`.

1.  **Install Nginx:** If you don't have it, install nginx. Instructions can be found on the [official nginx website](https://nginx.org/en/docs/install.html).

2.  **Use the provided configuration:** This repository includes a `nginx.conf` file ready for local development. It's configured to listen on port `8080` and add the required headers.

3.  **Start the server:** Navigate to the project's root directory in your terminal and run:

    ```sh
    nginx -c nginx.conf -p .
    ```
    This command tells nginx to use the provided configuration file (`-c nginx.conf`) and set the working directory to the current directory (`-p .`).

4.  **Access the project:** Open your web browser and go to `http://localhost:8080`.

5.  **Stop the server:** When you are done, you can stop nginx with the following command from the same directory:
    ```sh
    nginx -s stop
    ```

### Note for Production

This setup is intended for local development. For a production environment, you must use **HTTPS**, as cross-origin isolation is only enabled on secure contexts (with `localhost` being a notable exception).