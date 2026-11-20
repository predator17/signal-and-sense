import type { FilterItem } from './types'

export const dragonFilters: FilterItem[] = [
  {
    id: 'institution-net-buy', category: 'dragon', name: 'Institutional net buying', original: '机构净买入', cantonese: '機構淨買入',
    summary: { en: 'Disclosed institutional-seat purchases exceed sales on the Dragon–Tiger list for the selected session.', yue: '喺所選交易日龍虎榜披露入面，機構專用席位買入額高過賣出額，得出淨買入。' },
    scenario: { en: 'Net institutional buying after a results surprise can add context, but the disclosed seats cover only part of total trading.', yue: '業績驚喜後出現機構淨買入，可以補充資金背景，但披露席位只佔全部成交一部分。' },
    practice: { en: 'Normalize by daily trading value and read both the buy and sell legs across all disclosed seats.', yue: '將淨額除以當日成交額，並睇晒所有披露席位嘅買入同賣出兩邊。' },
    caution: { en: 'An institutional seat is not a named fund, and next-day direction is not guaranteed.', yue: '機構席位唔等於知道邊間基金，亦唔保證翌日股價點行。' },
    formula: 'Net_{inst}=\\sum Buy_{inst}-\\sum Sell_{inst}>0',
    formulaLabel: { en: 'Only qualifying disclosed seats are included.', yue: '只統計符合披露條件嘅機構席位。' }, viz: 'ranking', sample: '+¥38m',
  },
  {
    id: 'institution-net-sell', category: 'dragon', name: 'Institutional net selling', original: '机构净卖出', cantonese: '機構淨賣出',
    summary: { en: 'Disclosed institutional-seat sales exceed purchases on the Dragon–Tiger list for the selected session.', yue: '喺所選交易日龍虎榜披露入面，機構專用席位賣出額高過買入額，得出淨賣出。' },
    scenario: { en: 'Heavy net selling into a price spike can indicate profit-taking, rotation or hedging—not necessarily a fundamental verdict.', yue: '股價急升時機構大額淨賣出，可能係食糊、換馬或對沖，未必代表佢哋否定公司基本價值。' },
    practice: { en: 'Compare several sessions and look for changes in price acceptance after the disclosed sale.', yue: '比較連續幾日數據，再觀察披露沽售後市場仲接唔接得住貨。' },
    caution: { en: 'Gross buying can also be large; net selling alone does not reveal position size or intent.', yue: '即使淨賣出，總買入都可能好大；淨額唔會話你知原倉幾大或真正意圖。' },
    formula: 'Net_{inst}=\\sum Buy_{inst}-\\sum Sell_{inst}<0',
    formulaLabel: { en: 'A negative disclosed net value.', yue: '即係披露機構席位淨額為負。' }, viz: 'ranking', sample: '−¥26m',
  },
  {
    id: 'branch-net-buy', category: 'dragon', name: 'Brokerage-branch net buying', original: '营业部净买入', cantonese: '營業部淨買入',
    summary: { en: 'Purchases exceed sales across disclosed brokerage branches. It captures seat-level activity, which may represent many underlying clients.', yue: '披露營業部席位買入額高過賣出額，反映席位活動，但背後可以係好多唔同客戶。' },
    scenario: { en: 'Concentrated buying by a historically active branch may matter to short-term traders, yet identity inference remains uncertain.', yue: '活躍營業部集中買入，短線交易者會留意，但推測背後係邊個仍然好唔確定。' },
    practice: { en: 'Check concentration, duplicate buy/sell appearances and whether the seat trades both sides.', yue: '要睇買賣集中度、同一席位有冇同時上買賣榜，以及係咪雙邊交易。' },
    caution: { en: 'Do not equate a famous branch with a single trader or assume its future behavior.', yue: '唔好將知名營業部直接當成某一個炒家，更唔好假設佢之後一定點做。' },
    formula: 'Net_{branch}=\\sum Buy_{branch}-\\sum Sell_{branch}>0',
    formulaLabel: { en: 'Aggregate only the disclosed brokerage-branch seats.', yue: '只加總已披露嘅營業部席位。' }, viz: 'ranking', sample: '+¥71m',
  },
  {
    id: 'branch-net-sell', category: 'dragon', name: 'Brokerage-branch net selling', original: '营业部净卖出', cantonese: '營業部淨賣出',
    summary: { en: 'Sales exceed purchases across disclosed brokerage branches, indicating net supply from those visible seats.', yue: '披露營業部席位賣出額高過買入額，代表呢啲可見席位整體釋出淨供應。' },
    scenario: { en: 'A stock rises despite net branch selling, suggesting other buyers absorbed the disclosed supply.', yue: '營業部淨賣出但股價照升，可能代表有其他買方吸納咗披露席位嘅貨。' },
    practice: { en: 'Read net value alongside closing strength and turnover rather than treating every sale as bearish.', yue: '淨賣出要配收市強弱同換手率睇，唔好每次見沽售就當利淡。' },
    caution: { en: 'Only abnormal-trading disclosures are visible; ordinary days and undisclosed seats are absent.', yue: '龍虎榜只涵蓋異常交易披露，普通交易日同未披露席位睇唔到。' },
    formula: 'Net_{branch}=\\sum Buy_{branch}-\\sum Sell_{branch}<0',
    formulaLabel: { en: 'A negative net figure for the selected disclosed branches.', yue: '所選披露營業部嘅淨額為負。' }, viz: 'ranking', sample: '−¥45m',
  },
  {
    id: 'institution-buyer-count', category: 'dragon', name: 'Number of institutional buyers', original: '买入机构户数', cantonese: '買入機構席位數',
    summary: { en: 'Counts institutional seats appearing on the buy side. More seats can indicate broader visible participation, not necessarily more money.', yue: '計有幾多個機構席位出現喺買方，數目多可能代表參與較廣，但唔等於金額一定更大。' },
    scenario: { en: 'Four institutions buying ¥10m each may differ from one institution buying ¥100m, even with lower total net value.', yue: '四個機構各買 1,000 萬，同一個機構買 1 億，參與結構完全唔同，唔可以只比總額。' },
    practice: { en: 'Use the count with median seat value and concentration so duplicated or tiny entries do not mislead.', yue: '配合席位金額中位數同集中度睇，避免重複或超細席位造成錯覺。' },
    caution: { en: 'Seat count is not a count of unique beneficial owners.', yue: '席位數目唔等於真正獨立實益擁有人數目。' },
    formula: 'N_{buy}=\\#\\{i:Buy_{inst,i}>0\\}',
    formulaLabel: { en: 'Apply the exchange’s seat-classification and disclosure rules.', yue: '按交易所席位分類同披露規則計算。' }, viz: 'bars', sample: '4 seats',
  },
  {
    id: 'dragon-weekly-count', category: 'dragon', name: 'Dragon–Tiger appearances in one week', original: '一周上榜次数', cantonese: '一星期上龍虎榜次數',
    summary: { en: 'Counts how often a stock qualifies for public abnormal-trading disclosure over a week. It is an activity and volatility flag.', yue: '統計股票一星期有幾多次符合異常交易披露條件，用嚟標記活躍度同波動。' },
    scenario: { en: 'Three appearances in five sessions signal persistent unusual trading and justify a stricter risk review.', yue: '五個交易日上榜三次，代表異常交易持續，應該用更嚴格風險檢查。' },
    practice: { en: 'Inspect the reason for each appearance; limit-up moves, turnover and volatility tell different stories.', yue: '要逐次睇上榜原因：漲停、換手率、振幅各自代表唔同情況。' },
    caution: { en: 'Frequent appearances are not a quality score and can coincide with elevated downside risk.', yue: '經常上榜唔係質素評分，反而可能伴隨更高下跌風險。' },
    formula: 'N_{week}=\\sum_{d=1}^{5}\\mathbf{1}(\\text{stock disclosed on day }d)',
    formulaLabel: { en: 'Exchange disclosure criteria determine each indicator value.', yue: '每日是否上榜由交易所披露條件決定。' }, viz: 'calendar', sample: '3 / week',
  },
]

