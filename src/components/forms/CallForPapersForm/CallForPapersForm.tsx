import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { mergeManyIfs } from '@/lib/objects'
import { isSome } from '@/lib/option'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CallForPapersFormData, FORMATS, formSchema } from './schema'

interface CallForPapersFormProps {
  /**
   * Callback function that is called when the form is submitted.
   * @param data - The data submitted by the user.
   */
  onSubmit?: (data: CallForPapersFormData) => void
  /**
   * Initial data to prefill the form with.
   */
  initialData?: Partial<CallForPapersFormData>
}

/**
 * CallForPapersForm is a component that allows users to submit a call for papers form.
 */
export function CallForPapersForm({
  onSubmit,
  initialData
}: CallForPapersFormProps) {
  const [showCustomFormat, setShowCustomFormat] = useState(
    initialData?.format === 'Інше'
  )

  const form = useForm<CallForPapersFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: mergeManyIfs(
      {
        fullName: initialData?.fullName || '',
        contact: initialData?.contact || '',
        topic: initialData?.topic || '',
        description: initialData?.description || ''
      },
      [
        [isSome(initialData?.format), { format: initialData?.format }],
        [
          isSome(initialData?.customFormat),
          { customFormat: initialData?.customFormat }
        ]
      ]
    )
  })

  const handleSubmit = (values: CallForPapersFormData) => onSubmit?.(values)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='fullName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Прізвище, ім'я</FormLabel>
              <FormControl>
                <Input placeholder='Іван Петренко' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='contact'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Мій контакт, по якому зручно спілкуватись</FormLabel>
              <FormControl>
                <Input placeholder='email@example.com або +380...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='format'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Мій формат</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                  setShowCustomFormat(value === 'Інше')
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger data-testid='select'>
                    <SelectValue
                      placeholder='Оберіть формат'
                      className='capitalize'
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {FORMATS.map((format) => (
                    <SelectItem
                      data-testid='select-option'
                      key={format}
                      value={format}
                      className='capitalize'
                    >
                      {format}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {showCustomFormat && (
          <FormField
            control={form.control}
            name='customFormat'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Вкажіть свій формат</FormLabel>
                <FormControl>
                  <Input placeholder='Ваш формат' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name='topic'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Тема доповіді</FormLabel>
              <FormControl>
                <Input placeholder='Введіть тему доповіді' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Короткий опис, ідея</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Опишіть коротко вашу ідею...'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Це поле не обов'язкове, але допоможе нам краще зрозуміти вашу
                пропозицію.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Відправити</Button>
      </form>
    </Form>
  )
}
