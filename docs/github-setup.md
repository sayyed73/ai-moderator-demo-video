# Putting this project on GitHub

This folder is already a standalone Git repository. No remote has been added and nothing has been pushed.

1. On github.com click **New repository**, name it, choose **Private**, and leave "Add README / .gitignore / licence" **unchecked** (it must be empty).
2. Copy the repository URL GitHub shows you.
3. In this folder run (replace the placeholder):

```bash
git remote add origin <YOUR-REPOSITORY-URL>      # e.g. https://github.com/your-name/your-repo.git
git branch -M main
git push -u origin main
```

Later changes: `git add -A && git commit -m "Describe the change" && git push`.

Not uploaded (ignored on purpose): `node_modules/`, `out/` (rendered videos), `references/` (competitor material), `.env*` files and caches. Fonts, logos and images in `public/` are tracked.
