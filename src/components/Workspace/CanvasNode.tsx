import React, {useRef, useState} from 'react'
import type {Node} from 'beautiful-react-diagrams/@types/DiagramSchema'
import {InView} from 'react-intersection-observer'

import type {IChat} from '../../types'

export default function CanvasNode (props: Pick<Node<IChat>, any>) {
  const {id, content, data} = props
  const [messageVisible, setMessageVisible] = useState(false)
  const nodeRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null)
  const root = nodeRef.current?.parentNode?.parentNode

  const onChange = () => {
    setMessageVisible(!messageVisible)
  }

  return (
    <InView
      as='div'
      data-tile
      trackVisibility
      delay={100}
      root={root as HTMLElement}
      onChange={onChange}>
      <div
        id={id}
        ref={nodeRef}
        className='message-list chat-user'
      >
        <section className='message -left'>
          {
          data.isCurrentNode || messageVisible
            ? (
              <div className='nes-balloon from-left'>
                <p>{data.lastMessage}</p>
              </div>
              )
            : null
          }
        </section>
        <div className='user-info'>
          <i className='nes-ash' />
          <div className='nes-badge'>
            <span
              className={data.isCurrentNode ? 'is-warning' : 'is-success'}>
              {data.isCurrentNode ? `${content} (you!)` : content}
            </span>
          </div>
        </div>
      </div>
    </InView>
  )
}
