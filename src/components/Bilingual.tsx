import type { Bilingual as BilingualCopy } from '@/data/types'

export type LanguageMode = 'both' | 'en' | 'yue'

export function Bilingual({ copy, mode = 'both', className = '' }: { copy: BilingualCopy; mode?: LanguageMode; className?: string }) {
  return (
    <div className={`bilingual ${className}`}>
      {mode !== 'yue' && (
        <p lang="en" className="bilingual-en">
          {mode === 'both' && <span className="language-tag" aria-hidden="true">EN</span>}
          {copy.en}
        </p>
      )}
      {mode !== 'en' && (
        <p lang="yue" className="bilingual-yue">
          {mode === 'both' && <span className="language-tag" aria-hidden="true">粵</span>}
          {copy.yue}
        </p>
      )}
    </div>
  )
}
