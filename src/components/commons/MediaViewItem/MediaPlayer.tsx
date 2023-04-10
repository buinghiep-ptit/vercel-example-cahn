import * as React from 'react'
// import { hot } from 'react-hot-loader'
import ReactPlayer from 'react-player'

export interface IMediaPlayerProps {
  url: string
  setDuration?: (dur: number) => void
  isPlaying?: boolean
}

function MediaPlayer({ url, setDuration, isPlaying }: IMediaPlayerProps) {
  const [loading, setLoading] = React.useState(true)

  const [state, setState] = React.useState({
    url: null,
    pip: false,
    playing: true,
    controls: true,
    light: false,
    volume: 1,
    muted: false,
    played: 0,
    loaded: 0,
    playedSeconds: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
  })

  const playerRef = React.useRef(null) as any

  const handleProgress = (state: any) => {
    // We only want to update time slider if we are not currently seeking
    if (!state.seeking) {
      setState(prev => ({ ...prev, ...state }))
    }
  }

  const handleDuration = (duration: number) => {
    if (setDuration) setDuration(duration)
    setState(prev => ({ ...prev, duration: duration }))
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: `100%`,
        height: `100%`,
        backgroundColor: 'black',
      }}
    >
      <ReactPlayer
        key={1}
        ref={playerRef}
        style={{ position: 'absolute', top: 0, left: 0 }}
        width="100%"
        height="100%"
        url={url}
        controls={state.controls}
        config={{
          file: {
            attributes: {
              onContextMenu: (e: any) => e.preventDefault(),
              controlsList: 'nodownload',
            },
          },
        }}
        playing={isPlaying}
        muted={state.muted}
        onReady={() => setLoading(false)}
        onStart={() => {}}
        onPlay={() => console.log('onPlay')}
        onProgress={handleProgress}
        onDuration={handleDuration}
      />
      {/* {loading && <AppLoading />} */}
    </div>
  )
}

export default MediaPlayer
