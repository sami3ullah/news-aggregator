import { describe, it, expect } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import UserSettings from './UserSettings'

describe('UserSettings Component', () => {
  it('renders without crashing', () => {
    render(<UserSettings />)
    expect(screen.getByRole('user-settings')).toBeInTheDocument()
  })

  it('opens the sheet when the settings button is clicked', async () => {
    render(<UserSettings />)
    const settingsButton = screen.getByRole('user-settings')
    fireEvent.click(settingsButton)
    expect(await screen.findByText('User Preferences')).toBeInTheDocument()
  })
})
