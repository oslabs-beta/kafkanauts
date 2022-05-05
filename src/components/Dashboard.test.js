import { render, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query';
import { act } from 'react-dom/test-utils';
import Dashboard from './Dashboard'

describe('Dashboard Component', () => {
  const queryClient = new QueryClient()
  const { queryByTitle } = render(<QueryClientProvider client={queryClient}><BrowserRouter> <Dashboard/> </BrowserRouter></QueryClientProvider>)
  const dashboard = queryByTitle('dashboard')

  it('dashboard should be enabled by default', () => {
    expect(dashboard).toBeEnabled
  })
  it('dashboard should be visible', () => {
    expect(dashboard).toBeVisible
  }) 
  act(() => {
    // Find the link (perhaps using the text content)
    const navLink = document.querySelector('.nav-link');
    // Click it
    navLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  act(() => {
    // Find the link (perhaps using the text content)
    const navLink = document.querySelector('.nav-link');
    // Click it
    navLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  act(() => {
    // Find the link (perhaps using the text content)
    const navLink = document.querySelector('.nav-link');
    // Click it
    navLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  act(() => {
    // Find the link (perhaps using the text content)
    const navLink = document.querySelector('.nav-link');
    // Click it
    navLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  act(() => {
    // Find the link (perhaps using the text content)
    const navLink = document.querySelector('.nav-link');
    // Click it
    navLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });


})