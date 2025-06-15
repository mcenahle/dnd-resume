export const en = {
  // Common
  'common.importConfig': 'Import Config',
  'common.exportConfig': 'Export Config',
  'common.reset': 'Reset',
  'common.preview': 'Preview',
  'common.print': 'Print',
  'common.save': 'Save',
  'common.cancel': 'Cancel',
  'common.confirm': 'Confirm',

  // Messages
  'message.importSuccess': 'Successfully imported configuration file',
  'message.parseError': 'Failed to parse configuration file',
  'message.parameterError': 'Parameter parsing failed',
  'message.confirmReset': 'Confirm reset?',
  'message.resetWarning': 'Data cannot be recovered after reset.',

  // Widgets
  'widgets.basicInfo': 'Basic Info',
  'widgets.title': 'Title',
  'widgets.experience': 'Experience',
  'widgets.text': 'Text',
  'widgets.image': 'Image',

  // Form Labels
  'form.titleContent': 'Title Content',
  'form.enterTitle': 'Enter title content',
  'form.avatarUrl': 'Avatar URL',
  'form.enterAvatarUrl': 'Enter avatar URL',
  'form.avatarSize': 'Avatar Size',
  'form.name': 'Name',
  'form.enterName': 'Enter name',
  'form.position': 'Position',
  'form.enterPosition': 'Enter position',
  'form.contactInfo1': 'Contact Information (Row 1)',
  'form.contactInfo2': 'Contact Information (Row 2)',
  'form.contactInfo3': 'Contact Information (Row 3)',
  'form.enterLink': 'Enter link address',
  'form.experienceContent': 'Experience Content',
  'form.enterExperience': 'Enter experience',
  'form.timeRange': 'Time Range',
  'form.enterTimeRange': 'Enter time range',
  'form.imageUrl': 'Image URL',
  'form.enterImageUrl': 'Enter image URL',
  'form.imageSize': 'Image Size (percentage)',
  'form.borderRadius': 'Border Radius',
  'form.textContent': 'Text Content',
  'form.editContent': 'Edit Content',
  'form.styleLayout': 'Style Layout',
  'form.marginTop': 'Margin Top',
  'form.marginBottom': 'Margin Bottom',
} as const

export type TranslationKeys = keyof typeof en
