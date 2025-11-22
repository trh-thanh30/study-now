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
          background: '#efe6dd',
          borderRight: '1px solid #e2d5c8',
          padding: '18px',
        },
      }}
    >
      {/* Nút toggle sidebar tuyệt đối */}
      <Burger
        opened={opened}
        onClick={toggle}
        size="sm"
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 9999,
        }}
      />

      {/* SIDEBAR */}
      <AppShell.Navbar>
        <Sidebar />
      </AppShell.Navbar>

      {/* MAIN CONTENT */}
      <AppShell.Main style={{ marginTop: 0, height: '100vh' }}>{children}</AppShell.Main>
    </AppShell>
  );
}
