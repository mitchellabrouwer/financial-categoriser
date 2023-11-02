import React from "react";

interface ModalProps {
  isShowing: boolean;
  toggle: () => void;
  title: string;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isShowing,
  toggle,
  title,
  children,
}) => {
  return !isShowing ? null : (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center text-black"
      style={{ marginLeft: 0 }}
    >
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={toggle}
      ></div>
      <div className="relative h-[80vh] w-full max-w-2xl rounded-lg bg-white md:p-6">
        <header className="flex items-center justify-between border-b-2 p-2">
          <h2 className="text-lg font-bold">{title}</h2>
          <button className="rounded-lg p-3 hover:bg-gray-200" onClick={toggle}>
            ✖
          </button>
        </header>

        {children}
      </div>
    </div>
  );
};

export default Modal;
