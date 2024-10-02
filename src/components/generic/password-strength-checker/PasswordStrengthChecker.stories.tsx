import { Meta, StoryObj } from '@storybook/react'
import PasswordStrengthChecker from './PasswordStrenghChecker'
import { PasswordStrength } from './types'

const meta: Meta<typeof PasswordStrengthChecker> = {
  title: 'UI/PasswordStrengthChecker/PasswordStrengthChecker',
  component: PasswordStrengthChecker,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    onPasswordChange: { action: 'passwordChanged' },
    onSubmit: { action: 'submitted' }
  }
}

export default meta

type Story = StoryObj<typeof PasswordStrengthChecker>

export const Default: Story = {
  args: {
    placeholder: 'Enter your password',
    onSubmit: (password: string, strength: PasswordStrength) =>
      console.log('Password submitted:', password, strength)
  }
}

export const WithInitialPassword: Story = {
  args: {
    initialPassword: 'initialPassword123',
    placeholder: 'Enter your password',
    onSubmit: (password: string, strength: PasswordStrength) =>
      console.log('Password submitted:', password, strength)
  }
}
