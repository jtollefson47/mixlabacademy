import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from '@/app/page'

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />)
    
    const heading = screen.getByRole('heading', { 
      name: /learn audio engineering by playing/i 
    })
    expect(heading).toBeInTheDocument()
  })

  it('renders the Play EQ Match CTA button', () => {
    render(<Home />)
    
    const playButton = screen.getByRole('link', { 
      name: /play eq match/i 
    })
    expect(playButton).toBeInTheDocument()
    expect(playButton).toHaveAttribute('href', '/games/eq-match')
  })

  it('renders the Browse Games CTA button', () => {
    render(<Home />)
    
    const browseButton = screen.getByRole('link', { 
      name: /browse games/i 
    })
    expect(browseButton).toBeInTheDocument()
    expect(browseButton).toHaveAttribute('href', '/games')
  })

  it('renders the nonprofit mission section', () => {
    render(<Home />)
    
    const missionHeading = screen.getByRole('heading', { 
      name: /our mission/i 
    })
    expect(missionHeading).toBeInTheDocument()
    
    const missionText = screen.getByText(/we believe that quality audio engineering education/i)
    expect(missionText).toBeInTheDocument()
  })

  it('renders the featured games section', () => {
    render(<Home />)
    
    const featuredHeading = screen.getByRole('heading', { 
      name: /featured learning games/i 
    })
    expect(featuredHeading).toBeInTheDocument()
    
    const eqMatchCard = screen.getByRole('heading', { name: /^eq match$/i })
    expect(eqMatchCard).toBeInTheDocument()
  })
})
