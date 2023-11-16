import Modal from "./Modal";

interface PrivacyPolicyModalProps {
  isShowing: boolean;
  toggle: () => void;
}

function PrivacyPolicyModal({ isShowing, toggle }: PrivacyPolicyModalProps) {
  return (
    <Modal isShowing={isShowing} toggle={toggle} title="Privacy Policy">
      <div className="max-h-[65vh] overflow-y-auto p-2 text-left">
        <h3 className="text-md mb-4 mt-2 font-semibold">1. Introduction</h3>
        <p>
          Welcome to Centsibility. We understand the importance of your
          financial data and are committed to safeguarding your privacy. This
          policy explains our stance on data and how we ensure its protection.
        </p>

        <h3 className="text-md mb-4 mt-4 font-semibold">
          2. Data Processing and Collection
        </h3>
        <ul className="list-disc pl-5">
          <li>
            Data Collection: Our app does not collect, store, or share any user
            data. You upload a CSV file for categorising transactions, and all
            processing occurs on your device.
          </li>
          <li>
            Anonymity: All operations within our app are performed anonymously.
            We don&apos;t require user accounts, nor do we associate any data
            with specific individuals.
          </li>
          <li>
            No Cookies or Local Storage: We do not use cookies or local storage
            to store data or user preferences.
          </li>
        </ul>

        <h3 className="text-md mb-4 mt-4 font-semibold">
          3. Data Retention and Security
        </h3>
        <ul className="list-disc pl-5">
          <li>
            No Data Retention: As soon as you finish categorising your
            transactions, and even if you refresh your browser, all data is
            immediately discarded and cannot be recovered. We don&apos;t have
            any backups, logs, or records of the uploaded CSV files or the
            categorised transactions.
          </li>
          <li>
            Exporting Data: Users can export their categorised transactions for
            their records. Once exported, the responsibility for the security of
            that data rests with the user.
          </li>
        </ul>

        <h3 className="text-md mb-4 mt-4 font-semibold">
          4. Changes to This Policy
        </h3>
        <p>
          If we decide to change our privacy policy, we will post those changes
          on this page. We encourage users to regularly check this policy for
          any changes to stay informed about how we are helping to protect the
          personal information we process.
        </p>

        <h3 className="text-md mb-4 mt-4 font-semibold">5. Contact Us</h3>
        <p>
          If you have questions about this privacy policy or our data handling
          practices, please contact us at by clicking on the contact button in
          the footer of the website.
        </p>
      </div>
    </Modal>
  );
}

export default PrivacyPolicyModal;
