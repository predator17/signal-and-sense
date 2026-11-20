import type { Bilingual, FilterItem, VisualKind } from './types'

const baseTechnical: FilterItem[] = [
  {
    id: 'simulated-price-path', category: 'technical', name: 'Simulated price path', original: '股价模拟走势', cantonese: '股價模擬走勢',
    summary: { en: 'A model-generated projection of possible future prices. It is scenario output, not observed market data.', yue: '由模型推演出嚟嘅未來可能股價路徑，只係情境結果，唔係真實市場數據。' },
    scenario: { en: 'Compare optimistic, base and adverse paths to test position size instead of trading the single most attractive line.', yue: '比較樂觀、基準同悲觀路徑，用嚟測試倉位大細，唔好只揀最靚嗰條線跟住買。' },
    practice: { en: 'Inspect model inputs, confidence intervals and backtest period; prefer a range over a single target.', yue: '要睇模型輸入、置信區間同回測期間；一個範圍通常比單一目標價更有用。' },
    caution: { en: 'Small input changes can produce very different paths, especially around shocks and regime changes.', yue: '少少輸入變化都可以推演出完全唔同路徑，遇到突發事件或市場制度轉變尤其明顯。' },
    formula: 'P_{t+1}=P_t+\\mu\\Delta t+\\sigma\\varepsilon_t\\sqrt{\\Delta t}',
    formulaLabel: { en: 'One illustrative stochastic model—not a universal platform formula.', yue: '呢個只係其中一個隨機模型示例，唔係平台統一公式。' }, viz: 'trend', sample: 'Scenario fan',
  },
  {
    id: 'monthly-win-probability', category: 'technical', name: 'Historical probability of rising this month', original: '当月上涨概率', cantonese: '當月歷史上升機率',
    summary: { en: 'The fraction of matching calendar months in a historical sample that ended positive. It describes seasonality in the sample.', yue: '統計歷史樣本入面，同一個月份有幾多次最終上升，用嚟描述樣本內季節性。' },
    scenario: { en: 'Seven gains in ten Augusts imply a 70% historical frequency—not a 70% guaranteed chance this August.', yue: '過去十年八月有七年上升，歷史頻率係 70%，但唔代表今年八月一定有 70% 機會升。' },
    practice: { en: 'Require enough independent years and compare against the stock’s all-month base rate.', yue: '要有足夠多年獨立樣本，並同該股所有月份嘅基礎上升率比較。' },
    caution: { en: 'Small samples, changing businesses and selection bias can make seasonality look stronger than it is.', yue: '樣本太細、業務轉變同篩選偏差，都會令季節性顯得比實際強。' },
    formula: '\\hat p_m=\\frac{\\#\\{\\text{years with }R_{m,y}>0\\}}{\\#\\{\\text{observed years}\\}}\\times100\\%',
    formulaLabel: { en: 'This is historical frequency, not a forward-looking calibrated probability.', yue: '呢個係歷史頻率，唔係經校準嘅未來機率。' }, viz: 'gauge', sample: '60% · 10 yrs',
  },
  {
    id: 'monthly-average-return', category: 'technical', name: 'Average return for this calendar month', original: '当月平均涨跌幅', cantonese: '當月平均升跌幅',
    summary: { en: 'The arithmetic mean of returns for the same calendar month across prior years.', yue: '將過去唔少年份同一個月份嘅回報取算術平均，觀察該月歷史表現。' },
    scenario: { en: 'An average +4% can hide one +30% rally and several negative years; inspect the distribution.', yue: '平均 +4% 背後可能係一年升 30%、其餘多年下跌，所以一定要睇分布。' },
    practice: { en: 'Show median, win rate, sample size and best/worst observations alongside the mean.', yue: '最好同時列出中位數、勝率、樣本數同最好最差年份。' },
    caution: { en: 'Extreme years heavily influence averages; never annualize a seasonal mean naively.', yue: '極端年份會大幅影響平均數，亦唔應該將季節性月均回報簡單年化。' },
    formula: '\\overline R_m=\\frac{1}{N}\\sum_{y=1}^{N}R_{m,y}',
    formulaLabel: { en: 'Each R is the full-month return in year y.', yue: '每個 R 代表 y 年該月份嘅完整月回報。' }, viz: 'bars', sample: '+2.6% avg',
  },
  {
    id: 'main-funds-1d', category: 'technical', name: 'One-day main-force net flow', original: '1日主力资金', cantonese: '一日主力資金淨流',
    summary: { en: 'A one-day vendor estimate of large-order inflows minus outflows. Order-size rules stand in for unobserved investor identity.', yue: '平台用大單推算一日主力流入減流出，訂單大細只係身份嘅替代指標，睇唔到真正投資者。' },
    scenario: { en: 'Positive flow with a falling close may indicate passive absorption—or a classification mismatch; inspect intraday trades.', yue: '資金流入但收市下跌，可能係被動承接，亦可能係分類錯配，要睇分時成交。' },
    practice: { en: 'Compare flow with trading value and use several days rather than one noisy session.', yue: '將淨流對比總成交額，並觀察連續幾日，唔好只睇單日雜訊。' },
    caution: { en: 'Large orders can be split, and small orders can belong to large institutions.', yue: '大戶可以拆細單，小額訂單亦可以嚟自大型機構，所以推算一定有誤差。' },
    formula: 'F_{1d}=\\sum \\text{large buy value}-\\sum \\text{large sell value}',
    formulaLabel: { en: '“Large” is defined by the vendor.', yue: '「大單」界線由平台自行定義。' }, viz: 'cash', sample: '+¥42m · est.',
  },
  {
    id: 'main-funds-5d', category: 'technical', name: 'Five-day main-force net flow', original: '5日主力资金', cantonese: '五日主力資金淨流',
    summary: { en: 'The vendor-estimated net large-order flow aggregated over five sessions. Smoothing reveals persistence but still depends on classification.', yue: '將平台估算嘅大單淨流加總五日，可以睇持續性，但結果仍然受分類方法影響。' },
    scenario: { en: 'Five days of net inflow while price holds above support offers more context than a single-day spike.', yue: '連續五日流入，股價又守得住支持位，會比單日急流入提供更多背景。' },
    practice: { en: 'Check whether one exceptional day dominates the total and normalize by five-day trading value.', yue: '要查係咪某一日異常成交主導成個總數，再除以五日總成交額標準化。' },
    caution: { en: 'Flow persistence is not proof of accumulation by one institution or a predictable future buyer.', yue: '持續流入唔證明係同一機構收集，亦唔代表之後一定再有買盤。' },
    formula: 'F_{5d}=\\sum_{i=0}^{4}F_{1d,t-i}',
    formulaLabel: { en: 'The sum inherits each daily vendor estimate.', yue: '加總結果會繼承每日平台估算嘅限制。' }, viz: 'cash', sample: '+¥118m · est.',
  },
]

