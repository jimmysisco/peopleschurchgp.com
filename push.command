#!/bin/bash
cd "$(dirname "$0")"
git add -A

if git diff --cached --quiet; then
  echo "No changes to commit — nothing to push."
else
  echo "Changed files:"
  git status --short
  echo
  read -p "Commit message (press Enter for default): " msg
  if [ -z "$msg" ]; then
    msg="Update site $(date '+%Y-%m-%d %H:%M')"
  fi
  git commit -m "$msg"
  git push
fi

echo
read -p "Done. Press Enter to close this window..."
