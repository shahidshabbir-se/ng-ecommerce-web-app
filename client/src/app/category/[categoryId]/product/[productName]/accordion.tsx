'use client'

import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import icons from '@data/generator/icon.generator'
import { productData } from '@interfaces/getProductData.interfaces'

interface Props {
  productDescription: productData['productDescription']
  productCare: string
}

export default function AccordionUsage({
  productDescription,
  productCare
}: Props) {
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  const manipulateHTML = (html: string) => {
    // Create a temporary DOM element
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html
    // Manipulate the HTML content
    const listItems = tempDiv.querySelectorAll('li')
    const divs = tempDiv.querySelectorAll('div')
    divs.forEach((div) => {
      div.classList.add('text-lg', 'leading-6')
    })
    listItems.forEach((item) => {
      item.classList.add('list-disc', 'ml-5', 'mb-4', 'text-lg')
    })

    return tempDiv.innerHTML
  }

  const manipulatedDescription = manipulateHTML(productDescription)

  return (
    <div className='text-lg'>
      <Accordion
        onChange={handleChange('panel1')}
        defaultExpanded
        style={{
          boxShadow: 'none',
          borderTop: '1px solid rgba(0, 0, 0, .125)',
          borderRadius: '0rem',
          marginTop: '4px',
          marginBottom: '4px'
        }}
      >
        <AccordionSummary
          expandIcon={<icons.chevron className='size-4 text-black' />}
          aria-controls='panel1-content'
          id='panel1-header'
          className='font-bold'
          style={{
            margin: '0px',
            padding: '0px'
          }}
        >
          Description
        </AccordionSummary>
        <AccordionDetails>
          <div dangerouslySetInnerHTML={{ __html: manipulatedDescription }} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        onChange={handleChange('panel2')}
        style={{
          boxShadow: 'none',
          borderTop:
            expanded === 'panel2' ? '1px solid rgba(0, 0, 0, .125)' : 'none',
          marginTop: '4px',
          marginBottom: '4px'
        }}
      >
        <AccordionSummary
          expandIcon={<icons.chevron className='size-4 text-black' />}
          aria-controls='panel2-content'
          id='panel2-header'
          className='font-bold'
          style={{
            margin: '0px',
            padding: '0px'
          }}
        >
          Product Care
        </AccordionSummary>
        <AccordionDetails>{productCare}</AccordionDetails>
      </Accordion>
      <Accordion
        onChange={handleChange('panel3')}
        style={{
          boxShadow: 'none',
          borderTop:
            expanded === 'panel3' ? '1px solid rgba(0, 0, 0, .125)' : 'none',
          borderBottom: '1px solid rgba(0, 0, 0, .125)',
          borderRadius: '0rem',
          marginTop: '4px',
          marginBottom: '4px'
        }}
      >
        <AccordionSummary
          expandIcon={<icons.chevron className='size-4 text-black' />}
          aria-controls='panel3-content'
          id='panel3-header'
          className='font-bold'
          style={{
            margin: '0px',
            padding: '0px'
          }}
        >
          Returns
        </AccordionSummary>
        <AccordionDetails>
          <ul className='grid gap-3'>
            <li>
              Something not quite right? You have 28 days from the day you
              receive it, to send something back.
            </li>
            <li>
              Please note, we cannot offer refunds on fashion face masks,
              cosmetics, pierced jewellery, and swimwear or lingerie if the
              hygiene seal is not in place or has been broken.
            </li>
            <li>
              Items of footwear and/or clothing must be unworn and unwashed with
              the original labels attached. Also, footwear must be tried on
              indoors. This does not affect your statutory rights.
            </li>
            <li>
              Click
              <a
                href='https://www.nastygal.co.uk/pages/informational/returns'
                className='mx-1 font-bold underline'
                target='blank'
              >
                here
              </a>
              to view our full Returns Policy.
            </li>
          </ul>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
