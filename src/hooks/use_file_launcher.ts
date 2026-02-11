import { useEffect } from 'react'

interface LaunchQueueConsumer {
  (handle: FileSystemFileHandle): void
}

export function useFileLauncher(onFile: LaunchQueueConsumer) {
  useEffect(() => {
    if (!('launchQueue' in window)) return
    ;(
      window as unknown as {
        launchQueue: {
          setConsumer: (cb: (params: { files: FileSystemFileHandle[] }) => void) => void
        }
      }
    ).launchQueue.setConsumer(async launchParams => {
      if (!launchParams.files || launchParams.files.length === 0) return
      try {
        const handle = launchParams.files[0]
        onFile(handle)
      } catch (err) {
        console.error('Failed to process launched file:', err)
      }
    })
  }, [onFile])
}
