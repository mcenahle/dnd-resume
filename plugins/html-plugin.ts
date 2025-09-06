import type { Plugin } from 'vite'
import { loadEnv } from 'vite'

const env = loadEnv(process.env.NODE_ENV!, process.cwd(), '')

export function htmlPlugin(): Plugin {
  return {
    name: 'my-html-plugin',
    transformIndexHtml(html: string) {
      let result = html

      // vince
      const vinceDomain = env.VINCE_DOMAIN
      const vinceSource = env.VINCE_SOURCE
      if (vinceDomain && vinceSource) {
        result = result.replace(
          /\{\{\s*VINCE\s*\}\}/g,
          `<script defer data-domain="${vinceDomain}" src="${vinceSource}"></script>`,
        )
      } else {
        result = result.replace(/\{\{\s*VINCE\s*\}\}/g, '')
      }

      // react-scan
      const reactScan = env.REACT_SCAN
      if (reactScan) {
        result = result.replace(
          /\{\{\s*REACT_SCAN\s*\}\}/g,
          `<script crossOrigin="anonymous" src="${reactScan}"></script>`,
        )
      } else {
        result = result.replace(/\{\{\s*REACT_SCAN\s*\}\}/g, '')
      }

      return result
    },
  }
}

export default htmlPlugin
