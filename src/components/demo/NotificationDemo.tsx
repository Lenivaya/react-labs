import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import useNotification from '@/hooks/useNotification'
import React, { useState } from 'react'

const NotificationDemo: React.FC = () => {
  const {
    notificationPermission,
    requestNotificationPermission,
    sendNotification
  } = useNotification()
  const [notificationTitle, setNotificationTitle] = useState('')
  const [notificationBody, setNotificationBody] = useState('')
  const [delayNotification, setDelayNotification] = useState(false)

  const handleRequestPermission = async () => {
    const result = await requestNotificationPermission()
    alert(`Notification permission: ${result}`)
  }

  const handleSendNotification = () => {
    if (!notificationTitle || !notificationBody) return

    const sendNotificationFunc = () => {
      const sent = sendNotification({
        title: notificationTitle,
        body: notificationBody,
        icon: '/vite.svg'
      })
      if (!sent) alert('Failed to send notification. Please check permissions.')
    }

    if (delayNotification) {
      alert(
        'Notification will be sent in 5 seconds. Feel free to switch tabs or minimize the browser.'
      )
      setTimeout(sendNotificationFunc, 5000)
    } else {
      sendNotificationFunc()
    }
  }

  return (
    <Card className='w-[350px] mx-auto mt-10'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>
          useNotification Demo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='mb-4'>
          <p className='text-sm text-gray-500 mb-2'>
            Current permission status:
          </p>
          <Badge
            variant={
              notificationPermission === 'granted' ? 'default' : 'secondary'
            }
          >
            {notificationPermission}
          </Badge>
        </div>
        <Button
          onClick={handleRequestPermission}
          variant={'outline'}
          className='w-full mb-4'
        >
          Request Permission
        </Button>
        <Input
          type='text'
          value={notificationTitle}
          onChange={(e) => setNotificationTitle(e.target.value)}
          placeholder='Enter notification title'
          className='mb-4'
        />
        <Input
          type='text'
          value={notificationBody}
          onChange={(e) => setNotificationBody(e.target.value)}
          placeholder='Enter notification body'
          className='mb-4'
        />
        <div className='flex items-center space-x-2 mb-4'>
          <Checkbox
            id='delay'
            checked={delayNotification}
            onCheckedChange={(checked) =>
              setDelayNotification(checked as boolean)
            }
          />
          <label
            htmlFor='delay'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Delay notification by 5 seconds
          </label>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSendNotification}
          disabled={notificationPermission !== 'granted'}
          className='w-full'
        >
          Send Notification
        </Button>
      </CardFooter>
    </Card>
  )
}

export default NotificationDemo
