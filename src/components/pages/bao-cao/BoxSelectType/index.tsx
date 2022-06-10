import { REASON_TYPE_FILTER } from '@/constants/base.constants';
import React from 'react';

type Props = {
  selectedItem?: { label: string; value: any };
  handleSelectType: (item: { label: string; value: string }) => void;
  type: { label: string; value: string };
};

const BoxSelectType = (props: Props) => {
  const { handleSelectType, type } = props;

  return (
    <div className="selectBox">
      <div className="">
        {REASON_TYPE_FILTER.map((item, index) => {
          return (
            <label
              key={index}
              className="input_checkbox font-normal py-[5px]"
              onClick={() => {
                handleSelectType(item);
              }}
              htmlFor="type"
            >
              <div
                className={`flex item-center gap-x-[20px] hover:bg-green-100 rounded-[3px] cursor-pointer px-[20px] py-[5px] ${
                  type.value === item.value && 'bg-green-100'
                }`}
              >
                <p className="self-center text-[16px] text-black">
                  {item.label}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(BoxSelectType);
