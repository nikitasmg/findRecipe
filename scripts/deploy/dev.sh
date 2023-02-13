#!/bin/bash
# Go to project directory
cd ~/projects/front-template/www

# Error if any command error
set -e

# Update node version
echo "#### NVM ####"
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 

nvm use

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
echo "INSTALL DEPS END REMOVE MODULES"
npm ci
echo "END INSTALL DEPS"

# Lint
echo "LINT FIX"
npm run lint:es:fix

# Build
echo "START BUILD"
npm run build
echo "END BUILD"
