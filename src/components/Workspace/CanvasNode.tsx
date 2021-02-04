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

  const onChange = (inView: boolean, entry: any) => {
    const childElement = entry.target.firstElementChild
    const otherPersonId = childElement.id || ''

    if (
      childElement.dataset &&
      childElement.dataset.tile &&
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
      root={root as any}
      onChange={onChange}>
      <div
        data-tile
        id={id}
        ref={nodeRef}
        style={{background: 'red', borderRadius: '10px'}}
      >
        <div style={{background: 'yellow'}}>
          {(data.isCurrentNode || messageVisible) && data.lastMessage}
        </div>
        <div style={{padding: '10px', color: 'white'}}>
          {content}
        </div>
      </div>
    </InView>
  )
}
