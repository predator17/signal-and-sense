import { useCallback, useEffect, useState } from 'react'
import {
  ArrowDown, ArrowRight, ArrowUpRight, Bookmark, BookOpen, Check, CheckCheck,
  ChevronRight, Clipboard, ExternalLink, Layers3, LineChart, ListChecks,
  Menu, MousePointer2, Scale, ShieldCheck, Sparkles, X,
} from 'lucide-react'
import { Explorer } from '@/components/Explorer'
import { filters, getFilter } from '@/data/filters'

const essentials = ['pe-ratio', 'roe', 'cashflow-ps', 'trading-value', 'ann-periodic-report']
const learningSteps = [
  { id: 'pe-ratio', icon: Scale, en: 'Price the business', yue: '先學估值', text: 'P/E, P/B and the share structure behind the price.', sub: '由 PE、PB 同股本開始。' },
  { id: 'roe', icon: Layers3, en: 'Test the quality', yue: '再睇質素', text: 'Returns, growth and cash reveal how well it operates.', sub: '用回報、增長同現金流驗證。' },
  { id: 'trading-volume', icon: LineChart, en: 'Confirm with the market', yue: '跟住睇市場確認', text: 'Price, volume and trend help with context and timing.', sub: '用價量同趨勢判斷時機。' },
  { id: 'ann-periodic-report', icon: ShieldCheck, en: 'Finish with risk', yue: '最後查風險', text: 'Filings and announcements expose what a chart cannot.', sub: '公告可以揭露圖表睇唔到嘅事。' },
]
const recipes = [
  {
    id: 'quality', title: 'Quality at a sensible price', yue: '合理價錢買質素', icon: Scale,
    description: 'A business-first starting point: earnings power, cash conversion, growth and leverage before valuation.', yueDescription: '由生意出發：先睇盈利、現金轉化、增長同槓桿，再判斷估值。',
    ids: ['pe-ratio', 'roe', 'cashflow-ps', 'revenue-growth', 'debt-asset-ratio'],
  },
  {
    id: 'trend', title: 'Trend with confirmation', yue: '有確認先順勢', icon: LineChart,
    description: 'A trend-following watchlist that demands liquidity and participation, not just a golden cross.', yueDescription: '建立順勢觀察名單，要求流動性同成交參與，唔好只睇金叉。',
    ids: ['price-above-ma250', 'macd-golden', 'trading-volume', 'turnover-rate', 'market-trend'],
  },
  {
    id: 'risk', title: 'Event & risk check', yue: '事件同風險排查', icon: ShieldCheck,
    description: 'A pre-trade checklist for dilution, pledges, conflicts, litigation and the primary filing.', yueDescription: '落單前查攤薄、質押、利益衝突、訴訟同原始財報。',
    ids: ['unlock-shares-month', 'ann-share-pledge', 'ann-related-party', 'ann-major-litigation', 'ann-periodic-report'],
  },
]

