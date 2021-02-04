import React, {useRef, useState} from 'react'
import type {Node} from 'beautiful-react-diagrams/@types/DiagramSchema'
import {InView} from 'react-intersection-observer'

import type {IChat} from '../../types'

export default function CanvasNode (props: Pick<Node<IChat>, any>) {
  const {id, content, data} = props
  const [closestNodeId, setClosestNodeId] = useState('')
  const [messageVisible, setMessageVisible] = useState(closestNodeId === id)
  const nodeRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null)
  const root = nodeRef.current?.parentNode?.parentNode

  const onChange = (
    inView: boolean,
    entry: IntersectionObserverEntry
  ) => {
    const childElement = entry?.target?.firstElementChild as HTMLElement
    const otherPersonId = childElement ? childElement?.id : ''

    if (
      childElement?.dataset &&
      childElement?.dataset.tile &&
      id === otherPersonId
    ) {
      setClosestNodeId(otherPersonId)
      setMessageVisible(true)
    }
  }

  return (
    <InView
      as='div'
      trackVisibility
      delay={100}
      rootMargin='50px'
      root={root as HTMLElement}
      onChange={onChange}>
      <div
        data-tile
        id={id}
        ref={nodeRef}
        className='message-list chat-user'
      >
        <section className='message -left'>
          <div className='nes-balloon from-left'>
            <p>{(data.isCurrentNode || messageVisible) && data.lastMessage}</p>
          </div>
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
