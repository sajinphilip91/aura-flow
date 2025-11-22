# How to Fix GitHub Authentication

GitHub no longer accepts your account password for uploading code. You must use a **Personal Access Token**.

## Step 1: Generate a Token
1.  Log in to GitHub.
2.  Go to this direct link: [https://github.com/settings/tokens/new](https://github.com/settings/tokens/new)
3.  **Note**: If asked, choose **"Generate new token (classic)"**.
4.  **Note**: Give it a name like "Mac Upload".
5.  **Expiration**: Set to "No expiration" (or 30 days).
6.  **Select scopes**: Check the box for **`repo`** (this is required to upload code).
7.  Scroll down and click **Generate token**.
8.  **COPY THE TOKEN** immediately. It starts with `ghp_...`. You won't see it again.

## Step 2: Use the Token
1.  Go back to your Terminal.
2.  Run the command again:
    ```bash
    cd /Users/sajinphilip/Documents/Antigravity/aura-flow && git push -u origin main
    ```
3.  **Username**: Type `sajinphilip91`
4.  **Password**: Paste the **Token** you just copied (starts with `ghp_`).
    *   *Remember: The cursor won't move when you paste. Just hit Enter.*

Your code should now upload successfully!
