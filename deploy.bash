#!/usr/bin/env bash
npm run build
git checkout master
git add .
git commit -m "add files"
git push origin master
git checkout gh-pages
git rebase master
git push origin gh-pages
git checkout master
