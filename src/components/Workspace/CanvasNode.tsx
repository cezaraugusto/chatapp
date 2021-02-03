import React, {useRef, useState} from 'react'
import type {Node} from 'beautiful-react-diagrams/@types/DiagramSchema'
import {InView} from 'react-intersection-observer'

import type {IChat} from '../../types'

export default function CanvasNode (props: Pick<Node<IChat>, any>) {
  const {id, content, data} = props
  const [
    messageVisiblityInternal,
    setMessageVisibilityInternal
  ] = useState({inView: true, id})

  const nodeRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null)
  const root = nodeRef.current?.parentNode?.parentNode
  const onChange = (inView: boolean, entry: any) => {
    // TODO: Get current and intersected IDs
    // and lift state up so SidebarChat can react.
    // TOOD: Each message within the sidebar should
    // share the same ID
    if (inView) {
      console.log('in view', entry.target.firstElementChild.id)
    } else {
      console.log('not in view')
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
        id={id}
        ref={nodeRef}
        style={{background: 'red', borderRadius: '10px'}}
      >
        <div style={{padding: '10px', color: 'white'}}>
          {content}
        </div>
      </div>
    </InView>
  )
}
