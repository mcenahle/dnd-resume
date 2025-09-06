import { isChineseLanguage } from '@/locales/i18n'
import type { ILinkData, IWidgetNode, WidgetType } from '#widgets/types'

export function generateWidgetId(): string {
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`
}

export function createDefaultWidgets(): IWidgetNode[] {
  const isChinese = isChineseLanguage()
  return [
    {
      type: 'BasicInfo',
      id: generateWidgetId(),
      data: {
        propsData: {
          avatarUrl: '/avatar.jpg',
          avatarSize: 86,
          avatarRound: true,
          name: isChinese ? '炭治郎' : 'Tanjiro',
          jobTitle: isChinese ? '前端开发工程师' : 'Frontend Developer',
          linksGroup: [
            [
              { href: '', content: '2050/01', icon: 'cake' },
              { href: '', content: '15123456789', icon: 'phone' },
            ],
            [
              { href: 'https://github.com/', content: 'github.com', icon: 'github' },
              {
                href: 'mailto:tanjiro@gmail.com',
                content: 'tanjiro@gmail.com',
                icon: 'gmail',
              },
            ],
            [],
          ],
        },
        styleData: { marginTop: 0, marginBottom: 0 },
      },
    },
    {
      type: 'TitleSection',
      id: generateWidgetId(),
      data: {
        propsData: { title: isChinese ? '专业技能' : 'Professional Skills' },
        styleData: { marginTop: 20, marginBottom: 12 },
      },
    },
    {
      type: 'TextContent',
      id: generateWidgetId(),
      data: {
        propsData: {
          content: isChinese
            ? '<ul><li><p>熟练掌握 <code>JavaScript</code>、<code>TypeScript</code> 语言；</p></li><li><p>熟练使用 <code>Vue</code>、<code>React</code> 开发前端应用，并掌握其基本原理；</p></li><li><p>熟练使用 <code>Vite</code>、<code>Webpack</code> 等打包工具构建应用；</p></li><li><p>熟练使用 <code>NodeJS</code>、<code>MySQL</code>、<code>Redis</code> 等技术开发后端应用；</p></li></ul>'
            : '<ul><li><p>Proficient in <code>JavaScript</code>, <code>TypeScript</code>;</p></li><li><p>Experienced with <code>Vue</code>, <code>React</code> frontend development and understanding of core principles;</p></li><li><p>Skilled in using <code>Vite</code>, <code>Webpack</code> and other build tools;</p></li><li><p>Proficient in backend development with <code>NodeJS</code>, <code>MySQL</code>, <code>Redis</code>;</p></li></ul>',
        },
        styleData: { marginTop: 0, marginBottom: 0 },
      },
    },
    {
      type: 'TitleSection',
      id: generateWidgetId(),
      data: {
        propsData: { title: isChinese ? '工作经历' : 'Work Experience' },
        styleData: { marginTop: 20, marginBottom: 12 },
      },
    },
    {
      type: 'ExperienceTime',
      id: generateWidgetId(),
      data: {
        propsData: {
          title: isChinese ? 'XX有限公司' : 'XX Company',
          dateRange: '2077/07 - 2080/07',
        },
        styleData: { marginTop: 0, marginBottom: 0 },
      },
    },
    {
      type: 'TextContent',
      id: generateWidgetId(),
      data: {
        propsData: {
          content: isChinese
            ? '<h3>XX项目 - Web 前端开发</h3><ul><li><p>负责从需求分析到前端架构设计、功能开发及性能优化的全流程开发工作。</p></li><li><p>坚持与产品、设计、后端团队紧密协作，推动敏捷开发流程和 CI/CD 工具链的落地，确保高质量的交付。</p></li><li><p>通过深入研究用户体验和前端性能，成功优化支付流程页面，提升了用户转化率和支付成功率。</p></li></ul>'
            : '<h3>XX Project - Web Frontend Development</h3><ul><li><p>Responsible for the full development process from requirement analysis to frontend architecture design, feature development, and performance optimization.</p></li><li><p>Consistently collaborated with product, design, and backend teams to promote agile development processes and implement CI/CD toolchains, ensuring high-quality delivery.</p></li><li><p>Successfully optimized the payment process page through in-depth research on user experience and frontend performance, improving user conversion and payment success rates.</p></li></ul>',
        },
        styleData: { marginTop: 0, marginBottom: 0 },
      },
    },
    {
      type: 'TitleSection',
      id: generateWidgetId(),
      data: {
        propsData: { title: isChinese ? '教育经历' : 'Education' },
        styleData: { marginTop: 20, marginBottom: 12 },
      },
    },
    {
      type: 'ExperienceTime',
      id: generateWidgetId(),
      data: {
        propsData: {
          title: isChinese ? 'XX大学 - 软件工程' : 'XX University - Software Engineering',
          dateRange: '2073/07 - 2077/07',
        },
        styleData: { marginTop: 0, marginBottom: 0 },
      },
    },
  ]
}

export function createWidgetNode(type: WidgetType): IWidgetNode {
  const isChinese = isChineseLanguage()
  const id = `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`
  switch (type) {
    case 'BasicInfo':
      return {
        type: 'BasicInfo',
        id,
        data: {
          propsData: {
            avatarUrl: '/avatar.jpg',
            avatarSize: 86,
            avatarRound: true,
            name: isChinese ? '炭治郎' : 'Tanjiro',
            jobTitle: isChinese ? '前端开发工程师' : 'Frontend Developer',
            linksGroup: [
              [
                {
                  href: '',
                  content: '2050/01',
                  icon: 'cake',
                },
                {
                  href: '',
                  content: '15123456789',
                  icon: 'phone',
                },
              ],
              [
                {
                  href: 'https://github.com/',
                  content: 'github.com',
                  icon: 'github',
                },
                {
                  href: 'mailto:tanjiro@gmail.com',
                  content: 'tanjiro@gmail.com',
                  icon: 'gmail',
                },
              ],
              [],
            ],
          },
          styleData: {
            marginTop: 0,
            marginBottom: 0,
          },
        },
      }
    case 'TitleSection':
      return {
        type: 'TitleSection',
        id,
        data: {
          propsData: {
            title: isChinese ? '工作经历' : 'Work Experience',
          },
          styleData: {
            marginTop: 20,
            marginBottom: 12,
          },
        },
      }
    case 'ExperienceTime':
      return {
        type: 'ExperienceTime',
        id,
        data: {
          propsData: {
            title: isChinese ? 'XX有限公司' : 'XX Company',
            dateRange: '2077/07 - 2080/07',
          },
          styleData: {
            marginTop: 0,
            marginBottom: 0,
          },
        },
      }
    case 'TextContent':
      return {
        type: 'TextContent',
        id,
        data: {
          propsData: {
            content: isChinese
              ? '<h3>XX项目 - Web 前端开发</h3><ul><li><p>负责从需求分析到前端架构设计、功能开发及性能优化的全流程开发工作。</p></li><li><p>坚持与产品、设计、后端团队紧密协作，推动敏捷开发流程和 CI/CD 工具链的落地，确保高质量的交付。</p></li><li><p>通过深入研究用户体验和前端性能，成功优化支付流程页面，提升了用户转化率和支付成功率。</p></li></ul>'
              : '<h3>XX Project - Web Frontend Development</h3><ul><li><p>Responsible for the full development process from requirement analysis to frontend architecture design, feature development, and performance optimization.</p></li><li><p>Consistently collaborated with product, design, and backend teams to promote agile development processes and implement CI/CD toolchains, ensuring high-quality delivery.</p></li><li><p>Successfully optimized the payment process page through in-depth research on user experience and frontend performance, improving user conversion and payment success rates.</p></li></ul>',
          },
          styleData: {
            marginTop: 0,
            marginBottom: 0,
          },
        },
      }
    case 'ImageSection':
      return {
        type: 'ImageSection',
        id,
        data: {
          propsData: {
            url: '/image.png',
            imageSize: 100,
            borderRadius: 0,
          },
          styleData: {
            marginTop: 10,
            marginBottom: 10,
          },
        },
      }
    default: {
      const exhaustiveCheck: never = type
      return exhaustiveCheck
    }
  }
}

export function createLinkData(): ILinkData {
  return {
    href: 'https://github.com/',
    content: 'github.com',
    icon: 'link',
  }
}
