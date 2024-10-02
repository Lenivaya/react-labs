import { Meta, StoryObj } from '@storybook/react'
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator'

const meta: Meta<typeof PasswordStrengthIndicator> = {
  title: 'UI/PasswordStrengthChecker/PasswordStrengthIndicator',
  component: PasswordStrengthIndicator,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light'
    }
  },
  tags: ['autodocs'],
  argTypes: {
    strength: {
      control: 'select',
      options: ['VeryWeak', 'Weak', 'Moderate', 'Strong', 'VeryStrong']
    }
  },
  decorators: [
    (Story) => (
      <div
        style={{ width: '300px', padding: '16px', backgroundColor: 'white' }}
      >
        <Story />
      </div>
    )
  ]
}

export default meta

type Story = StoryObj<typeof PasswordStrengthIndicator>

export const VeryWeak: Story = {
  args: {
    strength: 'VeryWeak'
  }
}

export const Weak: Story = {
  args: {
    strength: 'Weak'
  }
}

export const Moderate: Story = {
  args: {
    strength: 'Moderate'
  }
}

export const Strong: Story = {
  args: {
    strength: 'Strong'
  }
}

export const VeryStrong: Story = {
  args: {
    strength: 'VeryStrong'
  }
}
