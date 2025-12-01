import { useState } from 'react';

export function useBoolean(defaultState: boolean = false) {
  const [value, setValue] = useState(defaultState);

  const setTrue = () => {
    setValue(true);
  };

  const setFalse = () => {
    setValue(false);
  };

  const toggle = () => {
    setValue(!value);
  };

  return {
    value,
    setValue,
    setTrue,
    setFalse,
    toggle,
  };
}
