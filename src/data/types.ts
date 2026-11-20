export type CategoryId =
  | 'fundamental'
  | 'financial'
  | 'market'
  | 'technical'
  | 'dragon'
  | 'holdings'
  | 'announcements'

export type VisualKind =
  | 'valuation'
  | 'gauge'
  | 'bars'
  | 'donut'
  | 'growth'
  | 'cash'
  | 'balance'
  | 'shares'
  | 'calendar'
  | 'price'
  | 'trend'
  | 'candles'
  | 'volume'
  | 'chips'
  | 'orderbook'
  | 'oscillator'
  | 'macd'
  | 'kdj'
  | 'bands'
  | 'divergence'
  | 'pattern'
  | 'average'
  | 'ranking'
  | 'ownership'
  | 'announcement'

export type Bilingual = {
  en: string
  yue: string
}

export type FilterItem = {
  id: string
  category: CategoryId
  group?: string
  name: string
  original: string
  cantonese: string
  summary: Bilingual
  scenario: Bilingual
  practice: Bilingual
  caution: Bilingual
  formula?: string
  formulaLabel?: Bilingual
  viz: VisualKind
  sample: string
  keywords?: string[]
}

export type Category = {
  id: CategoryId
  name: string
  original: string
  cantonese: string
  short: string
  description: Bilingual
}

export const categories: Category[] = [
  {
    id: 'fundamental',
    name: 'Fundamentals',
    original: '基本面',
    cantonese: '基本資料',
    short: 'Ownership & valuation basics',
    description: {
      en: 'Start with the company’s price tag, share structure and shareholder base.',
      yue: '先睇公司嘅估值、股本結構同股東分布，建立基本認識。',
    },
  },
  {
    id: 'financial',
    name: 'Financials',
    original: '財務面',
    cantonese: '財務表現',
    short: 'Profitability, growth & balance sheet',
    description: {
      en: 'Read the statements as a connected story: profit, cash, assets and debt.',
      yue: '將利潤、現金、資產同負債串連嚟睇，唔好只睇單一數字。',
    },
  },
  {
    id: 'market',
    name: 'Market & trend',
    original: '行情趨勢',
    cantonese: '市況同趨勢',
    short: 'Price, liquidity & trading activity',
    description: {
      en: 'Understand what the market is doing now—and how much activity sits behind a move.',
      yue: '睇市場而家點行，以及價格變動背後有幾多成交支持。',
    },
  },
  {
    id: 'technical',
    name: 'Technical signals',
    original: '技術面',
    cantonese: '技術訊號',
    short: 'Momentum, patterns & moving averages',
    description: {
      en: 'Translate price and volume into timing clues, without mistaking them for promises.',
      yue: '用價量搵時機線索，但記住訊號只係參考，唔係保證。',
    },
  },
  {
    id: 'dragon',
    name: 'Dragon–Tiger list',
    original: '龍虎榜',
    cantonese: '龍虎榜資金',
    short: 'Unusual movers & seat activity',
    description: {
      en: 'Inspect disclosed trading seats after eligible stocks make unusually large moves.',
      yue: '喺股票異動後，睇公開披露嘅席位買賣，拆解短線資金活動。',
    },
  },
  {
    id: 'holdings',
    name: 'Institutional holdings',
    original: '機構持倉',
    cantonese: '機構持倉',
    short: 'Reported positions by institution type',
    description: {
      en: 'Track reported positions by investor type, while respecting reporting delays.',
      yue: '按機構類別睇已披露持倉，同時留意數據有滯後。',
    },
  },
  {
    id: 'announcements',
    name: 'Announcements',
    original: '公告選股',
    cantonese: '公司公告',
    short: 'Corporate events & risk checks',
    description: {
      en: 'Check the primary evidence: what happened, when, and whether it changes value or risk.',
      yue: '直接睇原始公告：發生咩事、幾時發生，以及對價值同風險有咩影響。',
    },
  },
]
