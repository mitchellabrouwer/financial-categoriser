import {
  MdOutlineAttachMoney,
  MdOutlineCategory,
  MdOutlinePrivacyTip,
} from "react-icons/md";

function Features() {
  return (
    <div className="py-4 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-[#80AADD]">
            Free and Secure
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl">
            Financial categorising
          </p>
          <p className="mt-2 text-lg leading-8 text-gray-400">
            Working to make it easy to categorise where your money is going
          </p>
        </div>
        <div className="mx-auto mt-5 max-w-2xl lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-2 gap-y-2 lg:max-w-none lg:grid-cols-2 ">
            {/* Feature 1 */}
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-50">
                <div className="absolute left-0 top-2 flex h-10 w-10 items-center justify-center rounded-lg bg-utilities">
                  <MdOutlinePrivacyTip className="text-white" size={24} />
                </div>
                Your device only.
              </dt>
              <dd className="text-base leading-7 text-gray-400">
                No uploads, no sharing, no cookies, no local storage.
              </dd>
            </div>

            {/* Feature 2 */}
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-50">
                <div className="absolute left-0 top-2 flex h-10 w-10 items-center justify-center rounded-lg bg-utilities">
                  <MdOutlineCategory className="text-white" size={24} />
                </div>
                Smart autocategorizing.
              </dt>
              <dd className="text-base leading-7 text-gray-400">
                Import a csv file from your bank, let autocategorizing work its
                wonders then save through export for your records.
              </dd>
            </div>

            {/* Feature 3 */}
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-50">
                <div className="absolute left-0 top-2 flex h-10 w-10 items-center justify-center rounded-lg bg-utilities">
                  <MdOutlineAttachMoney className="text-white" size={24} />
                </div>
                Committed to help.
              </dt>
              <dd className="text-base leading-7 text-gray-400">
                Providing this service for free so you can take control of your
                dineros.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default Features;
