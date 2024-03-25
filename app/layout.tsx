// app/layout.tsx

import React from 'react';

// Typing the props that the component receives
interface LayoutProps {
  children: React.ReactNode; // This type is suitable for anything that can be rendered: numbers, strings, elements, or an array containing these types.
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <header>
        {/* Your header content */}
      </header>
      <main>{children}</main>
      <footer>
        {/* Your footer content */}
      </footer>
    </>
  );
};

export default Layout;
