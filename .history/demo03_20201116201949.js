import React, { useRef } from 'react'
import { render } from 'react-dom'
import { clamp } from './utils/clamp'
import { swapII } from './utils/swap'
import { useDrag, addV } from 'react-use-gesture'
import { useSprings, animated } from 'react-spring'

const width = 50
const height = 50
const index2Pos = (index, col = 4) => [~~((index + 1) / col) * width, ((index + 1) % col) * height]

const fn = (order, down, originalIndex, curIndex, x, y) => index => 
  index === originalIndex && down ?
   {
    xy: addV(index2Pos(curIndex), [x, y]),
    zIndex: '1',
    shadow: 15,
    scale: 1.1,
    immediate: key => key === 'zIndex' || key === 'xy',
   } : 
   {
    xy: index2Pos(order.indexOf(index)),
    zIndex: '0',
    shadow: 1,
    scale: 1,
    immediate: false,
   }

function Draggable({ items }) {
  const order = useRef(items.map((_, i) => i))
  const [springs, setSprings] = useSprings(items.length, fn(order.current))
  const bind = useDrag(({ args: [originalIndex], movement: [x, y], down }) => {

  })


  return (
    <div className="content"> 
      {springs.map(({ xy, zIndex, shadow, scale }, i) => (
        <animated.div 
          {...bind(i)}
          style={{
            transform: xy.to((x, y) => `translate3d(${x}px, ${y}px 0)`),
            boxShadow: shadow.to(s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
            zIndex,
            scale,
          }}
          children={items[i]}
        />
      ))}
    </div>
  )
}

render(
  <DraggableList items={'1 2 3 4 5 6 7 8 9 10 11'.split(' ')} />, 
  document.getElementById('root')
)
