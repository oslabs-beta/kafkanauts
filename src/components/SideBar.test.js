import { render, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import SideBar from './SideBar'

describe('SideBar Component', () => {
  const { queryByTitle } = render(<BrowserRouter> <SideBar/> </BrowserRouter>)
  const mainNav = queryByTitle('main-row')

  it('sidebar should be enabled by default', () => {
    expect(mainNav).toBeEnabled
  })
  it('sidebar should be visible', () => {
    expect(mainNav).toBeVisible
  })
})