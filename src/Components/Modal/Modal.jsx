import { useEffect, useRef } from 'react'
import css from './Modal.module.css'

export const Modal = ({image, onClose}) => {

    const firstRender = useRef(false)

    useEffect(() => {
      if(firstRender.current === true){
        window.addEventListener('keydown', handleKeyDown)
      }

      return () => {
        firstRender.current = true
        window.removeEventListener('keydown', handleKeyDown)
      }
    }, [])

    const handleKeyDown = e => {
            if (e.code === 'Escape') {  
                onClose()              
            }
    }

    const handleBackdropClick = e => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

        return (
            <div className={css.Overlay} onClick={handleBackdropClick}>
                <div className={css.Modal}>
                    <img src={image.largeImageURL} alt={image.tags} width="900" />
                </div>
            </div>
        )
}

