import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CallForPapersForm } from './CallForPapersForm'
import { FORMATS } from './schema'

describe('CallForPapersForm', () => {
  const renderForm = () => {
    const mockOnSubmit = vi.fn()
    const user = userEvent.setup()
    render(<CallForPapersForm onSubmit={mockOnSubmit} />)
    return { user, mockOnSubmit }
  }

  it('renders all form fields', () => {
    renderForm()

    const expectedFields = [
      "Прізвище, ім'я",
      'Мій контакт, по якому зручно спілкуватись',
      'Мій формат',
      'Тема доповіді',
      'Короткий опис, ідея'
    ]

    for (const field of expectedFields)
      expect(screen.getByLabelText(field)).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: 'Відправити' })
    ).toBeInTheDocument()
  })

  it('submits form with valid data', async () => {
    const { user, mockOnSubmit } = renderForm()

    await user.type(screen.getByLabelText("Прізвище, ім'я"), 'Іван Петренко')
    await user.type(
      screen.getByLabelText('Мій контакт, по якому зручно спілкуватись'),
      'ivan@example.com'
    )

    const select = screen.getByTestId('select')
    fireEvent.click(select)
    const [option] = screen.getAllByTestId('select-option')
    fireEvent.click(option)

    await user.type(
      screen.getByLabelText('Тема доповіді'),
      'Тестування React компонентів'
    )
    await user.type(
      screen.getByLabelText('Короткий опис, ідея'),
      'Огляд кращих практик тестування'
    )

    await user.click(screen.getByRole('button', { name: 'Відправити' }))

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        fullName: 'Іван Петренко',
        contact: 'ivan@example.com',
        format: FORMATS[0],
        topic: 'Тестування React компонентів',
        description: 'Огляд кращих практик тестування'
      })
    })
  })

  it('displays error messages for invalid form submission', async () => {
    const { user } = renderForm()

    await user.click(screen.getByRole('button', { name: 'Відправити' }))

    const expectedErrors = [
      /string must contain at least/i,
      /please enter a valid contact/i
    ]

    await waitFor(() => {
      expectedErrors.forEach((error) => {
        expect(screen.getAllByText(error).at(0)).toBeInTheDocument()
      })
    })
  })
})
