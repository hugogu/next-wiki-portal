# next-wiki portal

The public introduction site for [next-wiki](https://github.com/hugogu/next-wiki).

next-wiki is a self-hosted, private-by-default Agent Context & Memory Hub for one owner and a fleet of explicit Agent identities. It brings Agent rules, non-secret configuration, procedures, conversations, source evidence, episodic memory, and curated knowledge into one governed store. Private context stays scoped; only owner-approved context is shared or published.

The portal is a bilingual React/Vite site. Its documentation lives in `src/docs/pages/en` and `src/docs/pages/zh`, while shared UI copy lives in `src/i18n.tsx`.

## Local development

```bash
npm install
npm run dev
```

Run the production checks with:

```bash
npm run lint
npm run build
```

The build also prerenders the documentation routes. The deployed site is [next-wiki.hugogu.cn](https://next-wiki.hugogu.cn/).
