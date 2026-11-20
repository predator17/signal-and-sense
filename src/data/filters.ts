import { fundamentalFilters } from './fundamental'
import { financialFilters } from './financial'
import { marketFilters } from './market'
import { technicalFilters } from './technical'
import { dragonFilters, holdingFilters } from './dragonHoldings'
import { announcementFilters } from './announcements'
import type { CategoryId, FilterItem } from './types'

export const filters: FilterItem[] = [
  ...fundamentalFilters,
  ...financialFilters,
  ...marketFilters,
  ...technicalFilters,
  ...dragonFilters,
  ...holdingFilters,
  ...announcementFilters,
]

export const filtersByCategory = (category: CategoryId) => filters.filter((item) => item.category === category)
export const getFilter = (id: string) => filters.find((item) => item.id === id) ?? filters[0]

export const categoryCounts = filters.reduce<Record<string, number>>((counts, item) => {
  counts[item.category] = (counts[item.category] ?? 0) + 1
  return counts
}, {})

export { categories } from './types'
export type { Bilingual, Category, CategoryId, FilterItem, VisualKind } from './types'
