# MaterialM Login — React + Docker

Responsive login form inspired by the provided reference. Includes email validation, live password requirements, show/hide password, remember checkbox, and Docker/Nginx deployment.

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Deploy using Docker

Run these commands from this folder:

```bash
docker build -t materialm-login .
docker run -d -p 8080:80 --name materialm-container materialm-login
```

Open http://localhost:8080.

If the container name already exists:

```bash
docker rm -f materialm-container
docker run -d -p 8080:80 --name materialm-container materialm-login
```

Check / stop:

```bash
docker ps
docker logs materialm-container
docker stop materialm-container
```

## Password rules

- At least 8 characters
- One uppercase letter
- One lowercase letter
- One number
- One special symbol

Template - https://wrappixel.com/templates/materialm-free-tailwind-react-admin-template

The success message verifies only client-side form rules. This is a frontend demo and does not authenticate against a backend or database. Do not use it for real accounts without server-side authentication.