type Institution = {
  key: string
  en: string
  original: string
  yue: string
  description: BilingualDescription
  read: BilingualDescription
}
type BilingualDescription = { en: string; yue: string }

const institutions: Institution[] = [
  {
    key: 'qfii', en: 'QFII', original: 'QFII', yue: 'QFII 合格境外機構',
    description: { en: 'Qualified Foreign Institutional Investors accessing eligible mainland securities under the applicable regime.', yue: '合資格境外機構投資者按相關制度投資內地合資格證券。' },
    read: { en: 'Use it to observe disclosed foreign-institution participation, not all foreign ownership.', yue: '用嚟觀察已披露外資機構參與，但唔代表全部境外資金持股。' },
  },
  {
    key: 'trust', en: 'Trust companies', original: '信托', yue: '信託公司',
    description: { en: 'Trust products or trust-company accounts disclosed among holders, which may have varied investment mandates.', yue: '以信託產品或信託公司帳戶名義披露嘅持倉，背後投資授權可以好唔同。' },
    read: { en: 'Inspect product names, duration and related-party context before interpreting the position.', yue: '解讀前要睇產品名、期限同關聯方背景，唔好一概而論。' },
  },
  {
    key: 'insurance', en: 'Insurance institutions', original: '保险', yue: '保險機構',
    description: { en: 'Insurance-company funds reported in shareholder disclosures, often associated with liability-driven allocation.', yue: '股東披露入面嘅保險公司資金，通常同負債驅動資產配置有關。' },
    read: { en: 'Use changes as a medium-term allocation clue while checking solvency and reporting categories.', yue: '持倉變化可以作中期配置線索，但要配合償付能力同申報類別睇。' },
  },
  {
    key: 'broker', en: 'Securities firms', original: '券商', yue: '券商',
    description: { en: 'Securities-company positions disclosed in holder reports, which may reflect proprietary or other classified accounts.', yue: '股東報告披露嘅證券公司持倉，可能係自營或其他指定類別帳戶。' },
    read: { en: 'Check the account label before treating a position as a long-term proprietary investment.', yue: '要先睇帳戶標籤，唔好直接當成券商長線自營投資。' },
  },
  {
    key: 'social-security', en: 'Social-security funds', original: '社保', yue: '社保基金',
    description: { en: 'Disclosed national social-security portfolios, often followed for their relatively long investment horizon.', yue: '已披露嘅全國社保組合持倉，市場通常關注其較長投資年期。' },
    read: { en: 'Compare portfolio-number changes across reports, but do not infer a guarantee or endorsement.', yue: '可比較唔同報告期嘅組合編號變化，但唔好當成回報保證或官方背書。' },
  },
]

