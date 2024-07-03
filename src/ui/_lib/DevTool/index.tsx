/* eslint-disable no-param-reassign */
import { useEffect, useState, useCallback } from 'react';

type Position = {
  x: number;
  y: number;
};

// eslint-disable-next-line no-unused-vars
const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export default function DevTool() {
  const [outline, setOutline] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({
    x: window.innerWidth - 40,
    y: 10,
  });
  const [dragable, setDragable] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem('dev_tool_outline') === 'true') setOutline(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    setPosition({ x: clientX, y: clientY });
  }, []);

  const debouncedHandleMouseMove = useCallback(debounce(handleMouseMove, 50), [handleMouseMove]);

  useEffect(() => {
    if (!dragable) return () => {};

    document.addEventListener('mousemove', debouncedHandleMouseMove);
    return () => {
      document.removeEventListener('mousemove', debouncedHandleMouseMove);
    };
  }, [dragable, debouncedHandleMouseMove]);

  useEffect(() => {
    const { body } = document;
    const elements = body.querySelectorAll('*');

    if (outline) {
      elements.forEach((element) => {
        (element as HTMLElement).style.outline = '1px solid #ff7f7f';
      });
      localStorage.setItem('dev_tool_outline', 'true');
    } else {
      elements.forEach((element) => {
        (element as HTMLElement).style.outline = 'none';
      });
      localStorage.removeItem('dev_tool_outline');
    }
  }, [outline]);

  return (
    <div
      style={{
        top: position.y,
        left: position.x,
        transform: 'translate(-50%, -10%)',
      }}
      className="bg-blur-[10px] fixed z-[1000000] min-h-6 min-w-5 rounded-sm bg-[#000000] p-[1px] text-white opacity-30 transition-all duration-200 ease-in-out hover:opacity-100"
    >
      {/* Remove this div to disable wizard ping */}
      <div className="absolute left-0 top-0 z-10 h-full w-full animate-ping bg-green-500 opacity-100">&nbsp;</div>

      <div className="relative z-40">
        <button
          title="Drag Me"
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragable(true);
          }}
          onMouseUp={() => {
            setDragable(false);
          }}
          onClick={() => {
            setDragable(false);
          }}
          className="cursor-grab"
          style={{
            cursor: dragable ? 'grabbing' : 'grab',
            userSelect: dragable ? 'none' : 'all',
          }}
        >
          <span className="material-symbols-outlined text-white">drag_handle</span>
        </button>
        <p className="mb-1 w-full text-center text-[8px] font-medium text-white">DEV</p>
        <div className="actions flex flex-col items-center justify-center">
          <button
            type="button"
            className="m-1 h-3 w-full rounded-sm border border-[#ff7f7f] bg-[#f5f5f5]"
            title="outline"
            onClick={() => setOutline((prev) => !prev)}
          >
            {' '}
          </button>
        </div>
      </div>
    </div>
  );
}
