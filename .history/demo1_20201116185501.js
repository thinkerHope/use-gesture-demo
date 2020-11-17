// draggable list（y axis）
// https://codesandbox.io/s/draggable-list-forked-w1jvi?file=/src/index.js:1788-1795
import React, { useRef } from 'react'
import { render } from 'react-dom'
import { clamp } from './utils/clamp'
import { swap } from './utils/swap'
import { useDrag } from 'react-use-gesture'
import { useSprings, animated } from 'react-spring'


const fn = (order, curIndex, down, originalIndex) => index => 
  originalIndex === index && down ?
    {
      y: curIndex * 100 + y,
      zIndex: '1',
      shadow: 15,
      scale: 1.1,
      immediate: key => key === 'zIndex' || key === 'y'
    } :
    {
      y: order.indexOf(index) * 100,
      zIndex: '0',
      shadow: 1,
      scale: 1,
      immediate: false
    }


function DraggableList({ items }) {
  const order = useRef(items.map((_, i) => i))

  const [springs, setSprings] = useSprings(items.length, fn(order.current))
  const bind = useDrag(({ args: [originalIndex], movement: [_, y], down }) => {
    let curIndex = order.current.indexOf(originalIndex)
    let curRow = clamp(Math.round((curIndex * 100 + y) / 100), 0, items.length - 1)
    let newOrder = swap(order, curIndex, curRow)
    setSprings(newOrder, curIndex, down, originalIndex) 
    if (!down) order.current = newOrder
  })

  return (
    <div className="content">
      {
        springs.map(({ zIndex, y, shadow, scale }, i) => {
          return (
            <animated.div
              {...bind(i)}
              style={{
                zIndex,
                transform: y.to(y => `translate3d(0, ${y}px 0)`),
                boxShadow: shadow.to(s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
                scale
              }}
              children={items[i]}
            />
          )
        })
      }
    </div>
  )
}

render(<DraggableList items={'1 2 3 4'.split(' ')} />, document.getElementById('root'))
