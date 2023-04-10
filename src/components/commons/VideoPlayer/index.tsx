import dynamic from 'next/dynamic'
import * as React from 'react'
// import { findDOMNode } from "react-dom"
import ReactPlayer from 'react-player'
import { Waypoint } from 'react-waypoint'
// import screenfull from "screenfull"

export interface IMediaPlayerProps {
  url: string
}
export function VideoPlayer({ url }: IMediaPlayerProps) {
  const [loading, setLoading] = React.useState(true)

  const [state, setState] = React.useState({
    url: null,
    pip: false,
    playing: false,
    controls: false,
    light: false,
    volume: 1,
    muted: true,
    played: 0,
    loaded: 0,
    playedSeconds: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
  })

  const playerRef = React.useRef(null) as any

  const handleEnterViewport = function () {
    setState(prev => ({ ...prev, playing: true }))
  }
  const handleExitViewport = function () {
    setState(prev => ({ ...prev, playing: false }))
  }

  const handleToggleMuted = () => {
    setState(prev => ({ ...prev, muted: !prev.muted }))
  }

  const handleClickFullscreen = () => {
    // ;(screenfull as any).request(findDOMNode(playerRef.current) as any)
  }

  const handlePlayPause = () => {
    // setState(prev => ({ ...prev, playing: !prev.playing }))
  }

  const handleProgress = (state: any) => {
    // We only want to update time slider if we are not currently seeking
    if (!state.seeking) {
      setState(prev => ({ ...prev, ...state }))
    }
  }

  const handleDuration = (duration: number) => {
    setState(prev => ({ ...prev, duration: duration }))
  }

  const handleSeekMouseDown = (e: any) => {
    setState(prev => ({
      ...prev,
      seeking: true,
    }))
  }

  const handleSeekChange = (_: any, value: any) => {
    setState(prev => ({
      ...prev,
      played: parseFloat((value / state.duration) as unknown as string),
    }))
    playerRef.current.seekTo(
      parseFloat((value / state.duration) as unknown as string),
    )
  }

  const handleReplay = () => {
    setState(prev => ({
      ...prev,
      played: 0,
    }))
    playerRef.current.seekTo(0)
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: `100%`,
        height: `100%`,
      }}
    >
      <Waypoint onEnter={handleEnterViewport} onLeave={handleExitViewport}>
        <div onMouseDown={() => handlePlayPause()}>
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
            playing={state.playing}
            muted={state.muted}
            onReady={() => setLoading(false)}
            onStart={() => {}}
            onPlay={() => console.log('onPlay')}
            onProgress={handleProgress}
            onDuration={handleDuration}
          />

          {/* <LoadingItem loading={loading} className="video__loading" /> */}
        </div>
      </Waypoint>
    </div>
  )
}
