import React, { useState, useCallback, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator'
import { PasswordStrengthVerifier } from './PasswordStrengthVerifier'
import { PasswordStrength } from './types'

interface PasswordStrengthCheckerProps {
  /**
   * Callback function that is called when the password changes.
   * @param password - The current password.
   * @param strength - The strength of the password.
   */
  onPasswordChange?: (password: string, strength: PasswordStrength) => void
  /**
   * Callback function that is called when the password is submitted.
   * @param password - The current password.
   * @param strength - The strength of the password.
   */
  onSubmit?: (password: string, strength: PasswordStrength) => void
  /**
   * The initial password to display.
   */
  initialPassword?: string
  /**
   * The placeholder text for the password input.
   */
  placeholder?: string
}

/**
 * PasswordStrengthChecker is a component that allows users to check the strength of their password.
 * It uses the PasswordStrengthVerifier to determine the strength of the password and displays the strength indicator.
 * It also allows the user to toggle the visibility of the password.
 * It also allows the user to submit the password along with its strength to the parent component.
 */
const PasswordStrengthChecker: React.FC<PasswordStrengthCheckerProps> = ({
  onPasswordChange,
  onSubmit,
  initialPassword = '',
  placeholder = 'Enter your password'
}) => {
  const [password, setPassword] = useState(initialPassword)
  const [strength, setStrength] = useState<PasswordStrength>('VeryWeak')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const newStrength = PasswordStrengthVerifier.verify(password)
    setStrength(newStrength)
    onPasswordChange?.(password, newStrength)
  }, [password, onPasswordChange])

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPassword = e.target.value
      setPassword(newPassword)
    },
    []
  )

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit?.(password, strength)
    },
    [password, strength, onSubmit]
  )

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-md space-y-4'>
      <div className='relative'>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          value={password}
          onChange={handlePasswordChange}
          className='pr-10'
        />
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <EyeOff className='h-4 w-4' />
          ) : (
            <Eye className='h-4 w-4' />
          )}
        </Button>
      </div>
      <PasswordStrengthIndicator strength={strength} />
      {onSubmit && (
        <Button type='submit' className='w-full'>
          Submit
        </Button>
      )}
    </form>
  )
}

export default PasswordStrengthChecker
