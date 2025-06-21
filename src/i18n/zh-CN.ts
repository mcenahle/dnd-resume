export const zh: StrictTranslation<TranslationKeys> = {
  // Common
  'common.importConfig': '导入配置',
  'common.exportConfig': '导出配置',
  'common.reset': '重置',
  'common.preview': '预览',
  'common.print': '打印',
  'common.save': '保存',
  'common.cancel': '取消',
  'common.confirm': '确认',

  // Messages
  'message.importSuccess': '成功导入配置文件',
  'message.parseError': '配置文件解析失败',
  'message.parameterError': '参数解析失败',
  'message.confirmReset': '确认重置？',
  'message.resetWarning': '重置后数据不可恢复。',
  'message.localStorageDisabled': '本地存储不可用',
  'message.localStorageDisabledDesc':
    '您的浏览器已禁用本地存储，这可能导致部分功能无法正常使用。请检查浏览器设置以启用它。',

  // Widgets
  'widgets.basicInfo': '基本信息',
  'widgets.title': '标题',
  'widgets.experience': '经历',
  'widgets.text': '文本',
  'widgets.image': '图片',

  // Form Labels
  'form.titleContent': '标题内容',
  'form.enterTitle': '输入标题内容',
  'form.avatarUrl': '头像地址',
  'form.enterAvatarUrl': '输入头像地址',
  'form.avatarSize': '头像尺寸',
  'form.name': '姓名',
  'form.enterName': '输入姓名',
  'form.position': '职位',
  'form.enterPosition': '输入职位',
  'form.contactInfo1': '联系方式（第一行）',
  'form.contactInfo2': '联系方式（第二行）',
  'form.contactInfo3': '联系方式（第三行）',
  'form.enterLink': '输入链接地址',
  'form.experienceContent': '经历内容',
  'form.enterExperience': '输入经历',
  'form.timeRange': '起止时间',
  'form.enterTimeRange': '输入起止时间',
  'form.imageUrl': '图片地址',
  'form.enterImageUrl': '输入图片地址',
  'form.imageSize': '图片大小（百分比）',
  'form.borderRadius': '圆角半径',
  'form.textContent': '文本内容',
  'form.editContent': '编辑内容',
  'form.styleLayout': '样式布局',
  'form.marginTop': '上边距',
  'form.marginBottom': '下边距',
} as const

import type { TranslationKeys } from './en-US'

type StrictTranslation<T extends string> = {
  [K in T]: string
}
