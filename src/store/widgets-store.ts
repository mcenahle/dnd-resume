import { create } from 'zustand'

import type { IWidgetNode } from '#widgets/types'
import { getWidgets } from '#widgets/helpers'
import { storageService } from '@/services/storage'

export interface WidgetsState {
  widgets: IWidgetNode[]
  addWidget: (widget: IWidgetNode) => void
  removeWidget: (id: string) => void
  updateWidget: (widget: IWidgetNode) => void
  setWidgets: (widgets: IWidgetNode[]) => void
  resetWidgets: () => void

  activeId: string | null
  setActiveId: (id: string) => void
}

export const useWidgetsStore = create<WidgetsState>()(set => {
  const widgets = getWidgets()
  const activeId = widgets.length ? widgets[0].id : null

  return {
    widgets,
    addWidget: (widget: IWidgetNode) => {
      set(({ activeId, widgets }) => {
        const newWidgets = [...widgets]
        if (!activeId) {
          newWidgets.push(widget)
        } else {
          const index = widgets.findIndex(item => item.id === activeId)
          if (index === -1) {
            newWidgets.push(widget)
          } else {
            newWidgets.splice(index + 1, 0, widget)
          }
        }
        return {
          widgets: newWidgets,
          activeId: widget.id,
        }
      })
    },
    removeWidget: (id: string) => {
      set(({ widgets }) => {
        const index = widgets.findIndex(item => item.id === id)
        const newWidgets = widgets.filter(widget => widget.id !== id)
        const activeId =
          newWidgets.length === 0
            ? null // Last one deleted
            : newWidgets.length > index
              ? newWidgets[index].id // Focus on next widget
              : newWidgets.length === index
                ? newWidgets[index - 1].id // Deleted the last one
                : null
        return {
          widgets: newWidgets,
          activeId,
        }
      })
    },
    updateWidget: (widget: IWidgetNode) => {
      set(({ widgets }) => {
        return {
          widgets: widgets.map(item => (item.id === widget.id ? widget : item)),
        }
      })
    },
    setWidgets: (widgets: IWidgetNode[]) => {
      set({ widgets })
    },
    resetWidgets: () => {
      set({ widgets: [], activeId: null })
    },

    activeId,
    setActiveId: (id: string) => set({ activeId: id }),
  }
})

/**
 * persist widgets change
 */
useWidgetsStore.subscribe((state: WidgetsState) => {
  const { widgets } = state
  if (!widgets || widgets.length === 0) {
    storageService.removeWidgets()
    return
  }
  storageService.setWidgets(widgets)
})