type OscKind = 'golden' | 'death' | 'overbought' | 'oversold' | 'top' | 'bottom' | 'turnUp' | 'secondGolden'
type OscConfig = {
  indicator: string
  originalName: string
  cantoneseName: string
  fast: string
  slow: string
  formula: string
  params: string
  viz: VisualKind
  sample: string
  overbought?: Bilingual
  oversold?: Bilingual
}

const names: Record<OscKind, { en: string; original: string; yue: string }> = {
  golden: { en: 'golden cross', original: '金叉', yue: '金叉' },
  death: { en: 'death cross', original: '死叉', yue: '死叉' },
  overbought: { en: 'overbought', original: '超买', yue: '超買' },
  oversold: { en: 'oversold', original: '超卖', yue: '超賣' },
  top: { en: 'bearish divergence', original: '顶背离', yue: '頂背馳' },
  bottom: { en: 'bullish divergence', original: '底背离', yue: '底背馳' },
  turnUp: { en: 'turning upward', original: '拐头向上', yue: '掉頭向上' },
  secondGolden: { en: 'second golden cross', original: '二次金叉', yue: '二次金叉' },
}

const configs: Record<string, OscConfig> = {
  MACD: {
    indicator: 'MACD', originalName: 'MACD', cantoneseName: 'MACD', fast: 'DIF', slow: 'DEA', params: '12, 26, 9', viz: 'macd', sample: 'DIF ↑ DEA',
    formula: '\\mathrm{DIF}=\\mathrm{EMA}_{12}(C)-\\mathrm{EMA}_{26}(C),\\quad \\mathrm{DEA}=\\mathrm{EMA}_9(\\mathrm{DIF})',
  },
  KDJ: {
    indicator: 'KDJ', originalName: 'KDJ', cantoneseName: 'KDJ 隨機指標', fast: 'K', slow: 'D', params: '9, 3, 3', viz: 'kdj', sample: 'K ↑ D',
    formula: '\\mathrm{RSV}=100\\frac{C-L_9}{H_9-L_9},\\quad K=\\tfrac23K_{-1}+\\tfrac13RSV,\\quad D=\\tfrac23D_{-1}+\\tfrac13K',
    overbought: { en: 'K and/or D above 80 is a common overbought convention; J may exceed 100.', yue: 'K 或 D 高過 80 係常見超買定義；J 線仲可以升穿 100。' },
    oversold: { en: 'K and/or D below 20 is a common oversold convention; J may fall below 0.', yue: 'K 或 D 低過 20 係常見超賣定義；J 線亦可以跌穿 0。' },
  },
  RSI: {
    indicator: 'RSI', originalName: 'RSI', cantoneseName: 'RSI 相對強弱指標', fast: 'short-period RSI', slow: 'long-period RSI', params: '14, or platform-specific fast/slow pairs', viz: 'oscillator', sample: 'RSI > 70',
    formula: '\\mathrm{RSI}=100-\\frac{100}{1+\\overline{\\mathrm{Gain}}/\\overline{\\mathrm{Loss}}}',
    overbought: { en: 'RSI above 70 indicates unusually strong recent gains relative to losses.', yue: 'RSI 高過 70，代表近期升幅相對跌幅特別強，屬常見超買區。' },
    oversold: { en: 'RSI below 30 indicates unusually strong recent losses relative to gains.', yue: 'RSI 低過 30，代表近期跌勢相對升幅特別強，屬常見超賣區。' },
  },
  CCI: {
    indicator: 'CCI', originalName: 'CCI', cantoneseName: 'CCI 順勢指標', fast: 'CCI', slow: 'signal line', params: '14 or 20', viz: 'oscillator', sample: 'CCI > +100',
    formula: '\\mathrm{CCI}=\\frac{TP-\\mathrm{SMA}_n(TP)}{0.015\\times\\mathrm{MeanDev}_n(TP)},\\quad TP=\\frac{H+L+C}{3}',
    overbought: { en: 'CCI above +100 places the typical price unusually far above its recent average.', yue: 'CCI 高過 +100，代表典型價明顯高於近期平均水平，屬常見超買區。' },
    oversold: { en: 'CCI below −100 places the typical price unusually far below its recent average.', yue: 'CCI 低過 −100，代表典型價明顯低於近期平均水平，屬常見超賣區。' },
  },
  BIAS: {
    indicator: 'BIAS', originalName: 'BIAS', cantoneseName: 'BIAS 乖離率', fast: 'short-period BIAS', slow: 'long-period BIAS', params: '6, 12, 24 or platform defaults', viz: 'oscillator', sample: 'BIAS = +8%',
    formula: '\\mathrm{BIAS}_n=\\frac{C-\\mathrm{MA}_n(C)}{\\mathrm{MA}_n(C)}\\times100\\%',
    overbought: { en: 'A large positive BIAS means price is stretched above its moving average; thresholds are asset-specific.', yue: '正乖離好大，代表股價明顯扯離均線上方；具體門檻要按資產特性調整。' },
    oversold: { en: 'A large negative BIAS means price is stretched below its moving average; thresholds are asset-specific.', yue: '負乖離好大，代表股價明顯扯離均線下方；具體門檻要按資產特性調整。' },
  },
  WR: {
    indicator: 'WR', originalName: 'WR', cantoneseName: 'WR 威廉指標', fast: 'fast WR', slow: 'slow WR', params: '14 or platform fast/slow pairs', viz: 'oscillator', sample: 'WR < −80',
    formula: '\\%R=\\frac{HH_n-C}{HH_n-LL_n}\\times(-100)',
    overbought: { en: 'On the −100 to 0 scale, WR above −20 means the close is near the top of its recent range.', yue: '用 −100 至 0 刻度時，WR 高過 −20，代表收市價接近近期區間頂部，屬超買。' },
    oversold: { en: 'On the −100 to 0 scale, WR below −80 means the close is near the bottom of its recent range.', yue: '用 −100 至 0 刻度時，WR 低過 −80，代表收市價接近近期區間底部，屬超賣。' },
  },
  MTM: {
    indicator: 'MTM', originalName: 'MTM', cantoneseName: 'MTM 動量指標', fast: 'MTM', slow: 'MAMTM', params: '12-period momentum with a 6-period average', viz: 'oscillator', sample: 'MTM ↑ MAMTM',
    formula: '\\mathrm{MTM}_t=C_t-C_{t-n},\\quad \\mathrm{MAMTM}_t=\\mathrm{MA}_m(\\mathrm{MTM})',
  },
}

