import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  it('renders the logo', () => {
    render(<Header />)
    const logo = screen.getByAltText('logo')
    expect(logo).toBeInTheDocument()
  })

  it('renders the avatar with image', () => {
    render(<Header />)
    const avatarImage = screen.getByRole('img')
    expect(avatarImage).toBeInTheDocument()
  })

  it('renders the UserSettings component', () => {
    render(<Header />)
    const userSettings = screen.getByRole('user-settings')
    expect(userSettings).toBeInTheDocument()
  })
})
