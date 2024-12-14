import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import icons from '@icons'

interface AccordionTemplateProps {
  title: string
  items: string[]
  selectedItems: Set<string>
  onChange: (item: string, checked: boolean) => void
  isRadio?: boolean
}

const AccordionTemplate: React.FC<AccordionTemplateProps> = ({
  title,
  items,
  selectedItems,
  onChange,
  isRadio = false
}) => {
  return (
    <Accordion
      className='border-b border-[#e8e8e8] px-5 text-sm dark:border-[#464646]'
      sx={{
        '&:before': {
          display: 'none'
        },
        boxShadow: 'none',
        borderRadius: '0px',
        backgroundColor: 'transparent'
      }}
    >
      <AccordionSummary
        expandIcon={<icons.chevron className='dark:text-white' />}
        style={{
          margin: 0,
          padding: 0
        }}
      >
        <h3 className='text-black dark:text-white'>{title}</h3>
      </AccordionSummary>
      <AccordionDetails>
        {items.map((item) => (
          <div key={item} className='mb-3 flex flex-row items-center'>
            <input
              type={isRadio ? 'radio' : 'checkbox'}
              className="border-grey-200 mr-3 flex size-3 appearance-none items-center justify-center rounded-[2px] border-2 border-solid checked:bg-transparent checked:before:flex checked:before:items-center checked:before:justify-center checked:before:text-black checked:before:content-['✓'] dark:checked:before:text-white"
              checked={selectedItems.has(item)}
              onChange={(e) => onChange(item, e.target.checked)}
            />
            <span className='text-sm font-light text-black dark:text-white'>
              {item}
            </span>
          </div>
        ))}
      </AccordionDetails>
    </Accordion>
  )
}

export default AccordionTemplate
