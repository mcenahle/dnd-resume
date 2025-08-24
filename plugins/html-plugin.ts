import type { Plugin } from 'vite'

export function htmlPlugin(): Plugin {
  return {
    name: 'my-html-plugin',
    transformIndexHtml(html: string) {
      const vinceDomain = process.env.VINCE_DOMAIN
      const vinceSource = process.env.VINCE_SOURCE

      if (vinceDomain && vinceSource) {
        return html.replace(
          /\{\{\s*VINCE\s*\}\}/g,
          `<script defer data-domain="${vinceDomain}" src="${vinceSource}"></script>`,
        )
      }

      return html.replace(/\{\{\s*VINCE\s*\}\}/g, '<!-- {{ VINCE }} -->')
    },
  }
}

export default htmlPlugin
