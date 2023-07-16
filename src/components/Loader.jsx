import { useEffect } from "react";

export default function Loader({ cls = "py-60" }) {
  useEffect(() => {
    window.scrollTo({
      bottom: document.body.scrollHeight,
      behavior: "instant",
    });
  }, []);

  return (
    <div className={cls}>
      <div className="flex flex-row justify-center space-x-4">
        <div className="animate-bounce">
          <div className="animate-pulse rounded-full bg-white h-10 w-10"></div>
        </div>
        <div className="animate-bounce [animation-delay:.3s]">
          <div className="animate-pulse [animation-delay:.3s] rounded-full bg-white h-10 w-10"></div>
        </div>
        <div className="animate-bounce [animation-delay:.5s]">
          <div className="animate-pulse [animation-delay:.5s] rounded-full bg-white h-10 w-10"></div>
        </div>
      </div>
    </div>
  );
}
