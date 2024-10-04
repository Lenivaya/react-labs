import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import useNotification from '@/hooks/useNotification'

describe('useNotification', () => {
  const originalNotification = global.Notification

  beforeEach(() => {
    vi.useFakeTimers()
    global.Notification = vi.fn() as unknown as typeof Notification
    // @ts-expect-error - permission is read-only
    global.Notification.permission = 'default'
    global.Notification.requestPermission = vi.fn().mockResolvedValue('granted')
  })

  afterEach(() => {
    vi.useRealTimers()
    global.Notification = originalNotification
    vi.restoreAllMocks()
  })

  it('should initialize with the correct default values', () => {
    const { result } = renderHook(() => useNotification())

    expect(result.current.notificationPermission).toBe('default')
    expect(typeof result.current.requestNotificationPermission).toBe('function')
    expect(typeof result.current.sendNotification).toBe('function')
  })

  it('should update permission when Notification.permission changes', async () => {
    // @ts-expect-error - permission is read-only
    global.Notification.permission = 'granted'
    const { result } = renderHook(() => useNotification())

    await vi.runAllTimersAsync()

    expect(result.current.notificationPermission).toBe('granted')
  })

  it('should request permission and update state', async () => {
    const { result } = renderHook(() => useNotification())

    await act(async () => {
      const permissionResult =
        await result.current.requestNotificationPermission()
      expect(permissionResult).toBe('granted')
    })

    expect(result.current.notificationPermission).toBe('granted')
    expect(Notification.requestPermission).toHaveBeenCalledTimes(1)
  })

  it('should send a notification when permission is granted', () => {
    // @ts-expect-error - permission is read-only
    global.Notification.permission = 'granted'
    const { result } = renderHook(() => useNotification())

    const notificationOptions = {
      title: 'Test Notification',
      body: 'This is a test',
      icon: 'test-icon.png'
    }
    const sent = result.current.sendNotification(notificationOptions)

    expect(sent).toBe(true)
    expect(Notification).toHaveBeenCalledWith('Test Notification', {
      body: 'This is a test',
      icon: 'test-icon.png'
    })
  })

  it('should not send a notification when permission is denied', () => {
    // @ts-expect-error - permission is read-only
    global.Notification.permission = 'denied'
    const { result } = renderHook(() => useNotification())

    const notificationOptions = {
      title: 'Test Notification',
      body: 'This is a test'
    }
    const sent = result.current.sendNotification(notificationOptions)

    expect(sent).toBe(false)
    expect(Notification).not.toHaveBeenCalled()
  })

  it('should handle cases where Notification API is not available', () => {
    // @ts-expect-error - Notification is not defined
    delete global.Notification

    const { result } = renderHook(() => useNotification())

    expect(result.current.notificationPermission).toBe('default')

    const notificationOptions = {
      title: 'Test Notification',
      body: 'This is a test'
    }
    const sent = result.current.sendNotification(notificationOptions)

    expect(sent).toBe(false)
  })
})
