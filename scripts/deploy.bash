#!/usr/bin/env bash
npm run build
git checkout master
git add .
git commit -m "auto commit from deploy script"
git push origin master
git push origin `git subtree split --prefix build master`:gh-pages --force
