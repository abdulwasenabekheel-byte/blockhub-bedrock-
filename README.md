# BlockHub Bedrock — free static starter

A responsive GitHub Pages starter for a Minecraft Bedrock server directory and world listings.

## Important limits

- GitHub Pages hosts static HTML/CSS/JavaScript. It does not run a Bedrock Dedicated Server, a database, or backend APIs.
- “Add listing” and “Publish listing” save to the current browser only (`localStorage`). Other visitors will not see them, and they disappear if that browser's site data is cleared.
- The sample server is deliberately a placeholder, not a real server.
- Microsoft sign-in here uses MSAL for Microsoft consumer account identity. It does **not** authenticate the user to Xbox Live/Minecraft, grant Minecraft ownership, or automatically join a Bedrock server.
- No passwords are requested or stored by this site. Do not add a client secret to browser code.

## 1. Create the GitHub repository

1. Sign in at https://github.com/.
2. Click **+ → New repository**.
3. Name it `blockhub-bedrock`.
4. Choose **Public** (GitHub Free supports Pages for public repositories).
5. Create the repository.
6. Click **Add file → Upload files** and upload `index.html`, `style.css`, `app.js`, and `README.md` from this folder. Commit the files.

## 2. Publish with GitHub Pages

1. In the repository, open **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Choose branch `main`, folder `/(root)`, then **Save**.
4. Wait for the deployment. The address will look like `https://YOUR-USERNAME.github.io/blockhub-bedrock/`.
5. Open the site over HTTPS. Each time you push a commit to `main`, Pages redeploys.

Official guide: https://docs.github.com/en/pages/getting-started-with-github-pages

## 3. Configure Microsoft sign-in (optional)

1. Open https://entra.microsoft.com/ and go to **App registrations → New registration**.
2. Name it `BlockHub Bedrock`.
3. For account type, choose the option supporting **personal Microsoft accounts**. If you want only personal Microsoft accounts, select that option; if you want organizational accounts too, select the combined option.
4. Register the app and copy the **Application (client) ID**.
5. Under **Authentication**, add a **Single-page application (SPA)** platform and set its redirect URI to your exact GitHub Pages URL, for example `https://YOUR-USERNAME.github.io/blockhub-bedrock/`. Keep the trailing slash if your site URL has it.
6. In `app.js`, replace `PASTE_YOUR_MICROSOFT_APP_CLIENT_ID_HERE` with that client ID. Commit the change and wait for redeployment.
7. Try **Sign in with Microsoft**. If the redirect URL changes, update the registered URI to match exactly.

The code uses MSAL and OpenID Connect scopes `openid profile email` with redirect sign-in. It does not request Minecraft or Xbox APIs. For a production app, review Microsoft's latest MSAL guidance and privacy requirements.

Official docs:
- https://learn.microsoft.com/entra/identity-platform/quickstart-single-page-app-sign-in
- https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow

## 4. How players join

1. Use an actual online Bedrock server address and UDP port (commonly `19132`).
2. In Minecraft Bedrock, open **Play → Servers → Add Server**, if the platform/client exposes that option.
3. Enter the server address and port. The server must be running, reachable from the internet, compatible with the client's version, and configured to allow the player.

Windows, Android, iPhone and iPad Bedrock clients generally support custom server addresses. Console platforms have extra restrictions. A website cannot bypass them or force Minecraft to open a connection.

## 5. Free hosting reality and next steps

- The website itself can be hosted on GitHub Pages for free, subject to GitHub's plan and usage limits.
- A permanent shared directory needs a shared database and backend. The current local browser storage is a prototype only. You could later add a free-tier backend/database, but free tiers have quotas and can sleep or change.
- A world that stays online needs a server host. Mojang provides free Bedrock Dedicated Server software, but the computer running it and its internet connection must stay online. This is not hosted by GitHub Pages. A genuinely always-online remote host may not have a dependable unlimited free tier.
- Do not put secrets or private server credentials in this repository. Public repositories expose their contents.
