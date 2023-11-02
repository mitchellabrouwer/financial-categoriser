import { useEffect, useState } from "react";
import Modal from "./Modal";

interface FeedbackModalProps {
  isShowing: boolean;
  toggle: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isShowing,
  toggle,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    console.log("here");

    setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      setIsLoading(true);
    };
  }, [isShowing]);

  return (
    <Modal isShowing={isShowing} toggle={toggle} title="Contact us">
      <div>
        {/* <h1 className="mb-4 text-2xl font-bold">Contact Us</h1> */}
        {isLoading && <span>loading...</span>}
        {/* <!-- 105.5% is for 640x675 aspect ratio --> */}
        <div className="relative w-full pb-[105.5%]">
          <iframe
            className="absolute inset-0 h-full w-full border-0 text-black"
            src={process.env.NEXT_PUBLIC_GOOGLE_FORM_URL}
            onLoad={handleIframeLoad}
          >
            Loading…
          </iframe>
        </div>
      </div>
    </Modal>
  );
};
