import { useEffect, useState, useRef } from "react";

const useNearScreen = ({
  distance = "100px",
  externalRef = null,
  once = true,
} = {}) => {
  const [show, setShow] = useState(false);
  const refElement = useRef();
  useEffect(() => {
    let observer;
    const element = externalRef ? externalRef.current : refElement.current;
    const onChange = (entries, observer) => {
      const el = entries[0];
      if (el.isIntersecting) {
        setShow(true);
        once && observer.disconnect();
      } else {
        !once && setShow(false);
      }
    };
    // 
    Promise.resolve(
      typeof IntersectionObserver !== "undefined"
        ? IntersectionObserver
        : import("intersection-observer")
    ).then(() => {
      observer = new IntersectionObserver(onChange, {
        rootMargin: distance,
      });
      observer.observe(element);
    });

    return () => observer && observer.disconnect();
  }, []);

  return [show, refElement];
};

export { useNearScreen };
