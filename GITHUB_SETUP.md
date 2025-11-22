# Connecting to GitHub

It looks like **Git** is not fully installed or configured on your Mac yet. You need to install the "Command Line Tools" first.

## Step 1: Install Git Tools
1.  Look for a popup window on your Mac asking to "Install command line developer tools". If you see it, click **Install**.
2.  If you don't see it, open your **Terminal** app (Command+Space, type "Terminal") and run this command:
    ```bash
    xcode-select --install
    ```
3.  Follow the on-screen instructions to complete the installation.

## Step 2: Create a Repository on GitHub
1.  Log in to [GitHub.com](https://github.com).
2.  Click the **+** icon in the top-right and select **New repository**.
3.  Name it `aura-flow` (or whatever you like).
4.  **Important**: Do NOT check "Add a README", "Add .gitignore", or "Choose a license". Keep it empty.
5.  Click **Create repository**.

## Step 3: Connect Your Project
Once the tools from Step 1 are installed, run these commands in your terminal (inside the `aura-flow` folder):

```bash
# 1. Initialize Git
git init

# 2. Add all files
git add .

# 3. Commit your changes
git commit -m "Initial commit of Aura Flow"

# 4. Rename branch to main
git branch -M main

# 5. Connect to GitHub (Replace URL with your actual repo URL)
git remote add origin https://github.com/YOUR_USERNAME/aura-flow.git

# 6. Push your code
git push -u origin main
```

After this, your code will be live on GitHub!
