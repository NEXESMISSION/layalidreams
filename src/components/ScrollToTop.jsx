import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Multiple methods to ensure scrolling to top
    const scrollToTop = () => {
      // Scroll window to top
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });

      // Scroll main content to top
      const mainContent = document.querySelector('main') || document.body;
      if (mainContent) {
        mainContent.scrollTop = 0;
      }

      // Additional fallback for nested scrollable elements
      const scrollableElements = document.querySelectorAll('.scrollable-content');
      scrollableElements.forEach(el => {
        el.scrollTop = 0;
      });
    };

    // Immediate scroll
    scrollToTop();

    // Delayed scroll to handle dynamic content
    const timeoutId = setTimeout(scrollToTop, 100);

    // Cleanup timeout
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
} 