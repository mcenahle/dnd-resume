export const WIDGET_CONSTRAINTS = {
  basicInfo: {
    linksPerRow: 3,
    avatar: { size: { min: 48, max: 128 } },
  },
  imageSection: {
    sizePercent: { min: 20, max: 100 },
    borderRadius: { min: 0, max: 48 },
  },
  style: { margin: { min: 0, max: 64 } },
} as const
