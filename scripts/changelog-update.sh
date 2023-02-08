#!/bin/bash
git log --no-merges --pretty=" - <ins>%as</ins> **[\`%h\`](https://gitlab.dev.echo-company.ru/developers/echo-front-v3/-/commit/%H)** %s" > CHANGELOG.md
