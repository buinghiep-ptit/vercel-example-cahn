import { useState } from 'react'
import { motion } from 'framer-motion'

export function ImageLazy() {
  const [imageLoading, setImageLoading] = useState(true)
  const [pulsing, setPulsing] = useState(true)

  const imageLoaded = () => {
    setImageLoading(false)
    setTimeout(() => setPulsing(false), 0)
  }

  return (
    <div
      className={`${pulsing ? 'pulse' : ''} loadable`}
      style={{ width: '100%', background: '#ccc' }}
    >
      <motion.img
        initial={{ height: '100%', opacity: 0 }}
        animate={{
          height: imageLoading ? '100%' : 'auto',
          opacity: imageLoading ? 0 : 1,
        }}
        transition={{ opacity: { delay: 0.5, duration: 0.4 } }}
        onLoad={imageLoaded}
        width="100%"
        src="https://source.unsplash.com/random"
      />
    </div>
  )
}
