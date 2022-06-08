import React from 'react';

interface IProps {
  children: React.ReactElement;
  isVisible: boolean;
  title?: string;
  closeModal: () => void;
}

const SlideUpModal = (props: IProps) => {
  const { isVisible, children, closeModal, title = 'Modal' } = props;
  return (
    <React.Fragment>
      <div
        className={`${
          !isVisible ? 'top-full' : 'top-[60px]'
        } fixed right-0 left-0 h-[calc(100vh-60px)] bottom-0 bg-white transition-all ease-linear delay-150`}
      >
        {/* Header */}
        <div className="bg-gray-200 flex items-center justify-between px-[20px] py-[5px] h-[40px]">
          <h3 className="text-[20px] font-semibold">{title}</h3>
          <button className="text-red-500" onClick={closeModal}>
            Đóng
          </button>
        </div>
        {/* Body */}
        <div className="h-[calc(100%-40px)] px-[20px] py-[5px] overflow-y-auto">
          {isVisible && children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SlideUpModal;
