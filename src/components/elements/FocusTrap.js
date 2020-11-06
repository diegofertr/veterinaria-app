import React, { useRef, useEffect } from 'react'

export default function FocusTrap ({ isActive, children }) {
  const topTabtrap = useRef()
  const bottomTabtrap = useRef()
  const container = useRef()

  useEffect(() => {
    document.addEventListener('focusin', trapFocus)

    return function cleanup () {
      document.removeEventListener('focusin', trapFocus)
    }

    function trapFocus(event) {
      if (!isActive) return

      let elements;
      if (event.target === topTabtrap.current) {
        elements = getFocusableElements();

        if (elements.length > 0) {
          const lastElement = elements[elements.length - 1]
          lastElement.focus();
        }
      }

      if (event.target === bottomTabtrap.current) {
        elements = getFocusableElements();

        if (elements.length > 0) {
          const firstElement = elements[0]
          firstElement.focus();
        }
      }
    }

    function getFocusableElements () {
      if (!container.current) return []

      const FOCUSABLE_SELECTOR = [
        'button',
        'a[href]',
        'input',
        'select',
        'textarea',
        '[tabindex]',
        '[contenteditable]',
      ]
        .map(selector => `${selector}:not(:disabled):not([disabled])`)
        .join(', ')

      return Array.from(container.current.querySelectorAll(FOCUSABLE_SELECTOR))
        .filter(element => element !== topTabtrap.current)
        .filter(element => element !== bottomTabtrap.current)
    }
  }, [ isActive, topTabtrap, bottomTabtrap, container ])

  return (
    <div ref={ container }>
      { isActive && <span ref={topTabtrap} tabIndex="0" /> }
      { children }
      { isActive && <span ref={bottomTabtrap} tabIndex="0" /> }
    </div>
  )
}