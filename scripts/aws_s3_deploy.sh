#!/bin/sh

aws s3 sync $1 $2 \
  --exclude "*.html" --exclude "*.webmanifest" --exclude ".git*" \
  --exclude "README.md" --delete --acl public-read

