import { useEffect, useRef } from 'react';


export default function Cursor() {
  const delay = 18;

  const dot = useRef(null);
  const dotOutline = useRef(null);

  const endX = useRef(window.innerWidth / 2);
  const endY = useRef(window.innerHeight / 2);
  const _x = useRef(0);
  const _y = useRef(0);

  const requestRef = useRef(null);

  const mouseMoveEvent = e => {
    endX.current = e.pageX;
    endY.current = e.pageY;

    dot.current.style.top = endY.current + 'px';
    dot.current.style.left = endX.current + 'px';
  };

  const animateDotOutline = () => {
    _x.current += (endX.current - _x.current) / delay;
    _y.current += (endY.current - _y.current) / delay;

    dotOutline.current.style.top = _y.current + 'px';
    dotOutline.current.style.left = _x.current + 'px';

    requestRef.current = requestAnimationFrame(animateDotOutline);
  };

  useEffect(() => {
    document.addEventListener('mousemove', mouseMoveEvent);

    animateDotOutline();

    return () => {
      document.removeEventListener('mousemove', mouseMoveEvent);

      cancelAnimationFrame(requestRef.current);
    };
   // eslint-disable-next-line
  }, []);



  return (
    <>
      <div ref={dotOutline} className="cursor-dot-outline"></div>
      <div ref={dot} className="cursor-dot"></div>
    </>
  );
};
