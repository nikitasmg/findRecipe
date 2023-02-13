#!/bin/bash
# Go to project directory
cd ~/projects/front-template/www

# Error if any command error
set -e

# Show install services
echo "#### NODE.js ####"
node -v

echo "#### NPM ####"
npm -v

# Pull git
git reset --hard HEAD
git pull origin master

# Install deps
echo "START INSTALL DEPS"
rm -rf node_modules
npm ci
echo "END INSTALL DEPS"

# Lint
echo "LINT FIX"
npm run lint:es:fix

# Build
echo "START BUILD"
npm run build
echo "END BUILD"
