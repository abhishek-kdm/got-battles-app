rsync -avP --delete-excluded \
  --include="*.html" --include="*.webmanifest" --exclude=".git*" --include="*/" \
  --exclude="*" --rsync-path="mkdir -p $WEB_PATH/$REPO_NAME && rsync" \
  -e "ssh -o StrictHostKeyChecking=no" $1 $2

