#!/bin/bash
git log --no-merges --pretty=" - <ins>%as</ins> **[\`%h\`](https://gitlab.dev.echo-company.ru/yugra/frontend/yugra-admin/-/commit/%H)** %s" > CHANGELOG.md