function makeOscillator(indicator: string, kind: OscKind): FilterItem {
  const c = configs[indicator]
  const n = names[kind]
  const id = `${indicator.toLowerCase()}-${kind}`
  let summary: Bilingual
  let scenario: Bilingual
  let practice: Bilingual
  let caution: Bilingual
  let formula = c.formula
  let formulaLabel: Bilingual = { en: `Standard ${c.indicator} parameters: ${c.params}; platform defaults may differ.`, yue: `${c.indicator} 常見參數：${c.params}；平台預設值可能唔同。` }
  let viz: VisualKind = c.viz
  let sample = c.sample

  if (kind === 'golden' || kind === 'death') {
    const up = kind === 'golden'
    summary = up
      ? { en: `${c.fast} crosses from below to above ${c.slow}, suggesting momentum is turning upward.`, yue: `${c.fast} 由下向上穿過 ${c.slow}，代表短期動能開始轉強。` }
      : { en: `${c.fast} crosses from above to below ${c.slow}, suggesting momentum is turning downward.`, yue: `${c.fast} 由上向下跌穿 ${c.slow}，代表短期動能開始轉弱。` }
    scenario = up
      ? { en: `After a pullback in a broader uptrend, a ${c.indicator} golden cross can time a momentum-resumption watchlist.`, yue: `大趨勢向上、回調後出現 ${c.indicator} 金叉，可以列入動能恢復觀察名單。` }
      : { en: `After a rebound in a broader downtrend, a ${c.indicator} death cross can serve as a risk-reduction alert.`, yue: `大趨勢向下、反彈後出現 ${c.indicator} 死叉，可以視作減低風險提示。` }
    practice = { en: `Confirm with price structure and volume. Start with standard parameters (${c.params}) before optimizing.`, yue: `用價格結構同成交量確認，先用常見參數（${c.params}），唔好一開始就過度優化。` }
    caution = { en: 'Frequent crosses in a sideways market create whipsaws. WR uses an inverse scale, so verify the vendor’s cross convention.', yue: '橫行市會出現大量假交叉；WR 刻度方向相反，更要確認平台點定義金叉死叉。' }
    formula += up ? ',\\qquad '+c.fast+'_{t-1}\\leq '+c.slow+'_{t-1},\\ '+c.fast+'_t>'+c.slow+'_t' : ',\\qquad '+c.fast+'_{t-1}\\geq '+c.slow+'_{t-1},\\ '+c.fast+'_t<'+c.slow+'_t'
    sample = up ? `${c.fast} ↑ ${c.slow}` : `${c.fast} ↓ ${c.slow}`
  } else if (kind === 'overbought' || kind === 'oversold') {
    summary = (kind === 'overbought' ? c.overbought : c.oversold) as Bilingual
    scenario = kind === 'overbought'
      ? { en: 'Use the reading to avoid chasing and tighten a predefined risk plan—not to short a strong trend automatically.', yue: '可以用嚟避免追高同收緊風險計劃，但唔好見超買就自動沽空強勢股。' }
      : { en: 'Use the reading to build a reversal watchlist, then wait for price stabilization or a cross-back signal.', yue: '可以先列入反彈觀察名單，再等股價企穩或者重新穿越門檻確認。' }
    practice = { en: `Backtest thresholds by asset and regime, and pair the reading with trend and liquidity checks. Standard parameters: ${c.params}.`, yue: `按資產同市況回測門檻，再配合趨勢同流動性檢查。常見參數：${c.params}。` }
    caution = { en: 'Overbought can stay overbought in an uptrend; oversold can stay oversold in a downtrend.', yue: '強勢上升可以長期超買，弱勢下跌亦可以長期超賣，極端讀數唔等於即時轉勢。' }
  } else if (kind === 'top' || kind === 'bottom') {
    const top = kind === 'top'
    summary = top
      ? { en: `Price forms a higher high while ${c.indicator} forms a lower high: upward momentum is not confirming the price peak.`, yue: `股價高位一個比一個高，但 ${c.indicator} 高位反而一個比一個低，即上升動能冇配合。` }
      : { en: `Price forms a lower low while ${c.indicator} forms a higher low: downward momentum is not confirming the price trough.`, yue: `股價低位一個比一個低，但 ${c.indicator} 低位反而一個比一個高，即下跌動能開始唔配合。` }
    scenario = top
      ? { en: 'After an extended rally, use bearish divergence as a prompt to review stops and position size.', yue: '累積升幅已大後出現頂背馳，可以藉此檢查止蝕位同倉位大細。' }
      : { en: 'After an extended decline, use bullish divergence as a watchlist trigger, not a stand-alone entry.', yue: '長期下跌後出現底背馳，可以列入觀察名單，但唔應該單憑呢點入市。' }
    practice = { en: 'Mark swing points with a fixed rule and wait for a trendline, support/resistance or crossover confirmation.', yue: '用固定規則界定高低點，再等趨勢線、支持阻力或交叉訊號確認。' }
    caution = { en: 'Divergence can persist through several peaks or troughs; subjective swing selection changes the signal.', yue: '背馳可以持續幾個高低點，而人手揀點嘅主觀差異會改變訊號。' }
    formula = top
      ? 'P_{H,2}>P_{H,1},\\qquad '+c.indicator+'_{H,2}<'+c.indicator+'_{H,1}'
      : 'P_{L,2}<P_{L,1},\\qquad '+c.indicator+'_{L,2}>'+c.indicator+'_{L,1}'
    formulaLabel = { en: 'Compare clearly defined corresponding price and indicator swing points.', yue: '要對比清楚界定、互相對應嘅價格同指標高低點。' }
    viz = 'divergence'
    sample = top ? 'Price ↑ / momentum ↓' : 'Price ↓ / momentum ↑'
  } else if (kind === 'turnUp') {
    summary = { en: 'CCI changes from falling to rising, often after an extreme reading. It flags improving momentum before a full reversal is proven.', yue: 'CCI 由下跌轉為上升，常見於極端讀數後，代表動能改善，但未證明已全面轉勢。' }
    scenario = { en: 'CCI turning up below −100 can be an early watch signal; a later move above −100 provides clearer confirmation.', yue: 'CCI 喺 −100 以下掉頭向上，可以作早期觀察訊號；之後升返穿 −100 會更明確。' }
    practice = { en: 'Define “turn” using closed bars and avoid reacting to an unfinished candle.', yue: '要用已收市嘅 K 線確認掉頭，唔好被未完成蠟燭嘅即時變化誤導。' }
    caution = { en: 'A one-bar uptick can be noise; require a meaningful slope change or follow-through.', yue: '單日微升可能只係雜訊，最好要求明顯斜率改變或後續確認。' }
    formula = '\\mathrm{CCI}_{t-2}>\\mathrm{CCI}_{t-1},\\qquad \\mathrm{CCI}_t>\\mathrm{CCI}_{t-1}'
    formulaLabel = { en: 'A simple two-segment turn definition.', yue: '用兩段走勢定義簡單掉頭。' }
    sample = 'CCI turns ↑'
  } else {
    summary = { en: 'MTM crosses above its moving average for a second time after an earlier cross failed to develop into a sustained move.', yue: 'MTM 第一次金叉後未形成持續升勢，之後再一次上穿其均線，就叫二次金叉。' }
    scenario = { en: 'A second cross near a higher price low can suggest a more constructive base than the first attempt.', yue: '如果第二次金叉同時出現較高低點，底部結構可能比第一次更完整。' }
    practice = { en: 'Define the maximum spacing and intervening price structure; require the second cross to occur on closed data.', yue: '要定義兩次金叉相距幾耐、中間價格結構點樣，並用已完成數據確認。' }
    caution = { en: 'There is no universal second-cross algorithm; platform results depend on its exact rule.', yue: '二次金叉無統一算法，結果好睇平台具體規則。' }
    formula += ',\\qquad \\mathrm{MTM}\\uparrow\\mathrm{MAMTM}\\ \\text{for the 2nd time}'
    sample = '2nd MTM cross'
  }

  return {
    id, category: 'technical', group: c.indicator, name: `${c.indicator} ${n.en}`,
    original: `${c.originalName}${n.original}`, cantonese: `${c.cantoneseName}${n.yue}`,
    summary, scenario, practice, caution, formula, formulaLabel, viz, sample,
  }
}

