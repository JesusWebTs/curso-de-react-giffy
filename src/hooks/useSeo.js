import { useEffect, useRef } from "react";

function useSeo({ title, description }) {
  const prevTitle = useRef(document.title);
  const prevDescription = useRef(
    document.querySelector("meta[name='description']").getAttribute("content")
  );
  useEffect(() => {
    const previousTitle = prevTitle.current;
    if (title) document.title = `Giffy | ${title}` || "Giffy";
    return () => (document.title = previousTitle);
  }, [title]);

  useEffect(() => {
    const metaDescription = document.querySelector("meta[name='description']");
    if (description) {
      metaDescription.setAttribute("content", description);
    } 
    return () => metaDescription.setAttribute("content", prevDescription);
  }, [description]);
}
export default useSeo;
