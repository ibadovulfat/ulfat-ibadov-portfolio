
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const updateIsMobile = () => {
      setIsMobile(mediaQuery.matches)
    }
    
    // Initial check
    updateIsMobile()
    
    // Listen for changes
    mediaQuery.addEventListener("change", updateIsMobile)
    
    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", updateIsMobile)
    }
  }, [])

  return isMobile
}
