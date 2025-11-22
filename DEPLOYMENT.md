# How to Publish "Aura Flow"

Since you are running this locally, the easiest way to publish your app for free is using **Netlify** or **Vercel**.

## Option 1: The Easiest Way (Netlify Drop)
*Best if you don't want to configure Git or command line tools.*

1.  **Build your project**:
    I have already run the build command for you. This created a `dist` folder in your project directory:
    `/Users/sajinphilip/Documents/Antigravity/aura-flow/dist`

2.  **Go to Netlify**:
    Open [app.netlify.com/drop](https://app.netlify.com/drop) in your browser.

3.  **Drag and Drop**:
    Open your file explorer (Finder) to the `aura-flow` folder.
    Drag the **`dist`** folder (not the whole project, just the `dist` folder) onto the Netlify page.

4.  **Done!**:
    Netlify will give you a live URL (e.g., `https://random-name.netlify.app`). You can change this name in the "Site Settings".

---

## Option 2: The Professional Way (Vercel + GitHub)
*Best for long-term updates.*

1.  **Create a GitHub Repository**:
    Go to GitHub and create a new repository.

2.  **Push your code**:
    (Note: You may need to install Xcode command line tools first if `git` isn't working).
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin <YOUR_GITHUB_REPO_URL>
    git push -u origin main
    ```

3.  **Connect to Vercel**:
    - Go to [vercel.com](https://vercel.com) and sign up.
    - Click "Add New Project".
    - Select your GitHub repository.
    - Click "Deploy".

Vercel will automatically rebuild and update your site whenever you push changes to GitHub.
