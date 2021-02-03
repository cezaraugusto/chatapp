import React from 'react'
import type {Node} from 'beautiful-react-diagrams/@types/DiagramSchema'

import {IChat} from '../../types'

export default function CanvasNode (props: Pick<Node<IChat>, any>) {
  const {data, content} = props
  const [xAxis, yAxis] = data.coordinates

  return (
    <div style={{background: '#717EC3', borderRadius: '10px'}}>
       <div>{xAxis} x {yAxis}</div>
      <div style={{padding: '10px', color: 'white'}}>
        {content} minus minus
      </div>
    </div>
  )
}
