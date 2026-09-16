'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  GraduationCap,
  Award,
  Calendar,
  ChevronDown,
  BookOpen,
} from 'lucide-react';
import { SpotlightCard } from '@/components/common/spotlight-card';

export function Education() {
  const tEdu = useTranslations('education');
  const tCert = useTranslations('certifications');

  const [isCoursesOpen, setIsCoursesOpen] = useState(false);

  const certifications = tCert.raw('items') as Array<{
    name: string;
    org: string;
    date: string;
    status?: string;
  }>;

  const courses = tEdu.raw('courses.items') as string[];

  return (
    <section id='education' className='py-20 md:py-32 scroll-mt-28'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto'>
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='mb-20'
          >
            <div className='flex items-center gap-3 mb-8'>
              <div className='p-2 rounded-lg liquid-glass-subtle'>
                <GraduationCap className='h-6 w-6 text-point' />
              </div>

              <h2 className='text-3xl md:text-4xl font-bold'>
                {tEdu('title')}
              </h2>
            </div>

            <SpotlightCard spotlightColor='rgba(110, 160, 255, 0.14)'>
              <Collapsible
                open={isCoursesOpen}
                onOpenChange={(open) => {
                  setIsCoursesOpen(open);
                }}
              >
                <Card className='liquid-glass overflow-hidden'>
                  <CardHeader>
                    <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-5'>
                      <div>
                        <CardTitle className='text-xl mb-2'>
                          {tEdu('university')}
                        </CardTitle>

                        <p className='text-muted-foreground'>{tEdu('major')}</p>
                      </div>

                      <div className='flex flex-wrap items-center gap-3'>
                        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                          <Calendar className='h-4 w-4' />
                          <span>{tEdu('period')}</span>
                        </div>

                        <Badge variant='glass'>{tEdu('status')}</Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className='border-t border-border/70 pt-4'>
                      <div className='flex items-center justify-between gap-4'>
                        <div>
                          <p className='text-sm font-medium'>전공 관련 과목</p>

                          <p className='text-xs text-muted-foreground mt-1'>
                            백엔드 개발과 소프트웨어 기초를 학습한 주요 과목
                          </p>
                        </div>

                        <CollapsibleTrigger asChild>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='gap-2 shrink-0'
                          >
                            <BookOpen className='h-4 w-4' />

                            {isCoursesOpen
                              ? tEdu('hideCourses')
                              : tEdu('viewCourses')}

                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${isCoursesOpen ? 'rotate-180' : ''
                                }`}
                            />
                          </Button>
                        </CollapsibleTrigger>
                      </div>

                      <AnimatePresence initial={false}>
                        {isCoursesOpen && (
                          <motion.div
                            initial={{
                              height: 0,
                              opacity: 0,
                            }}
                            animate={{
                              height: 'auto',
                              opacity: 1,
                            }}
                            exit={{
                              height: 0,
                              opacity: 0,
                            }}
                            transition={{
                              height: {
                                duration: 0.3,
                                ease: 'easeInOut',
                              },
                              opacity: {
                                duration: 0.2,
                              },
                            }}
                            className='overflow-hidden'
                          >
                            <div className='flex flex-wrap gap-2 mt-5 p-4 liquid-glass-subtle'>
                              {courses.map((course) => (
                                <Badge
                                  key={course}
                                  variant='glass'
                                  className='hover:glass-glow'
                                >
                                  {course}
                                </Badge>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </CardContent>
                </Card>
              </Collapsible>
            </SpotlightCard>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
            }}
            viewport={{ once: true }}
          >
            <div className='flex items-center gap-3 mb-8'>
              <div className='p-2 rounded-lg liquid-glass-subtle'>
                <Award className='h-6 w-6 text-point' />
              </div>

              <h2 className='text-3xl md:text-4xl font-bold'>
                {tCert('title')}
              </h2>
            </div>

            <div className='space-y-0'>
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                  }}
                  viewport={{ once: true }}
                  className='relative pl-7 pb-8 border-l-2 border-[var(--timeline-line)] last:pb-0'
                >
                  {/* Timeline dot */}
                  <div className='absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-[var(--timeline-dot-bg)] border-2 border-[var(--timeline-dot-border)] shadow-sm' />

                  <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-3'>
                    <div>
                      <div className='flex flex-wrap items-center gap-2'>
                        <h3 className='font-medium'>{cert.name}</h3>

                        {cert.status && (
                          <Badge variant='outline' className='text-xs'>
                            {cert.status}
                          </Badge>
                        )}
                      </div>

                      <p className='text-sm text-muted-foreground mt-1'>
                        {cert.org}
                      </p>
                    </div>

                    <Badge variant='glass' className='shrink-0 w-fit'>
                      {cert.date}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
