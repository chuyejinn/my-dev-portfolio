'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useTranslations('nav');
  const tTheme = useTranslations('theme');
  const { theme = 'dark', setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      href: '#about',
      label: t('about'),
    },
    {
      href: '#projects',
      label: t('projects'),
    },
    {
      href: '#personal-projects',
      label: t('personalProjects'),
    },
    {
      href: '#experience',
      label: t('experience'),
    },
    {
      href: '#skills',
      label: t('skills'),
    },
    {
      href: '#education',
      label: t('education'),
    },
    {
      href: '#contact',
      label: t('contact'),
    },
  ];

  return (
    <header className='fixed top-0 left-0 right-0 z-50 p-4'>
      <div className='liquid-glass-elevated mx-auto max-w-7xl'>
        <div className='px-4'>
          <nav className='flex items-center justify-between h-14'>
            {/* Logo */}
            <Link
              href='/'
              className='text-xl font-bold gradient-text px-3 py-1 rounded-xl hover:liquid-glass-subtle transition-all'
            >
              Yejin Chu
            </Link>

            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center gap-1 p-1 rounded-xl liquid-glass-subtle'>
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant='ghost'
                  size='sm'
                  asChild
                  className='text-muted-foreground hover:text-foreground rounded-lg'
                >
                  <a
                    href={item.href}

                  >
                    {item.label}
                  </a>
                </Button>
              ))}
            </div>

            {/* Actions */}
            <div className='flex items-center gap-2'>
              {/* Theme Toggle */}
              <Button
                variant='ghost'
                size='icon'
                onClick={() => {
                  setTheme(theme === 'dark' ? 'light' : 'dark');
                }}
                className='text-muted-foreground hover:text-foreground rounded-xl hover:liquid-glass-subtle'
              >
                {theme === 'dark' ? (
                  <Sun className='h-4 w-4' />
                ) : (
                  <Moon className='h-4 w-4' />
                )}

                <span className='sr-only'>
                  {theme === 'dark' ? tTheme('light') : tTheme('dark')}
                </span>
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant='ghost'
                size='icon'
                className='md:hidden text-muted-foreground hover:text-foreground rounded-xl hover:liquid-glass-subtle'
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className='h-5 w-5' />
                ) : (
                  <Menu className='h-5 w-5' />
                )}
              </Button>
            </div>
          </nav>

          {/* Mobile Menu */}
          <div
            className={cn(
              'md:hidden overflow-hidden transition-all duration-300',
              mobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
            )}
          >
            <div className='flex flex-col gap-1 mt-2'>
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant='ghost'
                  size='sm'
                  asChild
                  className='justify-start text-muted-foreground hover:text-foreground rounded-xl hover:liquid-glass-subtle'
                >
                  <a
                    href={item.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
