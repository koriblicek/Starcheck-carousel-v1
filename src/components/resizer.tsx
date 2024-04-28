import { useEffect } from 'react';

export interface IResizerProps {
    onResize: (timestamp: number) => void;
}

export function Resizer({ onResize }: IResizerProps) {

    useEffect(() => {
        function handleResize() {
            onResize(Date.now());
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);

    }, [onResize]);

    useEffect(() => {
        onResize(Date.now());
    }, [onResize]);
    
    return null;
}
