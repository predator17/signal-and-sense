import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ComposedChart, Line,
  Pie, PieChart, ReferenceLine, ResponsiveContainer, XAxis, YAxis,
} from 'recharts'
import type { FilterItem } from '@/data/types'

const green = '#d7ae5f'
const lime = '#ead39b'
const coral = '#e4826d'
const muted = '#b4a88d'
const grid = '#494235'

const trendUp = [
  { x: '1', value: 31, aux: 35 }, { x: '2', value: 35, aux: 34 }, { x: '3', value: 33, aux: 37 },
  { x: '4', value: 39, aux: 40 }, { x: '5', value: 43, aux: 42 }, { x: '6', value: 41, aux: 44 },
  { x: '7', value: 48, aux: 46 }, { x: '8', value: 54, aux: 49 }, { x: '9', value: 58, aux: 52 },
]
const trendDown = trendUp.map((d) => ({ ...d, value: 89 - d.value, aux: 91 - d.aux })).reverse()
const volumeData = [
  { x: 'Mon', value: 32 }, { x: 'Tue', value: 46 }, { x: 'Wed', value: 38 },
  { x: 'Thu', value: 61 }, { x: 'Fri', value: 82 }, { x: 'Now', value: 68 },
]
const macdData = [
  { x: '1', hist: -1.5, fast: -1.1, slow: -0.4 }, { x: '2', hist: -0.9, fast: -0.8, slow: -0.35 },
  { x: '3', hist: -0.2, fast: -0.45, slow: -0.3 }, { x: '4', hist: 0.5, fast: 0.1, slow: -0.2 },
  { x: '5', hist: 1.1, fast: 0.65, slow: -0.05 }, { x: '6', hist: 0.7, fast: 0.9, slow: 0.25 },
  { x: '7', hist: 1.4, fast: 1.45, slow: 0.55 }, { x: '8', hist: 1.9, fast: 1.9, slow: 0.75 },
]
const bandData = [
  { x: '1', upper: 53, middle: 47, lower: 41, price: 46 }, { x: '2', upper: 54, middle: 47, lower: 40, price: 48 },
  { x: '3', upper: 53, middle: 47, lower: 41, price: 45 }, { x: '4', upper: 54, middle: 48, lower: 42, price: 50 },
  { x: '5', upper: 55, middle: 49, lower: 43, price: 52 }, { x: '6', upper: 56, middle: 50, lower: 44, price: 55 },
  { x: '7', upper: 58, middle: 51, lower: 44, price: 59 }, { x: '8', upper: 60, middle: 52, lower: 44, price: 61 },
]

function Frame({ item, children, center }: { item: FilterItem; children: React.ReactNode; center?: string }) {
  return (
    <figure className="filter-visual" aria-label={`Illustrative visualization for ${item.name}`}>
      <div className="visual-meta"><span>Visual intuition · 圖解</span><span>Illustrative · 示例</span></div>
      <div className="visual-canvas">
        {children}
        {center && <div className="visual-center"><strong>{center}</strong><span>{item.original}</span></div>}
      </div>
      <figcaption>{item.sample}<span>Not live data · 非即時數據</span></figcaption>
    </figure>
  )
}

function ScaleVisual({ item }: { item: FilterItem }) {
  const negative = /down|sell|low|negative/.test(item.id)
  return (
    <Frame item={item}>
      <div className="scale-visual">
        <div className="scale-value">{item.sample}</div>
        <div className="scale-track" aria-hidden="true">
          <span className="scale-zone zone-a" /><span className="scale-zone zone-b" /><span className="scale-zone zone-c" />
          <span className={`scale-marker ${negative ? 'negative' : ''}`} />
        </div>
        <div className="scale-labels"><span>Lower · 較低</span><span>Context matters · 睇背景</span><span>Higher · 較高</span></div>
        <p>Compare within industry & history<br /><span lang="yue">同行業、同歷史比較先有意思</span></p>
      </div>
    </Frame>
  )
}

