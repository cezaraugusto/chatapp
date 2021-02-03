import React, {useRef, useState} from 'react'
import type {Node} from 'beautiful-react-diagrams/@types/DiagramSchema'
import {InView} from 'react-intersection-observer'

import type {IChat} from '../../types'

export default function CanvasNode (props: Pick<Node<IChat>, any>) {
  const {id, content} = props
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
    console.log('tracked')
  }

  return (
    <InView
      as='div'
      trackVisibility
      threshold={[0, 0.25, 0.5, 0.75, 1]}
      delay={100}
      rootMargin='200px'
      root={root as any}
      onChange={onChange}>
      <div
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
