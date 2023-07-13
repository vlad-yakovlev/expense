import { CardBlock } from './CardBlock.tsx'

export interface CardSubtitleProps {
  subtitle: React.ReactNode
  actions?: React.ReactNode
}

export const CardSubtitle = ({ subtitle, actions }: CardSubtitleProps) => (
  <CardBlock className="my-2 bg-zinc-100">
    <h2 className="flex-auto min-w-0 font-medium truncate">{subtitle}</h2>
    {actions ? (
      <div className="flex-none flex items-center gap-2">{actions}</div>
    ) : null}
  </CardBlock>
)
