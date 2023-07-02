document.querySelectorAll('.transition-line button').forEach((button) => {
  let defaultScreenX = 0

  function moveTransitionButton(positionX) {
    button.style.transform = `translateX(${positionX}px)`;
  }

  function setWidth(value, node) {
    if (value >= window.innerWidth) {
      node.style.width = `${window.innerWidth}px`
    } else if (value < 0) {
      node.style.width = `0px`
    } else {
      node.style.width = `${value}px`
    }
  }

  function moveParentNodes(positionX) {
    button.parentNode.childNodes.forEach((node) => {
      if (node.className === 'transition-divisor') {
        node.style.transform = `translateX(${positionX}px)`;
      }
      
      const middleView = window.innerWidth / 2
      if (node.className === 'image-left') {
        setWidth(middleView + positionX, node)
      }
      
      if (node.className === 'image-right') {
        setWidth(middleView - positionX, node)
      }
    })
  }

  function onMoveTransitionLine(positionX, screenX) {
    moveTransitionButton(positionX)
    moveParentNodes(positionX, screenX)
  }

  function onTouchMoveTransitionLine(e) {
    const screenX = e.touches[0].screenX
    const positionX = e.touches[0].screenX - defaultScreenX 
    onMoveTransitionLine(positionX, screenX)
  }
  function onMouseMoveTransitionLine(e) {
    const positionX = e.screenX - defaultScreenX 
    onMoveTransitionLine(positionX, e.screenX)  
  }

  /**
   * Touch
   */
  button.addEventListener('touchstart', function (e) {
    defaultScreenX = e.touches[0].screenX
    button.addEventListener('touchmove', onTouchMoveTransitionLine)
  })
  
  button.addEventListener('touchend', function (e) {
    button.removeEventListener('touchmove', onTouchMoveTransitionLine)
  })
  
  /**
   * MOUSE
  */
 
 button.addEventListener('mousedown', function (e) {
    defaultScreenX = e.screenX
    button.addEventListener('mousemove', onMouseMoveTransitionLine)
  })

  button.addEventListener('mouseup', function (e) {
    button.removeEventListener('mousemove', onMouseMoveTransitionLine)
  })
    
})
