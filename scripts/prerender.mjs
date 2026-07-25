/**
 * Post-build prerender: serve dist/ locally, drive headless Chromium via
 * playwright-core, wait for the SPA to fully mount + animate, then inline
 * the rendered HTML back into dist/index.html so crawlers and social bots
 * see complete, visible content without executing JS.
 */
import { createServer } from 'node:http'
import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, extname } from 'node:path'
import { chromium } from 'playwright-core'

const DIST = new URL('../dist', import.meta.url).pathname
const PORT = 49371
const CHROME = process.env.CHROME_BIN || '/usr/bin/chromium'

// Discover prerendered-able routes from the generated sitemap
// (public/sitemap.xml is the single source of truth for public URLs).
const sitemap = await readFile(new URL('../public/sitemap.xml', import.meta.url), 'utf8')
const ROUTES = [...sitemap.matchAll(/<loc>https:\/\/next-wiki\.hugogu\.cn([^<]*)<\/loc>/g)].map(
  (m) => m[1] || '/',
)

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.xml': 'application/xml',
  '.txt': 'text/plain', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json',
}

const server = createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname)
    if (p === '/') p = '/index.html'
    let file = join(DIST, p)
    // SPA fallback: unknown paths serve the app shell, like Pages/Netlify would
    if (!existsSync(file)) file = join(DIST, 'index.html')
    res.writeHead(200, { 'content-type': MIME[extname(file)] || 'application/octet-stream' })
    res.end(await readFile(file))
  } catch {
    res.writeHead(500); res.end()
  }
})

await new Promise((r) => server.listen(PORT, '127.0.0.1', r))

const { mkdir } = await import('node:fs/promises')

const browser = await chromium.launch({
  executablePath: CHROME,
  args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
})
try {
  const page = await browser.newPage()
  for (const route of ROUTES) {
    await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: 'load', timeout: 30000 })
    await page.waitForSelector('#root > div', { timeout: 15000 })
    if (route !== '/') await page.waitForSelector('article', { timeout: 15000 }).catch(() => {})
    await page.waitForTimeout(route === '/' ? 2500 : 800)

    let html = await page.content()

    // Neutralize residual hidden/offset animation states so the static copy
    // is fully visible to no-JS readers. React re-mounts client-side.
    html = html
      .replace(/opacity:\s*0(\.\d+)?(?=[;"])/g, 'opacity:1')
      .replace(/transform:\s*(translateY|translateX|translate3d)\([^)]*\)(?=[;"])/g, 'transform:none')

    const outFile = route === '/' ? join(DIST, 'index.html') : join(DIST, route, 'index.html')
    await mkdir(join(DIST, route === '/' ? '' : route), { recursive: true })
    await writeFile(outFile, html)
    console.log('[prerender]', route, '->', html.length, 'chars')
  }
} finally {
  await browser.close()
  server.close()
}
