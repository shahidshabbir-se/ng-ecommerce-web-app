import React from 'react'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  isMegaMenuOpen: boolean
  onMegaMenuEnter: () => void
  onMegaMenuLeave: () => void
}

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  useMediaQuery,
  useTheme,
  Typography
} from '@mui/material'

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  isMegaMenuOpen,
  onMegaMenuEnter,
  onMegaMenuLeave
}) => {
  return (
    <aside>
      {/* Mobile Sidebar */}
      <IconButton
        edge='start'
        color='inherit'
        aria-label='menu'
        onClick={onToggle}
      >
        Menu
      </IconButton>
      <div
        className={`fixed left-0 top-0 h-full w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='p-4'>
          <Accordion>
            <AccordionSummary
              expandIcon={`Icon`}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography>Category 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ul>
                  <li className='mb-1'>Item 1</li>
                  <li className='mb-1'>Item 2</li>
                  <li className='mb-1'>Item 3</li>
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={`Icon`}
              aria-controls='panel2a-content'
              id='panel2a-header'
            >
              <Typography>Category 2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ul>
                  <li className='mb-1'>Item A</li>
                  <li className='mb-1'>Item B</li>
                  <li className='mb-1'>Item C</li>
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={`Icon`}
              aria-controls='panel3a-content'
              id='panel3a-header'
            >
              <Typography>Category 3</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ul>
                  <li className='mb-1'>Item X</li>
                  <li className='mb-1'>Item Y</li>
                  <li className='mb-1'>Item Z</li>
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
