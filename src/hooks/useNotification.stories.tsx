import NotificationDemo from '@/components/demo/NotificationDemo'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof NotificationDemo> = {
  title: 'Hooks/useNotification',
  component: NotificationDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof NotificationDemo>

export const Demo: Story = {
  render: () => <NotificationDemo />
}

export const HookUsage: Story = {
  parameters: {
    docs: {
      description: {
        story: `
The \`useNotification\` hook provides an easy way to handle browser notifications in your React application.

### Usage example

\`\`\`typescript
const {
  notificationPermission,
  requestNotificationPermission,
  sendNotification
} = useNotification()
\`\`\`
        `
      }
    }
  },
  render: () => <div>See the code example in the docs above.</div>
}