function CalendarVisual({ item }: { item: FilterItem }) {
  return (
    <Frame item={item}>
      <div className="calendar-visual" aria-hidden="true">
        <div className="calendar-week">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <span key={i}>{d}</span>)}</div>
        <div className="calendar-days">{Array.from({ length: 28 }, (_, i) => <span key={i} className={[11, 18, 25].includes(i) ? 'event-day' : i < 8 ? 'past-day' : ''}>{i + 1}</span>)}</div>
        <div className="calendar-key"><span /> Event window · 事件窗口</div>
      </div>
    </Frame>
  )
}

function CandleVisual({ item, pattern = false }: { item: FilterItem; pattern?: boolean }) {
  const candles = [
    { o: 48, c: 44, h: 50, l: 41 }, { o: 44, c: 46, h: 48, l: 42 }, { o: 46, c: 43, h: 47, l: 40 },
    { o: 43, c: 47, h: 49, l: 42 }, { o: 47, c: 45, h: 48, l: 43 }, { o: 45, c: 52, h: 54, l: 44 },
  ]
  if (item.id.includes('golden-pin')) candles[5] = { o: 46, c: 48, h: 50, l: 30 }
  if (item.id.includes('cannon')) candles[5] = { o: 46, c: 56, h: 58, l: 45 }
  const y = (v: number) => 178 - (v - 28) * 4.2
  return (
    <Frame item={item}>
      <svg viewBox="0 0 360 210" className="candle-svg" role="img" aria-label="Illustrative candlestick pattern">
        {[45, 85, 125, 165].map((v) => <line key={v} x1="18" x2="342" y1={v} y2={v} stroke={grid} strokeDasharray="3 5" />)}
        {pattern && <><rect x="18" y={y(52)} width="240" height={y(42) - y(52)} fill={lime} opacity=".15" /><line x1="18" x2="342" y1={y(52)} y2={y(52)} stroke={green} strokeDasharray="5 4" /></>}
        {candles.map((candle, i) => {
          const x = 42 + i * 48
          const up = candle.c >= candle.o
          const top = y(Math.max(candle.o, candle.c))
          const height = Math.max(5, Math.abs(y(candle.o) - y(candle.c)))
          return <g key={i}>
            <line x1={x} x2={x} y1={y(candle.h)} y2={y(candle.l)} stroke={up ? green : coral} strokeWidth="2" />
            <rect x={x - 10} y={top} width="20" height={height} rx="2" fill={up ? green : coral} opacity={up ? 1 : 0.85} />
          </g>
        })}
        <text x="20" y="202" fill={muted} fontSize="11">PRICE ACTION · 價格行為</text>
      </svg>
    </Frame>
  )
}

function OrderBookVisual({ item }: { item: FilterItem }) {
  const asks = [62, 45, 29]
  const bids = [76, 58, 41]
  return (
    <Frame item={item}>
      <div className="orderbook-visual">
        <div className="orderbook-head"><span>Ask · 賣盤</span><span>Bid · 買盤</span></div>
        {asks.map((v, i) => <div className="book-row" key={`a${i}`}><span style={{ width: `${v}%` }} className="ask-bar" /><i>10.{8 - i}</i><b>{v}k</b></div>)}
        <div className="book-mid">Spread · 買賣差價</div>
        {bids.map((v, i) => <div className="book-row bid-row" key={`b${i}`}><span style={{ width: `${v}%` }} className="bid-bar" /><i>10.{7 - i}</i><b>{v}k</b></div>)}
      </div>
    </Frame>
  )
}

function AnnouncementVisual({ item }: { item: FilterItem }) {
  return (
    <Frame item={item}>
      <div className="announcement-visual">
        {[
          ['Event disclosed', '事件披露'],
          ['Read the terms', '細睇條款'],
          ['Map value & risk', '評估價值風險'],
        ].map(([en, yue], i) => <div className="announcement-step" key={en}><span>{i + 1}</span><div><strong>{en}</strong><small>{yue}</small></div></div>)}
      </div>
    </Frame>
  )
}

