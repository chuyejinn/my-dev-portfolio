'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// import { Calendar, Users, ArrowRight } from 'lucide-react';
import { Calendar, Users } from 'lucide-react';
import { SpotlightCard } from '@/components/common/spotlight-card';

export function Experience() {
  const t = useTranslations('experience');

  const positions = t.raw('studentCouncil.positions') as {
    role: string;
    period: string;
  }[];

  const activities = t.raw('studentCouncil.activities') as string[];

  const achievements = t.raw('studentCouncil.achievements') as string[];

  return (
    <section id='experience' className='py-20 md:py-32 scroll-mt-28'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>{t('title')}</h2>

          <p className='text-muted-foreground max-w-2xl mx-auto'>
            {t('subtitle')}
          </p>
        </motion.div>

        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <SpotlightCard spotlightColor='rgba(120, 170, 255, 0.14)'>
              <Card className='overflow-hidden liquid-glass-interactive'>
                {/* Header */}
                <CardHeader className='bg-gradient-to-r from-primary/5 to-transparent'>
                  <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                    <div className='flex items-center gap-3'>
                      <div className='flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10'>
                        <Users className='h-5 w-5 text-primary' />
                      </div>

                      <div>
                        <CardTitle className='text-xl'>
                          {t('studentCouncil.name')}
                        </CardTitle>

                        <p className='text-sm text-muted-foreground mt-1'>
                          {t('studentCouncil.organization')}
                        </p>
                      </div>
                    </div>

                    <div className='flex items-center gap-2'>
                      <Calendar className='h-4 w-4 text-muted-foreground' />

                      <span className='text-sm text-muted-foreground'>
                        2022 - 2025
                      </span>

                      <Badge variant='glass'>4년</Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className='pt-8'>
                  {/* Role Timeline */}
                  <div>
                    <h3 className='font-semibold mb-7'>역할</h3>

                    {/* Desktop Timeline */}
                    <div className='hidden md:block relative px-5'>
                      {/* Horizontal Line */}
                      <div className='absolute top-[10px] left-[12%] right-[12%] h-px bg-border' />

                      {/* Arrow */}
                      {/* <ArrowRight className='absolute top-[1px] right-[9%] h-5 w-5 text-muted-foreground' /> */}

                      <div className='relative grid grid-cols-4'>
                        {positions.map((position, index) => (
                          <div
                            key={index}
                            className='flex flex-col items-center text-center'
                          >
                            {/* Timeline Dot */}
                            <div className='relative z-10 w-5 h-5 rounded-full border-2 border-primary bg-background shadow-sm' />

                            <div className='mt-4'>
                              <p className='text-xs text-primary font-medium mb-1'>
                                {position.period}
                              </p>

                              <p className='font-semibold'>{position.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mobile Timeline */}
                    <div className='md:hidden space-y-0'>
                      {positions.map((position, index) => (
                        <div key={index} className='relative flex gap-4'>
                          <div className='flex flex-col items-center'>
                            <div className='w-4 h-4 rounded-full border-2 border-primary bg-background' />

                            {index !== positions.length - 1 && (
                              <div className='w-px h-14 bg-border' />
                            )}
                          </div>

                          <div className='pb-6 -mt-1'>
                            <p className='text-xs text-primary font-medium'>
                              {position.period}
                            </p>

                            <p className='font-semibold mt-1'>
                              {position.role}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='my-8 border-t border-border/70' />

                  {/* Activities */}
                  <div>
                    <h3 className='font-semibold mb-4'>주요 활동</h3>

                    <ul className='space-y-3'>
                      {activities.map((activity, index) => (
                        <li
                          key={index}
                          className='flex items-start gap-3 text-sm text-muted-foreground leading-relaxed'
                        >
                          <span className='mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0' />
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className='my-7 border-t border-border/70' />

                  {/* Achievements */}
                  <div>
                    <h3 className='font-semibold mb-4'>성과</h3>

                    <ul className='space-y-3'>
                      {achievements.map((achievement, index) => (
                        <li
                          key={index}
                          className='flex items-start gap-3 text-sm'
                        >
                          <span className='mt-2 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0' />

                          <span className='font-medium'>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
