import { Meta, StoryObj } from '@storybook/react'
import { CallForPapersForm } from './CallForPapersForm'
import { CallForPapersFormData } from './schema'

const meta: Meta<typeof CallForPapersForm> = {
  title: 'UI/Forms/CallForPapersForm',
  component: CallForPapersForm,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'submitted' }
  }
}

export default meta

type Story = StoryObj<typeof CallForPapersForm>

export const Default: Story = {
  args: {
    onSubmit: (data: CallForPapersFormData) =>
      console.log('Form submitted:', data)
  }
}

export const WithInitialData: Story = {
  args: {
    initialData: {
      fullName: 'John Doe',
      contact: 'john@example.com',
      format: 'доповідь',
      topic: 'React Best Practices',
      description: 'An overview of the best practices for React development'
    },
    onSubmit: (data: CallForPapersFormData) =>
      console.log('Form submitted:', data)
  }
}

export const CustomFormatSelected: Story = {
  args: {
    initialData: {
      format: 'Інше',
      customFormat: 'Workshop'
    },
    onSubmit: (data: CallForPapersFormData) =>
      console.log('Form submitted:', data)
  }
}