function useStoredSet(key: string) {
  const [values, setValues] = useState<Set<string>>(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return new Set(stored ? JSON.parse(stored) as string[] : [])
    } catch {
      return new Set()
    }
  })
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify([...values]))
  }, [key, values])
  const toggle = useCallback((id: string) => {
    setValues((previous) => {
      const next = new Set(previous)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])
  const addMany = useCallback((ids: string[]) => {
    setValues((previous) => new Set([...previous, ...ids]))
  }, [])
  const clear = useCallback(() => setValues(new Set()), [])
  return { values, toggle, addMany, clear }
}

function HeroGraphic() {
  return (
    <div className="hero-graphic" aria-label="Illustration combining valuation, quality and timing">
      <div className="hero-graphic-head"><span>ILLUSTRATIVE COMPANY · 示例公司</span><span className="live-dot">Learning view</span></div>
      <div className="hero-price"><div><span>One share · 每股</span><strong>¥24.80</strong></div><span className="price-change">+3.8%</span></div>
      <svg viewBox="0 0 560 240" className="hero-chart" role="img" aria-label="Illustrative rising price chart with volume bars">
        {[36, 84, 132, 180].map((y) => <line key={y} x1="8" x2="552" y1={y} y2={y} stroke="currentColor" opacity=".12" strokeDasharray="4 8" />)}
        <path d="M8 171 C42 161, 58 174, 89 147 S139 114, 172 129 S223 156, 251 119 S302 73, 334 95 S383 126, 412 86 S460 36, 490 56 S525 47, 552 27 L552 198 L8 198 Z" fill="#d8b568" opacity=".13" />
        <path d="M8 171 C42 161, 58 174, 89 147 S139 114, 172 129 S223 156, 251 119 S302 73, 334 95 S383 126, 412 86 S460 36, 490 56 S525 47, 552 27" fill="none" stroke="#d8b568" strokeWidth="4" strokeLinecap="round" />
        <path d="M8 151 C76 153, 110 130, 170 128 S270 105, 334 99 S450 68, 552 61" fill="none" stroke="#eee3c8" opacity=".48" strokeWidth="2" strokeDasharray="6 7" />
        {[32, 52, 41, 68, 57, 86, 73, 110, 95, 132].map((height, i) => <rect key={i} x={20 + i * 53} y={224 - height * 0.25} width="20" height={height * 0.25} rx="2" fill="#eee3c8" opacity={i === 9 ? '.9' : '.25'} />)}
      </svg>
      <div className="hero-lenses">
        <div><span>Value · 估值</span><strong>12.4× P/E</strong></div>
        <div><span>Quality · 質素</span><strong>16.8% ROE</strong></div>
        <div><span>Timing · 時機</span><strong>Above MA250</strong></div>
      </div>
      <p className="hero-graphic-note">Three lenses. One decision.<span lang="yue">三個角度，先構成一個決定。</span></p>
    </div>
  )
}

function App() {
  const [selectedId, setSelectedId] = useState('pe-ratio')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [copied, setCopied] = useState(false)
  const [confirmClear, setConfirmClear] = useState(false)
  const [loadedRecipe, setLoadedRecipe] = useState('')
  const saved = useStoredSet('signal-sense-saved')
  const learned = useStoredSet('signal-sense-learned')

  const openFilter = (id: string) => {
    setSelectedId(id)
    setMobileMenu(false)
    window.setTimeout(() => document.getElementById('filter-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  const loadRecipe = (id: string, ids: string[]) => {
    saved.addMany(ids)
    setLoadedRecipe(id)
    window.setTimeout(() => setLoadedRecipe(''), 2200)
  }

  const savedItems = filters.filter((item) => saved.values.has(item.id))
  const learnedPercent = Math.round((learned.values.size / filters.length) * 100)

  const copyChecklist = async () => {
    const text = savedItems.map((item, index) => `${index + 1}. ${item.name} · ${item.original}\n   ${item.summary.en}\n   ${item.summary.yue}`).join('\n\n')
    try {
      await navigator.clipboard.writeText(text || 'My stock-filter checklist · 我嘅選股指標清單')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div id="top" className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Signal and Sense home"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span>signal <b>&</b> sense</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#learn">Start here · 入門</a><a href="#explorer">Filter library · 指標庫</a><a href="#playbook">Playbooks · 組合示範</a>
        </nav>
        <div className="header-actions">
          <a href="#checklist" className="checklist-link"><Bookmark size={17} /><span>My checklist · 我嘅清單</span><b>{saved.values.size}</b></a>
          <button type="button" className="mobile-menu-button" onClick={() => setMobileMenu((value) => !value)} aria-expanded={mobileMenu} aria-label="Toggle navigation">{mobileMenu ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
        {mobileMenu && <nav className="mobile-nav" aria-label="Mobile navigation"><a onClick={() => setMobileMenu(false)} href="#learn">Start here · 入門</a><a onClick={() => setMobileMenu(false)} href="#explorer">Filter library · 指標庫</a><a onClick={() => setMobileMenu(false)} href="#playbook">Playbooks · 組合示範</a></nav>}
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <div className="hero-badge"><Sparkles size={15} /><span>English + 廣東話 · Made for first-time screeners</span></div>
            <h1>Know what the<br /><em>numbers</em> are saying.</h1>
            <p className="hero-yue" lang="yue">睇得明每個數，<br />先至睇得清隻股。</p>
            <p className="hero-description">A visual field guide to {filters.length} stock filters—with plain-English and Cantonese explanations, real formulas, useful examples and the pitfalls worth avoiding.</p>
            <p className="hero-description-yue" lang="yue">用圖解、公式同實例，逐個講解 {filters.length} 個股票篩選指標；英文夾廣東話，新手都睇得明。</p>
            <div className="hero-actions"><a className="primary-button" href="#explorer">Explore all {filters.length} filters <ArrowDown size={18} /></a><button type="button" className="text-button" onClick={() => openFilter('pe-ratio')}>Start with P/E · 由 PE 開始 <ArrowUpRight size={18} /></button></div>
            <div className="hero-proof"><span><Check size={15} /> {filters.length} filters explained</span><span><Check size={15} /> KaTeX formulas</span><span><Check size={15} /> No live-data noise</span></div>
          </div>
          <HeroGraphic />
        </section>

        <div className="audience-strip"><span>VALUE · 估值</span><i /><span>QUALITY · 質素</span><i /><span>TIMING · 時機</span><i /><span>RISK · 風險</span><strong>Learn the relationship, not just the label.</strong></div>

        <section id="learn" className="learn-section section-anchor">
          <div className="learn-heading"><span className="section-kicker">A BEGINNER’S ROUTE · 新手學習路線</span><h2>Read a stock in four passes.</h2><p lang="yue">四步睇一隻股，由生意到風險，逐層加證據。</p><p>Start wide, then ask better questions. Each step opens a real filter in the library.</p></div>
          <div className="learning-steps">
            {learningSteps.map((step, index) => {
              const Icon = step.icon
              return <button type="button" key={step.id} onClick={() => openFilter(step.id)}><span className="step-number">0{index + 1}</span><Icon size={25} /><div><span>{step.en} · {step.yue}</span><p>{step.text}</p><small lang="yue">{step.sub}</small></div><ArrowUpRight size={20} className="step-arrow" /></button>
            })}
          </div>
        </section>

        <Explorer selectedId={selectedId} onSelect={setSelectedId} saved={saved.values} onToggleSaved={saved.toggle} learned={learned.values} onToggleLearned={learned.toggle} />

        <section id="checklist" className="checklist-section section-anchor">
          <div className="checklist-main">
            <div className="section-heading compact"><div><span className="section-kicker">YOUR WORKING LIST · 你嘅工作清單</span><h2>Build a screen you can explain.</h2><p lang="yue">每一個條件都講得出原因，先係你自己嘅選股框架。</p></div></div>
            {savedItems.length === 0 ? <div className="empty-checklist"><Bookmark size={30} /><div><strong>Your checklist is empty.</strong><p>Save any filter in the library, or begin with five balanced essentials.<br /><span lang="yue">你可以喺指標庫儲存條件，或者先用五個均衡入門指標。</span></p></div><button type="button" className="primary-button" onClick={() => saved.addMany(essentials)}>Add the 5 essentials <ArrowRight size={17} /></button></div>
              : <div className="saved-list">{savedItems.map((item, index) => <div className="saved-row" key={item.id}><button type="button" className="saved-item-open" onClick={() => openFilter(item.id)}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{item.name}</strong><small>{item.original} · {item.cantonese}</small></div><ChevronRight size={18} /></button><button type="button" className="saved-remove" onClick={() => saved.toggle(item.id)} aria-label={`Remove ${item.name}`}><X size={17} /></button></div>)}</div>}
            {savedItems.length > 0 && <div className="checklist-actions"><button type="button" onClick={copyChecklist}>{copied ? <CheckCheck size={17} /> : <Clipboard size={17} />}{copied ? 'Copied · 已複製' : 'Copy checklist · 複製清單'}</button><button type="button" className={confirmClear ? 'confirm' : ''} onClick={() => { if (confirmClear) { saved.clear(); setConfirmClear(false) } else { setConfirmClear(true); window.setTimeout(() => setConfirmClear(false), 3000) } }}>{confirmClear ? 'Confirm clear · 確認清除' : 'Clear all · 全部清除'}</button></div>}
          </div>
          <aside className="learning-progress"><BookOpen size={27} /><span>Your learning progress · 學習進度</span><strong>{learned.values.size}<small> / {filters.length}</small></strong><div className="progress-track"><span style={{ width: `${learnedPercent}%` }} /></div><p>{learnedPercent}% marked as learned<br /><span lang="yue">已標記學識 {learnedPercent}%</span></p><div className="progress-tip"><MousePointer2 size={17} /><span>Use “Mark learned” on any filter.<br /><span lang="yue">喺任何指標按「標記已學」即可。</span></span></div></aside>
        </section>

        <section id="playbook" className="playbook-section section-anchor">
          <div className="section-heading"><div><span className="section-kicker">COMBINE, DON’T STACK · 識得組合，唔好亂疊</span><h2>Three ways to put the pieces together.</h2><p lang="yue">三個實用組合，示範點樣將唔同角度串連。</p></div><p className="section-side-copy">Each recipe adds a small set of complementary filters to your checklist. Adapt thresholds to your market and holding period.</p></div>
          <div className="recipe-list">
            {recipes.map((recipe) => {
              const Icon = recipe.icon
              return <article className="recipe-row" key={recipe.id}><div className="recipe-title"><Icon size={25} /><div><h3>{recipe.title}</h3><span lang="yue">{recipe.yue}</span></div></div><div className="recipe-body"><p>{recipe.description}</p><p lang="yue">{recipe.yueDescription}</p><div className="recipe-filters">{recipe.ids.map((id) => <span key={id}>{getFilter(id).original}</span>)}</div></div><button type="button" className={loadedRecipe === recipe.id ? 'loaded' : ''} onClick={() => loadRecipe(recipe.id, recipe.ids)}>{loadedRecipe === recipe.id ? <Check size={17} /> : <ListChecks size={17} />}{loadedRecipe === recipe.id ? 'Added · 已加入' : 'Use this recipe · 使用組合'}</button></article>
            })}
          </div>
          <div className="best-practice-band"><ShieldCheck size={28} /><div><strong>One independent question per filter.</strong><p>RSI, KDJ, CCI, WR and BIAS often describe similar momentum. More indicators do not always mean more evidence.</p><p lang="yue">RSI、KDJ、CCI、WR、BIAS 好多時都係講緊類似動能。指標多，唔等於獨立證據多。</p></div><button type="button" onClick={() => openFilter('rsi-overbought')}>See an oscillator example <ArrowUpRight size={18} /></button></div>
        </section>

        <section className="principles-section">
          <div><span className="section-kicker">BEFORE YOU SCREEN · 篩選之前</span><h2>A signal is not a decision.</h2><p lang="yue">訊號只係線索，唔係投資決定。</p></div>
          <ol><li><span>Match the timeframe.</span><p>TTM financials, daily flows and quarterly holdings do not update on the same clock.<br /><span lang="yue">TTM 財務、每日資金流同季度持倉，更新時鐘完全唔同。</span></p></li><li><span>Compare like with like.</span><p>Use industry, accounting basis, share class and adjustment method consistently.<br /><span lang="yue">行業、會計口徑、股份類別同復權方法都要一致。</span></p></li><li><span>Define failure first.</span><p>Know what invalidates the setup and how much liquidity you need before entry.<br /><span lang="yue">入市之前，先定義咩情況代表判斷失效，同埋需要幾多流動性。</span></p></li></ol>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand"><a className="brand" href="#top"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span>signal <b>&</b> sense</span></a><p>A bilingual stock-filter field guide.<br /><span lang="yue">中英雙語股票篩選指標指南。</span></p></div>
        <div className="methodology"><strong>Formula & methodology notes · 公式參考</strong><p>Standard technical definitions cross-checked against <a href="https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/macd-moving-average-convergence-divergence-oscillator" target="_blank" rel="noreferrer">MACD <ExternalLink size={12} /></a>, <a href="https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/relative-strength-index-rsi" target="_blank" rel="noreferrer">RSI <ExternalLink size={12} /></a>, <a href="https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/bollinger-bands" target="_blank" rel="noreferrer">Bollinger Bands <ExternalLink size={12} /></a>, <a href="https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/williams-r" target="_blank" rel="noreferrer">Williams %R <ExternalLink size={12} /></a> and <a href="https://www.futunn.com/en/learn/what-is-kdj" target="_blank" rel="noreferrer">KDJ <ExternalLink size={12} /></a>. Platform-specific rules are labelled in the guide.</p></div>
        <div className="disclaimer"><strong>Learn first. Risk always.</strong><p>Educational content only, not investment advice. All chart values are illustrative and not live market data.<br /><span lang="yue">內容只作教學用途，唔構成投資建議；所有圖表數值只屬示例，並非即時市場數據。</span></p></div>
      </footer>
    </div>
  )
}

export default App
