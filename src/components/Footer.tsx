import useModal from "../hooks/useModal";
import FeedbackModal from "./FeedbackModal";
import PrivacyPolicyModal from "./PrivacyPolicy";

function Footer() {
  const { isShowing: isShowingPrivacy, toggle: togglePrivacy } = useModal();
  const { isShowing: isShowingContact, toggle: toggleContact } = useModal();
  // const { isShowing: isShowingContribute, toggle: toggleContribute } =
  //   useModal();

  return (
    <footer className="fixed bottom-0 left-0 mt-10 w-full bg-black p-1 text-center text-xs text-white md:p-4">
      <p>&copy; 2023 Centsible Online. All rights reserved.</p>

      <div className="flex items-center justify-center space-x-2 text-gray-500">
        <button
          type="button"
          onClick={togglePrivacy}
          className="cursor-pointer hover:underline"
        >
          Privacy Policy
        </button>
        <PrivacyPolicyModal
          isShowing={isShowingPrivacy}
          toggle={togglePrivacy}
        />
        <span>|</span>
        <button
          type="button"
          onClick={toggleContact}
          className="cursor-pointer hover:underline"
        >
          Contact
        </button>
        <FeedbackModal isShowing={isShowingContact} toggle={toggleContact} />
      </div>
    </footer>
  );
}

export default Footer;
