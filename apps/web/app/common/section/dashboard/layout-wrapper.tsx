'use client';

import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Sidebar from './components/sidebar';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure(true);

  return (
    <AppShell
      padding="md"
      layout="alt"
      header={{ height: 60 }}
      navbar={{
        width: 260,
        breakpoint: 0,
        collapsed: { mobile: !opened, desktop: !opened },
      }}
      styles={{
        main: {
          background: '#e8dbd0',
        },
        navbar: {
          background: '#efe6dd', // sidebar tone nhẹ
          borderRight: '1px solid #e2d5c8',
          padding: '16px',
        },
        header: {
          background: '#efe6dd',
          borderBottom: '1px solid #e2d5c8',
          paddingLeft: 16,
          paddingRight: 16,
        },
      }}
    >
      {/* HEADER */}
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} size="sm" />
      </AppShell.Header>

      {/* SIDEBAR */}
      <AppShell.Navbar>
        <Sidebar />
      </AppShell.Navbar>

      {/* MAIN CONTENT */}
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