const patternTechnical: FilterItem[] = [
  {
    id: 'macd-red-second-wave', category: 'technical', group: 'MACD', name: 'MACD second red wave', original: 'MACD红二波', cantonese: 'MACD 紅柱第二波',
    summary: { en: 'After a positive MACD histogram contracts without a durable bearish reversal, it expands again above zero—a second upside momentum wave.', yue: 'MACD 紅柱喺零軸上收縮，但未形成持續死叉，之後再度放大，代表第二段上升動能。' },
    scenario: { en: 'Use it to study trend continuation after a shallow consolidation, ideally near a rising moving average.', yue: '適合研究淺幅整固後嘅趨勢延續，最好股價同時靠近上升中嘅均線。' },
    practice: { en: 'Require the histogram to stay above zero or define exactly how much negativity is allowed between waves.', yue: '要定義兩段紅柱之間可唔可以跌穿零軸、可以跌幾多，避免規則含糊。' },
    caution: { en: '“Second wave” is platform-specific and can repaint before the bar closes.', yue: '「二波」屬平台自訂形態，未完成 K 線前柱體可以改變。' },
    formula: 'M_t=\\mathrm{DIF}_t-\\mathrm{DEA}_t,\\qquad M_t>M_{t-1}>0\\ \\text{after contraction}',
    formulaLabel: { en: 'Some Chinese platforms plot 2 × (DIF − DEA); the shape is unchanged.', yue: '部分內地平台用 2×（DIF−DEA）畫柱，形態方向不變。' }, viz: 'macd', sample: 'Red wave 2',
  },
  {
    id: 'boll-lower-break', category: 'technical', group: 'BOLL', name: 'Bollinger lower-band breakout', original: 'BOLL突破下轨', cantonese: 'BOLL 跌穿下軌',
    summary: { en: 'Price crosses below the lower Bollinger Band, showing an unusually large move relative to recent volatility.', yue: '股價跌穿保力加通道下軌，代表相對近期波動率出現異常大嘅向下移動。' },
    scenario: { en: 'In a range market it may precede mean reversion; in a strong downtrend price can “walk the band.”', yue: '橫行市可能之後均值回歸，但強跌勢中股價可以沿下軌一直行。' },
    practice: { en: 'Wait for a close back inside the band or another reversal rule; check whether bands are expanding.', yue: '可以等收市重返通道內或其他轉勢規則，並留意通道係咪擴張。' },
    caution: { en: 'Breaking the lower band is not, by itself, a statistical guarantee of being cheap.', yue: '跌穿下軌唔代表統計上已經平到極，更唔係必然反彈保證。' },
    formula: '\\mathrm{Lower}_t=\\mathrm{SMA}_{20}(C)-2\\sigma_{20}(C),\\qquad C_t<\\mathrm{Lower}_t',
    formulaLabel: { en: 'Standard bands use 20 periods and 2 standard deviations.', yue: '標準通道常用 20 週期同 2 倍標準差。' }, viz: 'bands', sample: 'Close < lower',
  },
  {
    id: 'boll-middle-break', category: 'technical', group: 'BOLL', name: 'Bollinger middle-band breakout', original: 'BOLL突破中轨', cantonese: 'BOLL 升穿中軌',
    summary: { en: 'Price crosses above the middle band, usually a 20-period simple moving average, suggesting improving trend control.', yue: '股價升穿通常係 20 週期簡單移動平均嘅中軌，代表短期趨勢控制改善。' },
    scenario: { en: 'After a pullback, a close above the middle band can confirm recovery if volume and market trend agree.', yue: '回調後收市升返中軌，如果成交量同大市的確配合，可以確認修復。' },
    practice: { en: 'Distinguish upward from downward “breakthrough” in the screener and require a closed-bar cross.', yue: '喺選股器要分清向上定向下突破，並用收市後數據確認。' },
    caution: { en: 'A flat middle band in a range can be crossed repeatedly without a durable trend.', yue: '橫行時中軌較平，股價可以反覆穿越但冇持續趨勢。' },
    formula: '\\mathrm{Middle}_t=\\mathrm{SMA}_{20}(C),\\qquad C_{t-1}\\leq M_{t-1},\\ C_t>M_t',
    formulaLabel: { en: 'The cross condition uses completed closes.', yue: '穿越條件用已完成嘅收市價確認。' }, viz: 'bands', sample: 'Close > middle',
  },
  {
    id: 'boll-upper-break', category: 'technical', group: 'BOLL', name: 'Bollinger upper-band breakout', original: 'BOLL突破上轨', cantonese: 'BOLL 升穿上軌',
    summary: { en: 'Price crosses above the upper band, signaling exceptional strength relative to recent volatility—not automatic overvaluation.', yue: '股價升穿上軌，代表相對近期波動率特別強，但唔等於估值一定過高。' },
    scenario: { en: 'A breakout from a tight squeeze can continue; a late parabolic move can instead revert quickly.', yue: '通道收窄後突破可以延續，但如果已經升好耐再加速，亦可能急速回吐。' },
    practice: { en: 'Check band width, volume and prior consolidation; use a trailing exit rule rather than guessing the top.', yue: '要睇通道寬度、成交量同之前整固，再用移動離場規則，唔好估頂。' },
    caution: { en: 'Strong trends often close outside the upper band repeatedly.', yue: '強勢趨勢可以連續多日收喺上軌外，唔好單憑呢點即時做反方向。' },
    formula: '\\mathrm{Upper}_t=\\mathrm{SMA}_{20}(C)+2\\sigma_{20}(C),\\qquad C_t>\\mathrm{Upper}_t',
    formulaLabel: { en: 'The upper band moves as volatility changes.', yue: '上軌會隨波動率變化而移動。' }, viz: 'bands', sample: 'Close > upper',
  },
  {
    id: 'pattern-box-breakout', category: 'technical', group: 'K-line patterns', name: 'Box-range breakout', original: '箱体突破', cantonese: '箱體突破',
    summary: { en: 'Price closes above a well-defined horizontal trading range after repeated failures near the same resistance.', yue: '股價多次喺相近阻力位受阻後，終於收市升穿一個清晰橫行區間。' },
    scenario: { en: 'A close above a six-week box with higher-than-normal volume can indicate acceptance above resistance.', yue: '收市升穿六星期箱頂兼放量，可能代表市場開始接受阻力上方價位。' },
    practice: { en: 'Set the box using prior data only and measure follow-through or a successful retest.', yue: '箱體只可以用之前數據界定，之後睇有冇延續或成功回抽確認。' },
    caution: { en: 'Intraday spikes and immediately failed breakouts are common false signals.', yue: '日內衝穿但收市跌返入箱，或者突破後即刻失敗，都係常見假訊號。' },
    formula: 'C_t>\\max(H_{t-n},\\ldots,H_{t-1})+\\delta',
    formulaLabel: { en: 'δ is an optional buffer; define the box window n in advance.', yue: 'δ 係可選緩衝，箱體窗口 n 要預先定義。' }, viz: 'pattern', sample: 'Range ↑',
  },
  {
    id: 'pattern-ascending-channel', category: 'technical', group: 'K-line patterns', name: 'Ascending channel', original: '上升通道', cantonese: '上升通道',
    summary: { en: 'Price forms higher highs and higher lows within two roughly parallel rising boundaries.', yue: '股價高低點逐步向上，並大致喺兩條平行上升軌道之間運行。' },
    scenario: { en: 'A pullback toward the lower channel in a healthy uptrend can offer a defined invalidation level.', yue: '健康升勢中回落至通道底部，可以提供較明確嘅失效位做風險管理。' },
    practice: { en: 'Fit boundaries with a reproducible rule and avoid forcing a channel onto noisy price action.', yue: '用可重複規則畫通道，唔好硬將唔規則走勢塞入兩條線。' },
    caution: { en: 'Channels are descriptive and can break without warning, especially around news.', yue: '通道只係描述現狀，遇到消息可以毫無預警咁跌穿。' },
    formula: 'P_{H,2}>P_{H,1},\\qquad P_{L,2}>P_{L,1}',
    formulaLabel: { en: 'Higher swing highs and lows are the core structure.', yue: '高位同低位同時上移，係上升通道核心。' }, viz: 'trend', sample: 'Higher highs',
  },
  {
    id: 'pattern-bullish-cannon', category: 'technical', group: 'K-line patterns', name: 'Bullish cannon (up–down–up)', original: '多方炮', cantonese: '多方炮',
    summary: { en: 'A three-candle continuation pattern: a bullish candle, a smaller pullback candle, then another bullish candle that reasserts control.', yue: '三支 K 線組成嘅延續形態：先陽線，再細幅回調，最後另一支陽線重新主導。' },
    scenario: { en: 'The third candle closing above the first candle’s high with stronger volume provides clearer confirmation.', yue: '第三支陽線收市升過第一支高位，兼且成交更強，確認會較清晰。' },
    practice: { en: 'Require an existing uptrend and compare the third close with the first candle—not just the colors.', yue: '要先有上升趨勢，再比較第三支同第一支嘅收市高位，唔好只睇紅綠顏色。' },
    caution: { en: 'Exact body, gap and volume rules differ across screening platforms.', yue: '各平台對實體、缺口同成交量要求唔同，要先睇定義。' },
    formula: 'C_1>O_1,\\quad C_2<O_2,\\quad C_3>O_3,\\qquad C_3>C_1',
    formulaLabel: { en: 'A simplified rule; many implementations add relative body and volume tests.', yue: '呢個係簡化規則，好多平台會再加實體同成交量條件。' }, viz: 'candles', sample: 'Up · down · up',
  },
  {
    id: 'pattern-engulfing', category: 'technical', group: 'K-line patterns', name: 'Full-body engulfing reversal', original: '穿头破脚', cantonese: '穿頭破腳',
    summary: { en: 'The second candle’s real body fully engulfs the prior body, excluding shadows. It can be bullish at a bottom or bearish at a top.', yue: '第二支 K 線實體完全包住前一支實體，上下影線唔計；底部可看好，頂部可看淡。' },
    scenario: { en: 'After a clear decline, a large bullish body engulfing the prior bearish body can signal aggressive dip buying.', yue: '明確跌勢後，大陽線實體包住前陰線，可能代表低買力量積極反攻。' },
    practice: { en: 'Require a preceding trend and check the next session’s follow-through and volume.', yue: '之前必須有明確趨勢，再睇翌日有冇延續同成交量配合。' },
    caution: { en: 'Without trend context, the same geometry is much less informative.', yue: '如果之前只係橫行，相同形狀嘅參考價值會低好多。' },
    formula: 'O_t<C_{t-1},\\quad C_t>O_{t-1}\\quad \\text{(bullish, prior candle bearish)}',
    formulaLabel: { en: 'Reverse the inequalities for bearish engulfing; shadows are excluded.', yue: '看淡形態將方向相反；上下影線唔納入實體。' }, viz: 'candles', sample: 'Body engulf',
  },
  {
    id: 'pattern-bullish-engulfing', category: 'technical', group: 'K-line patterns', name: 'Bullish engulfing', original: '阳包阴', cantonese: '陽包陰',
    summary: { en: 'A bullish real body completely covers the previous bearish real body: open below its close and close above its open.', yue: '陽線實體完全覆蓋前一支陰線實體：開市低過前收市，收市高過前開市。' },
    scenario: { en: 'Near established support, the pattern can show buyers reversing the prior session’s losses.', yue: '如果出現喺明確支持位附近，可能代表買方一舉收復上日失地。' },
    practice: { en: 'Compare body sizes and confirm with support, volume and a higher close thereafter.', yue: '比較兩支實體大細，再用支持位、成交量同後續較高收市確認。' },
    caution: { en: 'In a strong downtrend, one engulfing candle may produce only a brief bounce.', yue: '強跌勢入面，一支陽包陰可能只帶嚟短暫反彈。' },
    formula: 'C_{t-1}<O_{t-1},\\quad O_t\\leq C_{t-1},\\quad C_t\\geq O_{t-1}',
    formulaLabel: { en: 'The real bodies—not the wicks—must overlap fully.', yue: '要求完全包住嘅係實體，唔係上下影線。' }, viz: 'candles', sample: 'Bull engulf',
  },
  {
    id: 'pattern-volume-rise', category: 'technical', group: 'K-line patterns', name: 'Price rise on expanding volume', original: '放量上涨', cantonese: '放量上升',
    summary: { en: 'Price rises while volume exceeds a chosen baseline, showing broader participation behind the move.', yue: '股價上升同時成交量高過指定基準，代表升勢有較多成交參與。' },
    scenario: { en: 'A 4% rise on 1.8× its 20-day average volume is more participatory than the same rise on thin volume.', yue: '升 4% 兼成交達 20 日均量 1.8 倍，通常比縮量升 4% 有更多參與支持。' },
    practice: { en: 'Define the volume multiplier and price threshold before screening; avoid tiny-base comparisons.', yue: '選股前定義放量倍數同升幅門檻，亦要避免基期成交量太細。' },
    caution: { en: 'Heavy volume near a long-run top can represent distribution rather than healthy demand.', yue: '累積大升後嘅天量上升，亦可能係大戶派貨，未必係健康需求。' },
    formula: 'r_t>0,\\qquad V_t>k\\times\\overline V_{20},\\quad k>1',
    formulaLabel: { en: 'k is the chosen expansion multiplier.', yue: 'k 係你預設嘅放量倍數。' }, viz: 'volume', sample: '1.8× volume',
  },
  {
    id: 'pattern-old-duck-head', category: 'technical', group: 'K-line patterns', name: 'Old duck head pattern', original: '老鸭头', cantonese: '老鴨頭',
    summary: { en: 'A Chinese moving-average pattern: an initial rally and pullback form a “duck head,” followed by renewed strength above key averages.', yue: '內地均線形態：先上升、再回調形成「鴨頭」，其後企穩重要均線並再度轉強。' },
    scenario: { en: 'A shallow pullback holding above a rising medium-term average can set up the pattern’s later breakout.', yue: '回調幅度唔深，又守得住上升中嘅中期均線，有機會形成之後突破嘅基礎。' },
    practice: { en: 'Treat it as a visual checklist of trend, pullback, contraction and breakout—not a mystical shape.', yue: '將佢拆成趨勢、回調、縮量、突破四項檢查，唔好當係神秘圖案。' },
    caution: { en: 'The label is highly vendor-specific; its exact moving averages and neckline vary.', yue: '呢個名稱非常平台化，採用均線同頸線定義都可以唔同。' },
    formula: '\\mathrm{MA}_{short}>\\mathrm{MA}_{long},\\qquad C_{\\mathrm{breakout}}>C_{\\mathrm{neckline}}',
    formulaLabel: { en: 'A simplified confirmation, not a universal definition.', yue: '只係簡化確認條件，唔係統一定義。' }, viz: 'average', sample: 'Trend + retest',
  },
  {
    id: 'pattern-golden-pin', category: 'technical', group: 'K-line patterns', name: 'Golden-pin bottom probe', original: '金针探底', cantonese: '金針探底',
    summary: { en: 'A candle with a long lower shadow and a small real body near the top of its range, showing rejection of intraday lows.', yue: 'K 線下影線好長、實體細兼近全日高位收，代表日內低價被明顯拒絕。' },
    scenario: { en: 'After a decline, buyers recover most of a sharp intraday drop, creating a possible support clue.', yue: '跌勢後買方收復大部分日內急跌，可能提供支持位線索。' },
    practice: { en: 'Quantify shadow-to-body ratio and require next-day confirmation above the candle high.', yue: '量化下影線同實體比例，再等翌日升穿該 K 線高位確認。' },
    caution: { en: 'One long wick can result from a brief liquidity gap and does not prove accumulation.', yue: '一條長下影可能只係短暫流動性缺口，唔證明有人收集。' },
    formula: '\\min(O,C)-L\\geq k\\lvert C-O\\rvert,\\qquad H-\\max(O,C)\\ \\text{small}',
    formulaLabel: { en: 'k defines the lower-shadow multiple; also require trend context.', yue: 'k 定義下影線倍數，同時要配合趨勢背景。' }, viz: 'candles', sample: 'Long lower wick',
  },
]

