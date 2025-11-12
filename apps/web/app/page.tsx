'use client';
import { Button } from '@mantine/core';
import React from 'react';
import toast from 'react-hot-toast';

export default function Page() {
  const notify = () => toast.success('HI');
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Button onClick={notify} variant="filled">
        Button
      </Button>
    </div>
  );
}
