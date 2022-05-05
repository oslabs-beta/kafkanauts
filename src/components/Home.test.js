import { render, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from './Home'

describe('Home Component', () => {
  const { queryByTitle } = render(<BrowserRouter> <Home/> </BrowserRouter>)
  const submitBtn = queryByTitle('submit-button')
  const portField = queryByTitle('port-field')
  const nicknameField = queryByTitle('nickname-field')

  it('submit button should be disabled by default', () => {
    expect(submitBtn).toBeDisabled
  })
  it('port field should be empty by default', () => {
    expect(portField.innerText).toBe(undefined)
  })
  it('nickname field should be empty by default', () => {
    expect(nicknameField.innerText).toBe(undefined)
  })
  it('submit button should be enabled if Port Field contains a number', () => {
    fireEvent.keyPress(portField, { key: '1', code: 'Digit1' })
    expect(submitBtn).toBeEnabled
  })
  it('submit button should be disabled if Port Field contains a non-number', () => {
    fireEvent.keyPress(portField, { key: 'a', code: 'KeyA' })
    expect(submitBtn).toBeDisabled
  })
})