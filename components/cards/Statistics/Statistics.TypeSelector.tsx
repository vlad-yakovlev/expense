import { Button } from '@/components/ui-kit/Button/Button.jsx'
import { ClientStatisticsType } from '@/types/client.js'

interface Props {
  value: ClientStatisticsType
  onChange: (value: ClientStatisticsType) => void
}

export const TypeSelector = ({ value, onChange }: Props) => (
  <div
    className="flex flex-none items-center gap-2"
    role="radiogroup"
    aria-label="Statistics type"
  >
    <Button
      rounded
      size="sm"
      theme={value === ClientStatisticsType.EXPENSES ? 'red' : 'white'}
      role="radio"
      aria-checked={value === ClientStatisticsType.EXPENSES ? 'true' : 'false'}
      onClick={() => onChange(ClientStatisticsType.EXPENSES)}
    >
      Expenses
    </Button>

    <Button
      rounded
      size="sm"
      theme={value === ClientStatisticsType.INCOMES ? 'green' : 'white'}
      role="radio"
      aria-checked={value === ClientStatisticsType.INCOMES ? 'true' : 'false'}
      onClick={() => onChange(ClientStatisticsType.INCOMES)}
    >
      Incomes
    </Button>
  </div>
)
