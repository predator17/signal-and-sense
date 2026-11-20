import { useMemo, useState } from 'react'
import katex from 'katex'
import { Check, Copy, Sigma } from 'lucide-react'
import type { Bilingual as BilingualCopy } from '@/data/types'
import { Bilingual, type LanguageMode } from './Bilingual'

export function Formula({ formula, label, mode }: { formula: string; label?: BilingualCopy; mode: LanguageMode }) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')
  const html = useMemo(() => katex.renderToString(formula, {
    displayMode: true,
    throwOnError: false,
    strict: 'ignore',
    output: 'html',
  }), [formula])

  const copyFormula = async () => {
    try {
      await navigator.clipboard.writeText(formula)
      setCopyState('copied')
    } catch {
      setCopyState('error')
    }
    window.setTimeout(() => setCopyState('idle'), 2200)
  }

  return (
    <div className="formula-block">
      <div className="formula-heading">
        <div className="formula-title"><Sigma size={17} aria-hidden="true" /><span>Formula · 公式</span></div>
        <button type="button" className="icon-text-button" onClick={copyFormula} aria-label="Copy LaTeX formula">
          {copyState === 'copied' ? <Check size={16} /> : <Copy size={16} />}
          <span>{copyState === 'copied' ? 'Copied · 已複製' : copyState === 'error' ? 'Select to copy · 請手動複製' : 'Copy LaTeX · 複製公式'}</span>
        </button>
      </div>
      <div className="formula-render" dangerouslySetInnerHTML={{ __html: html }} />
      <details className="latex-source">
        <summary>View LaTeX source · 睇 LaTeX 原始碼</summary>
        <code>{formula}</code>
      </details>
      {label && <Bilingual copy={label} mode={mode} className="formula-note" />}
    </div>
  )
}
