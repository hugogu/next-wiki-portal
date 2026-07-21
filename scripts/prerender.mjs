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
    const file = join(DIST, p)
    if (!existsSync(file)) { res.writeHead(404); res.end(); return }
    res.writeHead(200, { 'content-type': MIME[extname(file)] || 'application/octet-stream' })
    res.end(await readFile(file))
  } catch {
    res.writeHead(500); res.end()
  }
})

await new Promise((r) => server.listen(PORT, '127.0.0.1', r))

const browser = await chromium.launch({
  executablePath: CHROME,
  args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
})
try {
  const page = await browser.newPage()
  await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' })
  await page.waitForSelector('#root > div', { timeout: 15000 })
  await page.waitForTimeout(2500) // let hero entrance animations finish

  let html = await page.content()

  // Neutralize any residual hidden/offset animation states so the static
  // copy is fully visible to no-JS readers. React re-mounts client-side.
  html = html
    .replace(/opacity:\s*0(\.\d+)?(?=[;"])/g, 'opacity:1')
    .replace(/transform:\s*(translateY|translateX|translate3d)\([^)]*\)(?=[;"])/g, 'transform:none')

  if (!html.includes('knowledge vault')) {
    console.error('[prerender] rendered HTML looks empty, keeping original index.html')
    process.exit(0)
  }
  await writeFile(join(DIST, 'index.html'), html)
  console.log('[prerender] dist/index.html now contains', html.length, 'chars of rendered HTML')
} finally {
  await browser.close()
  server.close()
}
