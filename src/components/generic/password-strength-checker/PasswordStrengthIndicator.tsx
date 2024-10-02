import React, { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { PasswordStrength } from './types'

interface PasswordStrengthIndicatorProps {
  strength: PasswordStrength
}

const STRENGTH_MAP: Record<
  PasswordStrength,
  [
    /**
     * The style of the strength.
     */
    string,
    /**
     * The indicator style of the strength.
     */
    string,
    /**
     * The text style of the strength.
     */
    string
  ]
> = {
  VeryWeak: ['Very Weak', 'bg-red-500', 'text-red-700'],
  Weak: ['Weak', 'bg-orange-500', 'text-orange-700'],
  Moderate: ['Moderate', 'bg-yellow-500', 'text-yellow-700'],
  Strong: ['Strong', 'bg-green-500', 'text-green-700'],
  VeryStrong: ['Very Strong', 'bg-blue-500', 'text-blue-700']
}

/**
 * PasswordStrengthIndicator is a component that displays the strength of a password.
 */
export const PasswordStrengthIndicator: React.FC<
  PasswordStrengthIndicatorProps
> = ({ strength }) => {
  const [label, indicatorStyle, textStyle] = STRENGTH_MAP[strength]
  const strengthIndicatorWidth = useMemo(() => {
    const strengthKeys = Object.keys(STRENGTH_MAP)
    const strengthValue = strengthKeys.indexOf(strength)
    const maxStrengthValue = strengthKeys.length - 1
    return `${(strengthValue / maxStrengthValue) * 100}%`
  }, [strength])

  return (
    <div className='space-y-2'>
      <div className='flex justify-between items-center'>
        <span className='text-sm font-bold text-gray-700'>
          Password Strength:
        </span>
        <span className={cn('text-sm font-semibold', textStyle)}>{label}</span>
      </div>
      <div className='h-2 bg-gray-200 rounded-full overflow-hidden'>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300',
            indicatorStyle
          )}
          style={{ width: strengthIndicatorWidth }}
        ></div>
      </div>
    </div>
  )
}
