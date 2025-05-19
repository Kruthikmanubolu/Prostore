'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { SunIcon, MoonIcon, SunMoon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensure the component is mounted before accessing the theme
  }, []);

  if (!mounted) {
    return null; // Don't render the component until it's mounted on the client
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className="focus-visible:ring-0 focus-visible:ring-offset-0 hover:cursor-pointer">
          {theme === 'system' ? (
            <SunMoon />
          ) : theme === 'dark' ? (
            <MoonIcon />
          ) : (
            <SunIcon />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={theme === 'system'} onClick={() => setTheme('system')} className='cursor-pointer'>
          System
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={theme === 'dark'} onClick={() => setTheme('dark')} className='cursor-pointer'>
          Dark
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={theme === 'light'} onClick={() => setTheme('light')} className='cursor-pointer'>
          Light
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModeToggle;
