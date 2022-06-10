import React from 'react';
import { batch } from 'react-sweet-state';

const useFilterTypeReason = () => {
  //   const [type, setType] = React.useState<string>(REASON_TYPE_FILTER[0]?.label as string);
  const [selectedType, setSelectedType] = React.useState({
    label: 'Tất cả',
    value: '',
  });

  const handleSelectType = (item: { label: string; value: string }) => {
    batch(() => {
      //   setType(item.label);
      setSelectedType(item);
    });
  };

  return {
    // type,
    // setType,
    handleSelectType,
    selectedType,
    setSelectedType,
  };
};

const Hook = { useFilterTypeReason };

export default Hook;
