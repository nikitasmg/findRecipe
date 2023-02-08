#!/bin/bash
npx husky set .husky/pre-commit "npm run pre-commit" && npx husky set .husky/pre-push "npm run pre-push"
