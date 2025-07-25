import { useState } from 'react';

type StorageType = 'session' | 'local';

interface Options {
  storageType?: StorageType;
  defaultValue?: boolean;
}

export function usePersistentFlag(key: string, options?: Options) {
  const { storageType = 'session', defaultValue = false } = options || {};
  const storage = storageType === 'local' ? localStorage : sessionStorage;
  const storageKey = `flag_${key}`;

  const [value, setValue] = useState<boolean>(() => {
    const raw = storage.getItem(storageKey);
    return raw === null ? defaultValue : raw === 'true';
  });

  const enable = () => {
    storage.setItem(storageKey, 'true');
    setValue(true);
  };

  const disable = () => {
    storage.setItem(storageKey, 'false');
    setValue(false);
  };

  const reset = () => {
    storage.removeItem(storageKey);
    setValue(defaultValue);
  };

  return { value, enable, disable, reset };
}
