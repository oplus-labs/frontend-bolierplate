/* eslint-disable no-param-reassign */
import { useState } from 'react';

export default function DevTool() {
  const [outline, setOutline] = useState(false);

  const toggleOutline = () => {
    const { body } = document;
    const elements = body.querySelectorAll('*');

    if (outline) {
      elements.forEach((element) => {
        // @ts-ignore
        element.style.outline = 'none';
      });
    } else {
      elements.forEach((element) => {
        // @ts-ignore
        element.style.outline = '1px solid #ff7f7f';
      });
    }

    setOutline((prev) => !prev);
  };

  return (
    <div className="min-h-6 bg-blur-[10px] min-w-5 fixed right-0 top-0 z-[10000] rounded-sm bg-[#000000] p-[1px] text-white opacity-30 transition-all duration-100 ease-in-out hover:opacity-100">
      <p className="mb-1 w-full text-center text-[8px] font-medium">DEV</p>
      <div className="actions flex flex-col items-center justify-center">
        <button
          type="button"
          className="m-1 h-3 w-full border border-[#ff7f7f] bg-[#f1f1f1] bg-opacity-50"
          title="outline"
          onClick={toggleOutline}
        >
          {' '}
        </button>
      </div>
    </div>
  );
}
