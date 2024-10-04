import { useState, useEffect, useCallback } from 'react'

interface UseNotificationOptions extends NotificationOptions {
  title: string
}

/**
 * useNotification is a custom hook that provides functionality for sending notifications.
 *
 * @property {NotificationPermission} notificationPermission - The current permission status for notifications.
 * @property {Function} requestNotificationPermission - A function to request notification permission.
 * @property {Function} sendNotification - A function to send a notification.
 *
 * @returns {Object} An object containing the notification permission, a function to request notification permission, and a function to send a notification.
 */
const useNotification = () => {
  const [permission, setPermission] =
    useState<NotificationPermission>('default')

  useEffect(() => {
    if ('Notification' in window) setPermission(Notification.permission)
  }, [])

  const requestNotificationPermission = useCallback(async () => {
    if (!('Notification' in window)) return 'denied' as NotificationPermission

    const result = await Notification.requestPermission()
    setPermission(result)
    return result
  }, [])

  const sendNotification = useCallback(
    ({ title, ...options }: UseNotificationOptions) => {
      if (permission !== 'granted') return false

      new Notification(title, options)
      return true
    },
    [permission]
  )

  return {
    notificationPermission: permission,
    requestNotificationPermission,
    sendNotification
  }
}

export default useNotification