export const holdingFilters: FilterItem[] = institutions.flatMap((inst) => [
  {
    id: `${inst.key}-float-ratio`, category: 'holdings' as const, name: `${inst.en} share of floating stock`, original: `${inst.original}占流通股比`, cantonese: `${inst.yue}佔流通股比例`,
    summary: { en: `${inst.description.en} This ratio expresses its disclosed holdings as a share of floating stock.`, yue: `${inst.description.yue}呢個比率將其已披露持股除以流通股數。` },
    scenario: { en: `${inst.read.en} A move from 1.2% to 2.0% deserves a filing-level check.`, yue: `${inst.read.yue}如果比例由 1.2% 升至 2.0%，就要翻查原始披露。` },
    practice: { en: 'Compare the same reporting dates and denominator, and distinguish new buying from float changes.', yue: '要用相同報告日同分母比較，並分清係真正增持定流通股數改變。' },
    caution: { en: 'Holdings are point-in-time and lagged; only disclosed accounts are captured.', yue: '持倉係某一時點數據而且有滯後，亦只包括已披露帳戶。' },
    formula: `\\text{${inst.en} float ratio}=\\frac{S_{\\mathrm{${inst.key}}}}{S_{\\mathrm{float}}}\\times100\\%`,
    formulaLabel: { en: 'Use disclosed shares and a matching float denominator.', yue: '用已披露股數，再配一致嘅流通股分母。' }, viz: 'ownership' as const, sample: '2.4%',
  },
  {
    id: `${inst.key}-float-shares`, category: 'holdings' as const, name: `${inst.en} floating shares held`, original: `${inst.original}持流通股数量`, cantonese: `${inst.yue}持有流通股數`,
    summary: { en: `${inst.description.en} This is the disclosed number of floating shares held.`, yue: `${inst.description.yue}呢項係其已披露持有嘅流通股數量。` },
    scenario: { en: `${inst.read.en} Compare absolute shares with the ratio to separate accumulation from dilution.`, yue: `${inst.read.yue}將實際股數同比例對照，先分到係增持定股數攤薄。` },
    practice: { en: 'Reconcile the sum with the holder list and adjust comparisons for splits or bonus shares.', yue: '同股東名單逐項核對，遇拆股或送股要先調整再比較。' },
    caution: { en: 'The quantity alone says nothing about portfolio weight, cost basis or current conviction.', yue: '單看股數唔會知道佔組合比重、買入成本或機構而家有幾大信心。' },
    formula: `S_{\\mathrm{${inst.key}}}=\\sum_{j}S_{\\mathrm{disclosed},j}`,
    formulaLabel: { en: 'Sum the relevant disclosed accounts or portfolios.', yue: '將相關已披露帳戶或組合持股加總。' }, viz: 'shares' as const, sample: '8.6m sh',
  },
])
