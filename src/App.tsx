import NotificationDemo from '@/components/demo/NotificationDemo'
import React from 'react'
import PasswordStrengthChecker from '@/components/generic/password-strength-checker/PasswordStrenghChecker'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const App: React.FC = () => {
  return (
    <div className='flex flex-col gap-4 justify-center items-center h-screen'>
      <Card>
        <CardHeader>
          <CardTitle>Password Strength Checker</CardTitle>
        </CardHeader>
        <CardContent>
          <PasswordStrengthChecker />
        </CardContent>
      </Card>

      <NotificationDemo />
    </div>
  )
}

export default App
