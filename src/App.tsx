import NotificationDemo from '@/components/demo/NotificationDemo'
import { CallForPapersForm } from '@/components/forms/CallForPapersForm/CallForPapersForm'
import { CallForPapersFormData } from '@/components/forms/CallForPapersForm/schema'
import PasswordStrengthChecker from '@/components/generic/password-strength-checker/PasswordStrenghChecker'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const App: React.FC = () => {
  const handleFormSubmit = (data: CallForPapersFormData) =>
    console.log('Form submitted with data:', data)

  return (
    <div className='flex flex-col gap-4 justify-center items-center h-max m-5'>
      <Card>
        <CardHeader>
          <CardTitle>Password Strength Checker</CardTitle>
        </CardHeader>
        <CardContent>
          <PasswordStrengthChecker />
        </CardContent>
      </Card>

      <NotificationDemo />

      <Card>
        <CardHeader>
          <CardTitle>Call for papers form</CardTitle>
        </CardHeader>
        <CardContent>
          <CallForPapersForm
            onSubmit={handleFormSubmit}
            initialData={{ fullName: 'John Doe' }}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default App
