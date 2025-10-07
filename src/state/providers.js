"use client";

import ReduxProvider from "./reduxProvider";


export default function Providers({ children }) {
  return <ReduxProvider>{children}</ReduxProvider>;
}