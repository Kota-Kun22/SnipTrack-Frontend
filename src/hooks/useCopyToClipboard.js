// src/hooks/useCopyToClipboard.js
import { useState } from 'react';

export const useCopyToClipboard = () => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = async (text) => {
        try {
            // Try using the modern Clipboard API first
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            
            // Reset after 2 seconds
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
            
        } catch (err) {
            // Fallback for older browsers
            console.error('Clipboard API failed, using fallback');
            fallbackCopyToClipboard(text);
        }
    };

    // Fallback method
    const fallbackCopyToClipboard = (text) => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        textArea.setSelectionRange(0, 99999); // For mobile devices
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            }
        } catch (err) {
            console.error('Fallback copy failed: ', err);
        }
        
        document.body.removeChild(textArea);
    };

    return { isCopied, copyToClipboard };
};