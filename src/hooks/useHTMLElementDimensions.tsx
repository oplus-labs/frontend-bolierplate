import { useEffect, useState } from 'react';

interface IUseHTMLElementDimensionsProps {
  componentId: string;
}
export default function useHTMLElementDimensions({ componentId }: IUseHTMLElementDimensionsProps) {
  const [dimensions, setDimensions] = useState<Record<string, any>>({});

  useEffect(() => {
    window.onload = () => {
      const htmlElement = document.getElementById(componentId);
      if (!htmlElement) return;
      setDimensions(htmlElement.getBoundingClientRect());
    };

    window.onresize = () => {
      const htmlElement = document.getElementById(componentId);
      if (!htmlElement) return;
      setDimensions(htmlElement.getBoundingClientRect());
    };

    return () => {};
  }, [componentId]);
  return { dimensions };
}