export function FilterVisual({ item }: { item: FilterItem }) {
  const negative = /death|down-streak|all-time-low|net-sell|lower-break/.test(item.id)
  const accent = negative ? coral : green
  const trend = negative ? trendDown : trendUp

  if (['valuation', 'gauge'].includes(item.viz)) return <ScaleVisual item={item} />
  if (item.viz === 'calendar') return <CalendarVisual item={item} />
  if (item.viz === 'candles') return <CandleVisual item={item} />
  if (item.viz === 'pattern') return <CandleVisual item={item} pattern />
  if (item.viz === 'orderbook') return <OrderBookVisual item={item} />
  if (item.viz === 'announcement') return <AnnouncementVisual item={item} />

  if (['donut', 'ownership', 'shares'].includes(item.viz)) {
    const data = [{ name: item.name, value: 42 }, { name: 'Other', value: 58 }]
    return <Frame item={item} center={item.sample}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart><Pie data={data} dataKey="value" innerRadius="64%" outerRadius="88%" startAngle={90} endAngle={-270} stroke="none" isAnimationActive={false}>
          <Cell fill={accent} /><Cell fill={grid} />
        </Pie></PieChart>
      </ResponsiveContainer>
    </Frame>
  }

  if (item.viz === 'chips') {
    const chips = [{ price: '9.0', value: 24 }, { price: '9.5', value: 48 }, { price: '10.0', value: 78 }, { price: '10.5', value: 56 }, { price: '11.0', value: 34 }, { price: '11.5', value: 20 }]
    return <Frame item={item}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chips} layout="vertical" margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
          <XAxis type="number" hide /><YAxis type="category" dataKey="price" axisLine={false} tickLine={false} width={34} tick={{ fill: muted, fontSize: 11 }} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} isAnimationActive={false}>{chips.map((d, i) => <Cell key={d.price} fill={i < 4 ? green : coral} opacity={i < 4 ? 1 : 0.55} />)}</Bar>
        </BarChart>
      </ResponsiveContainer>
    </Frame>
  }

  if (['bars', 'volume', 'cash', 'ranking', 'balance'].includes(item.viz)) {
    const data = item.viz === 'balance'
      ? [{ x: 'Assets', value: 92, aux: 48 }, { x: 'Equity', value: 44, aux: 26 }, { x: 'Liabilities', value: 48, aux: 22 }]
      : volumeData.map((d, i) => ({ ...d, value: negative && i === 5 ? -d.value * 0.7 : d.value }))
    return <Frame item={item}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 14, right: 6, left: -28, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke={grid} strokeDasharray="3 5" /><XAxis dataKey="x" axisLine={false} tickLine={false} tick={{ fill: muted, fontSize: 11 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: muted, fontSize: 11 }} />
          <ReferenceLine y={0} stroke={muted} /><Bar dataKey="value" fill={accent} radius={[4, 4, 0, 0]} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </Frame>
  }

  if (item.viz === 'macd') {
    const data = negative ? macdData.map((d) => ({ ...d, hist: -d.hist, fast: -d.fast, slow: -d.slow })) : macdData
    return <Frame item={item}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 12, right: 6, left: -28, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke={grid} strokeDasharray="3 5" /><XAxis dataKey="x" axisLine={false} tickLine={false} tick={{ fill: muted, fontSize: 11 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: muted, fontSize: 11 }} />
          <ReferenceLine y={0} stroke={muted} /><Bar dataKey="hist" fill={lime} isAnimationActive={false} /><Line type="monotone" dataKey="fast" stroke={accent} strokeWidth={2.5} dot={false} isAnimationActive={false} /><Line type="monotone" dataKey="slow" stroke={coral} strokeWidth={1.8} dot={false} isAnimationActive={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </Frame>
  }

  if (item.viz === 'bands') {
    const data = item.id.includes('lower') ? bandData.map((d) => ({ ...d, price: 100 - d.price })) : bandData
    return <Frame item={item}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 12, right: 6, left: -28, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke={grid} strokeDasharray="3 5" /><XAxis dataKey="x" hide /><YAxis domain={['dataMin - 4', 'dataMax + 4']} axisLine={false} tickLine={false} tick={{ fill: muted, fontSize: 11 }} />
          <Area type="monotone" dataKey="upper" stroke="none" fill={lime} fillOpacity={0.15} isAnimationActive={false} /><Line type="monotone" dataKey="upper" stroke={muted} strokeDasharray="4 4" dot={false} isAnimationActive={false} /><Line type="monotone" dataKey="lower" stroke={muted} strokeDasharray="4 4" dot={false} isAnimationActive={false} /><Line type="monotone" dataKey="middle" stroke={lime} strokeWidth={2} dot={false} isAnimationActive={false} /><Line type="monotone" dataKey="price" stroke={accent} strokeWidth={2.6} dot={false} isAnimationActive={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </Frame>
  }

  if (['oscillator', 'kdj'].includes(item.viz)) {
    const isWr = item.group === 'WR'
    const data = [28, 42, 35, 58, 48, 76, 62, 84, 68].map((v, i) => ({ x: `${i + 1}`, fast: isWr ? -v : v, slow: isWr ? -(v * 0.7 + 12) : v * 0.7 + 12, third: v * 1.2 - 12 }))
    const upper = item.group === 'CCI' ? 100 : isWr ? -20 : item.group === 'KDJ' ? 80 : item.group === 'RSI' ? 70 : 30
    const lower = item.group === 'CCI' ? -100 : isWr ? -80 : item.group === 'KDJ' ? 20 : item.group === 'RSI' ? 30 : -30
    return <Frame item={item}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 12, right: 6, left: -22, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke={grid} strokeDasharray="3 5" /><XAxis dataKey="x" hide /><YAxis axisLine={false} tickLine={false} tick={{ fill: muted, fontSize: 11 }} /><ReferenceLine y={upper} stroke={coral} strokeDasharray="4 4" /><ReferenceLine y={lower} stroke={green} strokeDasharray="4 4" />
          <Line type="monotone" dataKey="fast" stroke={accent} strokeWidth={2.5} dot={false} isAnimationActive={false} /><Line type="monotone" dataKey="slow" stroke={coral} strokeWidth={1.7} dot={false} isAnimationActive={false} />{item.viz === 'kdj' && <Line type="monotone" dataKey="third" stroke={lime} strokeWidth={1.5} dot={false} isAnimationActive={false} />}
        </ComposedChart>
      </ResponsiveContainer>
    </Frame>
  }

  if (item.viz === 'divergence') {
    const top = item.id.includes('top')
    const data = [{ x: 'A', price: 42, signal: 52 }, { x: '', price: 36, signal: 44 }, { x: 'B', price: 52, signal: 62 }, { x: '', price: 46, signal: 49 }, { x: 'C', price: top ? 60 : 39, signal: top ? 54 : 58 }].map((d) => top ? d : { ...d, price: 100 - d.price })
    return <Frame item={item}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 12, right: 6, left: -28, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke={grid} strokeDasharray="3 5" /><XAxis dataKey="x" axisLine={false} tickLine={false} tick={{ fill: muted, fontSize: 11 }} /><YAxis hide />
          <Line type="linear" dataKey="price" stroke={accent} strokeWidth={2.7} dot={{ r: 3, fill: accent }} isAnimationActive={false} /><Line type="linear" dataKey="signal" stroke={coral} strokeWidth={2} strokeDasharray="5 4" dot={false} isAnimationActive={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </Frame>
  }

  return <Frame item={item}>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={trend} margin={{ top: 12, right: 8, left: -28, bottom: 0 }}>
        <defs><pattern id="chartDots" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".7" fill={accent} opacity=".22" /></pattern></defs>
        <CartesianGrid vertical={false} stroke={grid} strokeDasharray="3 5" /><XAxis dataKey="x" axisLine={false} tickLine={false} tick={{ fill: muted, fontSize: 11 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: muted, fontSize: 11 }} />
        {item.viz === 'average' && <Line type="monotone" dataKey="aux" stroke={coral} strokeWidth={1.8} dot={false} isAnimationActive={false} />}
        <Area type="monotone" dataKey="value" stroke={accent} strokeWidth={2.7} fill="url(#chartDots)" isAnimationActive={false} /><ReferenceLine y={trend[0].value} stroke={muted} strokeDasharray="4 4" />
      </AreaChart>
    </ResponsiveContainer>
  </Frame>
}
