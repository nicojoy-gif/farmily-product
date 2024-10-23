"use client"; // This makes the component a client component

import { Provider } from 'react-redux';
import { store } from '@/features/redux/store';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