const movingAverages: FilterItem[] = [
  {
    id: 'ma5-cross-ma10', category: 'technical', group: 'Moving averages', name: '5-day MA crosses above 10-day MA', original: '5日上穿10日线', cantonese: '5 日線升穿 10 日線',
    summary: { en: 'The five-session simple moving average crosses above the ten-session average, indicating short-term prices are strengthening.', yue: '5 日簡單移動平均線由下向上穿過 10 日線，代表短期價格開始轉強。' },
    scenario: { en: 'Use it as an early trend-following alert after a base, with volume and a longer-term trend filter.', yue: '底部整固後出現，可以作早期順勢提示，再配成交量同長期趨勢篩選。' },
    practice: { en: 'Calculate on closed, consistently adjusted prices and define the exact cross condition.', yue: '用已完成兼一致復權嘅價格計算，並寫清楚穿越條件。' },
    caution: { en: 'Short averages are sensitive and produce many false crosses in choppy markets.', yue: '短均線反應快，但喺反覆市況會出現好多假交叉。' },
    formula: '\\mathrm{MA}_{5,t-1}\\leq\\mathrm{MA}_{10,t-1},\\qquad \\mathrm{MA}_{5,t}>\\mathrm{MA}_{10,t}',
    formulaLabel: { en: 'MAₙ is the mean of the last n closing prices.', yue: 'MAₙ 係最近 n 個收市價嘅平均值。' }, viz: 'average', sample: 'MA5 ↑ MA10',
  },
  {
    id: 'price-above-ma250', category: 'technical', group: 'Moving averages', name: 'Price above the 250-day MA', original: '股价超过250日线', cantonese: '股價高於 250 日線',
    summary: { en: 'The latest price is above a roughly one-year moving average, a common long-term trend filter.', yue: '最新股價高於約一年嘅移動平均線，係常見長期趨勢篩選條件。' },
    scenario: { en: 'Require price above MA250 before allowing long swing-trade candidates, then assess entry separately.', yue: '做中線長倉選股時，可先要求股價企喺 250 日線上，再另外研究買入時機。' },
    practice: { en: 'Check whether the average itself is rising; a flat line gives weaker trend evidence.', yue: '要睇 250 日線本身係咪向上；如果條線平坦，趨勢證據會弱啲。' },
    caution: { en: 'This is a state filter, not a fresh crossover, so a stock may already be far extended.', yue: '呢個係狀態篩選，唔係新突破，所以入選股可能已經升得好遠。' },
    formula: 'C_t>\\mathrm{MA}_{250,t},\\qquad \\mathrm{MA}_{250,t}=\\frac1{250}\\sum_{i=0}^{249}C_{t-i}',
    formulaLabel: { en: 'Require at least 250 valid trading sessions.', yue: '必須有至少 250 個有效交易日數據。' }, viz: 'average', sample: 'Above MA250',
  },
  {
    id: 'price-cross-ma250', category: 'technical', group: 'Moving averages', name: 'Price crosses above the 250-day MA', original: '股价上穿250日线', cantonese: '股價升穿 250 日線',
    summary: { en: 'Price moves from below to above the 250-day average today, marking a fresh long-term trend transition.', yue: '股價今日由 250 日線下方升穿上方，代表長期趨勢剛出現轉變。' },
    scenario: { en: 'A fresh cross after a long base can be more informative than simply screening every stock already above MA250.', yue: '長期整固後剛升穿，通常比單純篩所有已經喺線上嘅股票更有事件意義。' },
    practice: { en: 'Add a small buffer or require subsequent closes to reduce one-day false breaks.', yue: '可以加少少緩衝，或者要求其後幾日繼續企穩，減少一日假突破。' },
    caution: { en: 'A cross can occur while MA250 is still falling, which is weaker than a rising-line cross.', yue: '如果升穿時 250 日線仍然向下，訊號通常弱過升穿上升中嘅均線。' },
    formula: 'C_{t-1}\\leq\\mathrm{MA}_{250,t-1},\\qquad C_t>\\mathrm{MA}_{250,t}',
    formulaLabel: { en: 'A two-sided cross condition distinguishes this from “above MA250.”', yue: '前後兩日條件可以同「高於 250 日線」清楚區分。' }, viz: 'average', sample: 'Fresh MA250 cross',
  },
]

