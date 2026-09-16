'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Github, ExternalLink } from 'lucide-react';
import { SpotlightCard } from '@/components/common/spotlight-card';
import * as gtag from '@/lib/gtag';

export function Contact() {
  const t = useTranslations('contact');

  const links = [
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:chuyejin0403@naver.com',
      username: 'chuyejin0403@naver.com',
      color: 'hover:text-red-500',
      gtagLabel: 'email',
    },
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/chuyejinn',
      username: 'chuyejinn',
      color: 'hover:text-gray-400',
      gtagLabel: 'github',
    },
  ];

  return (
    <section id='contact' className='py-20 md:py-32 scroll-mt-28'>
      <div className='container mx-auto px-4'>
        <div className='max-w-2xl mx-auto text-center'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='mb-12'
          >
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              {t('title')}
            </h2>

            <p className='text-muted-foreground'>{t('subtitle')}</p>
          </motion.div>

          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {links.map((link, index) => (
                <SpotlightCard key={link.label} className='h-full'>
                  <motion.a
                    href={link.href}
                    target={link.gtagLabel === 'email' ? undefined : '_blank'}
                    rel={
                      link.gtagLabel === 'email'
                        ? undefined
                        : 'noopener noreferrer'
                    }
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.2 + index * 0.05,
                    }}
                    viewport={{ once: true }}
                    className='h-full block'
                    onClick={() =>
                      gtag.event({
                        action: 'click',
                        category: 'link',
                        label: link.gtagLabel,
                      })
                    }
                  >
                    <Card className='h-full liquid-glass-interactive group'>
                      <CardContent className='pt-6'>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-3'>
                            <div className='p-2 rounded-lg liquid-glass-subtle group-hover:glass-glow transition-all'>
                              <link.icon
                                className={`h-5 w-5 text-muted-foreground transition-colors ${link.color}`}
                              />
                            </div>

                            <div className='text-left'>
                              <p className='font-medium group-hover:text-primary transition-colors'>
                                {link.label}
                              </p>

                              <p className='text-sm text-muted-foreground'>
                                {link.username}
                              </p>
                            </div>
                          </div>

                          <ExternalLink className='h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors' />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.a>
                </SpotlightCard>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
