### intruduction

React UseGesture is a set of hooks that let you bind mouse and touch events to any React component.



### useGesture官网

https://use-gesture.netlify.app/docs/



### api介绍

useDrag	Handles the drag gesture
useMove	Handles mouse move events
useHover	Handles mouse enter and mouse leave events
useScroll	Handles scroll events
useWheel	Handles wheel events
usePinch	Handles the pinch gesture
useGesture	Handles multiple gestures in one hook



### usage

```js
const bind = useDrag(state => doSomethingWith(state), config)
return <div {...bind(arg)} />
```



### 参数介绍

- **state**

  common state：

  ```js
  const bind = useXXXX(state => {
      // 几个常用的state
  	const {
          event, // （非原生事件）
          args, // 传入 bind 的参数
          
          
          xy, // [x,y]是指触摸点在视口的坐标
          previous, // 上一次的xy值
          initial, // 当gesture开始时的xy值
         
          offset, // 所有gesture累计的偏移量
          lastOffset, // 上一次gesture的offset值
         
          movemonet, // 最后一次gesture的offset值
          delta, // (movemoent - previous movement)
          
          down, // 鼠标按下时为true，松开为false
          
          velocity, // 绝对速度
          distance, // 相对于 initial 的距离（绝对值）
          direction, // [xDir, yDir], 用正负表示方向
          
          first,
          last,
          active,
  	} = state
  })
  ```

  

  > 特定的gesture有特定的属性。

  以 useDrag 为例：

  ```js
  const bind = useDrag(state => {
    const {
      swipe,     // [swipeX, swipeY] 0 if no swipe detected, -1 or 1 otherwise
      tap,       // 拖拽是否是否为点击（boolean）
    } = state
  })
  ```

  

- **options**

  ```js
  // 使用特定的gestrue hook时
  useDrag(
      state => doSomethingWith(state), 
      { ...genericOptions, ...dragOptions }
  )
  
  // 使用useGesture hook时
  useGesture(state => doSomethingWith(state), {
    // global options such as `domTarget`
    ...genericOptions,
    // gesture specific options
    drag:   dragOptions,
    wheel:  wheelOptions,
    pinch:  pinchOptions,
    scroll: scrollOptions,
    wheel:  wheelOptions,
    hover:  hoverOptions,
  })
  ```

  > `genericOptions`和特定gesture的`options`在官网有详细的介绍。
  
  ```js
  const options = {
  	initial,
  	thresold,
  	bounds,
  	distanceBounds,
  	rubberband,
  	axis,
  	lockDirection,
  	delay（drag only）,
      // ...
  }
  ```
  
  

