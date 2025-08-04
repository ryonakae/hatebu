# 俺のはてブ

`.mise.toml`

- node: 22.14.0
- pnpm: 10.13.1
- python: 3.11.8

## Develop

```
$ pnpm install
$ pnpm dev
```

## Deploy

```
$ pnpm install
$ pnpm build
$ gcloud auth login
$ gcloud app deploy --project [YOUR_PROJECT_ID]
```