export const technicalFilters: FilterItem[] = [
  ...baseTechnical,
  ...(['golden', 'death', 'top', 'bottom'] as OscKind[]).map((kind) => makeOscillator('MACD', kind)),
  ...(['golden', 'death', 'overbought', 'oversold', 'top', 'bottom'] as OscKind[]).map((kind) => makeOscillator('KDJ', kind)),
  ...(['golden', 'death', 'overbought', 'oversold', 'top', 'bottom'] as OscKind[]).map((kind) => makeOscillator('RSI', kind)),
  ...(['overbought', 'oversold', 'top', 'bottom', 'turnUp'] as OscKind[]).map((kind) => makeOscillator('CCI', kind)),
  ...(['golden', 'death', 'overbought', 'oversold', 'top', 'bottom'] as OscKind[]).map((kind) => makeOscillator('BIAS', kind)),
  ...(['golden', 'death', 'overbought', 'oversold'] as OscKind[]).map((kind) => makeOscillator('WR', kind)),
  ...(['golden', 'death', 'secondGolden'] as OscKind[]).map((kind) => makeOscillator('MTM', kind)),
  patternTechnical.find((item) => item.id === 'macd-red-second-wave')!,
  ...patternTechnical.filter((item) => item.group === 'BOLL'),
  ...patternTechnical.filter((item) => item.group === 'K-line patterns'),
  ...movingAverages,
]
