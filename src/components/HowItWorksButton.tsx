import React, {useRef} from 'react'

function HowItWorksDialog () {
  const ref: React.MutableRefObject<HTMLDialogElement | null> = useRef(null)

  const handleOnClick = () => {
    ref.current?.showModal()
  }

  return (
    <>
      <button
        type='button'
        className='nes-btn is-primary'
        onClick={handleOnClick}
      >
        How it works?
      </button>
      <dialog className='nes-dialog' ref={ref}>
        <form method='dialog'>
          <h3 className='section-title'>How it works?</h3>
          <div className='lists'>
            <ul className='nes-list is-disc'>
              <li>
                {'When a user opens the web app, they should ' +
                'enter their name and then join.'}
              </li>
              <li>
                {'When a user joins, they are going to be ' +
                'visible to other users.'}
              </li>
              <li><pre />
                {'When a user is close enough to other users/they ' +
                'can write messages that will be visible to them based ' +
                'on their distance, so the closer, the more relevant the ' +
                'messages will be.'}
              </li>
            </ul>
          </div>
          <menu className='dialog-menu'>
            <button className='nes-btn is-primary'>Gotcha!</button>
          </menu>
        </form>
      </dialog>
    </>
  )
}

export default HowItWorksDialog
