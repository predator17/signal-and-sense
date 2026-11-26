import { useEffect, useRef, useState } from 'react'
import {
  Activity, ArrowLeft, ArrowRight, BellRing, Bookmark, BookmarkCheck, BookOpen,
  BriefcaseBusiness, Building2, Calculator, ChartCandlestick, Check, ChevronRight,
  CircleAlert, Lightbulb, ListOrdered, Search, ShieldCheck, X,
} from 'lucide-react'
import { categories, categoryCounts, filters, filtersByCategory, getFilter } from '@/data/filters'
import type { CategoryId } from '@/data/types'
import { Bilingual, type LanguageMode } from './Bilingual'
import { FilterVisual } from './FilterVisual'
import { Formula } from './Formula'

const categoryIcons = {
  fundamental: Building2,
  financial: Calculator,
  market: Activity,
  technical: ChartCandlestick,
  dragon: ListOrdered,
  holdings: BriefcaseBusiness,
  announcements: BellRing,
}

type ExplorerProps = {
  selectedId: string
  onSelect: (id: string) => void
  saved: Set<string>
  onToggleSaved: (id: string) => void
  learned: Set<string>
  onToggleLearned: (id: string) => void
}

export function Explorer({ selectedId, onSelect, saved, onToggleSaved, learned, onToggleLearned }: ExplorerProps) {
  const [query, setQuery] = useState('')
  const [savedOnly, setSavedOnly] = useState(false)
  const [mode, setMode] = useState<LanguageMode>('both')
  const itemListRef = useRef<HTMLDivElement>(null)
  const selected = getFilter(selectedId)
  const activeCategory = selected.category

  const normalized = query.trim().toLocaleLowerCase()
  let visible = normalized ? filters : filtersByCategory(activeCategory)
  if (normalized) {
    visible = visible.filter((item) => [item.name, item.original, item.cantonese, item.group ?? '', item.summary.en, item.summary.yue, ...(item.keywords ?? [])].join(' ').toLocaleLowerCase().includes(normalized))
  }
  if (savedOnly) visible = visible.filter((item) => saved.has(item.id))

  useEffect(() => {
    if (visible.length > 0 && !visible.some((item) => item.id === selectedId)) onSelect(visible[0].id)
  }, [visible, selectedId, onSelect])

  const selectFilter = (id: string) => {
    onSelect(id)
    if (window.matchMedia('(max-width: 1023px)').matches) {
      window.setTimeout(() => document.getElementById('filter-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
    }
  }

  const chooseCategory = (id: CategoryId) => {
    setQuery('')
    const next = filtersByCategory(id).find((item) => !savedOnly || saved.has(item.id))
    if (next) onSelect(next.id)
    itemListRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentIndex = visible.findIndex((item) => item.id === selectedId)
  const move = (direction: number) => {
    if (!visible.length) return
    const next = (Math.max(0, currentIndex) + direction + visible.length) % visible.length
    selectFilter(visible[next].id)
    itemListRef.current?.querySelector(`[data-filter-id="${visible[next].id}"]`)?.scrollIntoView({ block: 'nearest' })
  }

  const category = categories.find((c) => c.id === selected.category)!
  let lastGroup = ''

  return (
    <section id="explorer" className="explorer-section section-anchor">
      <div className="section-heading explorer-heading">
        <div>
          <span className="section-kicker">THE COMPLETE LIBRARY · 完整指標庫</span>
          <h2>Find a filter. Understand the signal.</h2>
          <p lang="yue">搵到指標之後，真正睇明佢講緊咩。</p>
        </div>
        <div className="library-count"><strong>{filters.length}</strong><span>filters · 個篩選指標</span></div>
      </div>

      <div className="explorer-toolbar">
        <label className="search-field">
          <span className="sr-only">Search all filters</span>
          <Search size={19} aria-hidden="true" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search P/E, 金叉, 股息…" type="search" />
          {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search"><X size={17} /></button>}
        </label>
        <button type="button" className={`saved-filter-button ${savedOnly ? 'active' : ''}`} onClick={() => setSavedOnly((value) => !value)} aria-pressed={savedOnly}>
          <Bookmark size={17} /> Saved · 已儲存 <span>{saved.size}</span>
        </button>
        <div className="language-switch" aria-label="Explanation language">
          {(['both', 'en', 'yue'] as LanguageMode[]).map((value) => <button type="button" key={value} onClick={() => setMode(value)} className={mode === value ? 'active' : ''} aria-pressed={mode === value}>{value === 'both' ? 'EN + 粵' : value === 'en' ? 'EN' : '粵語'}</button>)}
        </div>
      </div>

      <div className="mobile-category-select">
        <label htmlFor="category-select">Category · 分類</label>
        <select id="category-select" value={activeCategory} onChange={(event) => chooseCategory(event.target.value as CategoryId)}>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name} · {c.original} ({categoryCounts[c.id]})</option>)}
        </select>
      </div>

      <div className="explorer-grid">
        <aside className="category-rail" aria-label="Filter categories">
          {categories.map((c) => {
            const Icon = categoryIcons[c.id]
            return <button type="button" key={c.id} className={activeCategory === c.id && !query ? 'active' : ''} onClick={() => chooseCategory(c.id)} aria-pressed={activeCategory === c.id && !query}>
              <Icon size={19} aria-hidden="true" /><span><strong>{c.name}</strong><small>{c.original}</small></span><b>{categoryCounts[c.id]}</b>
            </button>
          })}
          <div className="category-note"><ShieldCheck size={18} /><p>No single filter is a buy signal.<br /><span lang="yue">冇一個指標可以單獨當買入訊號。</span></p></div>
        </aside>

        <div className="filter-browser">
          <div className="browser-heading">
            <div><strong>{query ? 'Search results' : savedOnly ? 'Saved filters' : category.name}</strong><span>{query ? '搜尋結果' : savedOnly ? '已儲存指標' : category.original}</span></div>
            <span>{visible.length} / {query || savedOnly ? filters.length : categoryCounts[activeCategory]}</span>
          </div>
          <div className="filter-list" ref={itemListRef}>
            {visible.length === 0 ? <div className="empty-filters"><Search size={28} /><strong>No matching filters</strong><p>Try another keyword or show all categories.<br /><span lang="yue">試下其他關鍵字，或者清除篩選。</span></p><button type="button" onClick={() => { setQuery(''); setSavedOnly(false) }}>Reset filters · 重設</button></div>
              : visible.map((item) => {
                const showGroup = item.group && item.group !== lastGroup
                lastGroup = item.group ?? ''
                return <div key={item.id}>
                  {showGroup && <div className="filter-group-label">{item.group}</div>}
                  <button type="button" data-filter-id={item.id} className={`filter-list-item ${selectedId === item.id ? 'active' : ''}`} onClick={() => selectFilter(item.id)} aria-pressed={selectedId === item.id}>
                    <span><strong>{item.name}</strong><small>{item.original}</small></span>
                    <span className="item-icons">{saved.has(item.id) && <Bookmark size={14} fill="currentColor" aria-label="Saved" />}{learned.has(item.id) && <Check size={14} aria-label="Learned" />}<ChevronRight size={16} aria-hidden="true" /></span>
                  </button>
                </div>
              })}
          </div>
        </div>

        <article id="filter-detail" className="filter-detail section-anchor" aria-live="polite">
          <div className="detail-topline"><span>{category.name} · {category.original}</span>{selected.group && <span>{selected.group}</span>}</div>
          <div className="detail-title-row">
            <div><h3>{selected.name}</h3><p className="detail-cantonese" lang="yue">{selected.cantonese}</p><span className="original-chip">{selected.original}</span></div>
            <div className="detail-actions">
              <button type="button" className={saved.has(selected.id) ? 'saved' : ''} onClick={() => onToggleSaved(selected.id)} aria-pressed={saved.has(selected.id)}>{saved.has(selected.id) ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}<span>{saved.has(selected.id) ? 'Saved · 已儲存' : 'Save · 儲存'}</span></button>
              <button type="button" className={learned.has(selected.id) ? 'learned' : ''} onClick={() => onToggleLearned(selected.id)} aria-pressed={learned.has(selected.id)}><Check size={18} /><span>{learned.has(selected.id) ? 'Learned · 已學識' : 'Mark learned · 標記已學'}</span></button>
            </div>
          </div>

          <div className="detail-intro-grid">
            <div className="detail-summary">
              <div className="detail-label"><BookOpen size={17} /><span>What it tells you · 呢個指標話你知咩</span></div>
              <Bilingual copy={selected.summary} mode={mode} />
            </div>
            <FilterVisual item={selected} />
          </div>

          {selected.formula && <Formula formula={selected.formula} label={selected.formulaLabel} mode={mode} />}
          {!selected.formula && <div className="definition-note"><CircleAlert size={18} /><Bilingual mode={mode} copy={{ en: 'No universal equation: this is a disclosure label or vendor-defined signal. Read the methodology before comparing platforms.', yue: '呢項冇統一公式，屬披露標籤或平台自訂訊號；跨平台比較前要先睇計算方法。' }} /></div>}

          <div className="detail-notes">
            <section><div className="detail-label"><Lightbulb size={17} /><span>Practical use · 實際點用</span></div><Bilingual copy={selected.scenario} mode={mode} /></section>
            <section><div className="detail-label"><ShieldCheck size={17} /><span>Best practice · 穩妥做法</span></div><Bilingual copy={selected.practice} mode={mode} /></section>
          </div>
          <section className="caution-note"><div className="detail-label"><CircleAlert size={17} /><span>Common misread · 常見誤讀</span></div><Bilingual copy={selected.caution} mode={mode} /></section>

          <div className="detail-pagination">
            <button type="button" onClick={() => move(-1)} disabled={!visible.length}><ArrowLeft size={17} /> Previous · 上一個</button>
            <span>{visible.length ? Math.max(1, currentIndex + 1) : 0} of {visible.length}</span>
            <button type="button" onClick={() => move(1)} disabled={!visible.length}>Next · 下一個 <ArrowRight size={17} /></button>
          </div>
        </article>
      </div>
    </section>
  )
}
