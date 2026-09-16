'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';
import { PersonalProjectModal } from './personal-project-modal';
import { SpotlightCard } from '@/components/common/spotlight-card';

export function PersonalProjects() {
  const t = useTranslations('personalProjects');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const projects = [
    {
      key: 'festival-test',
      cardVariant: 'glass' as const,
      spotlightColor: 'rgba(120, 170, 255, 0.14)',
    },
  ];

  return (
    <section id='personal-projects' className='py-20 md:py-32 scroll-mt-28'>
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

        {/* Personal Project */}
        <div className='max-w-3xl mx-auto'>
          {projects.map((project, index) => {
            const images = t.raw(`items.${project.key}.images`) as string[];

            return (
              <motion.div
                key={project.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
              >
                <SpotlightCard
                  className='h-full'
                  spotlightColor={project.spotlightColor}
                >
                  <Card
                    variant={project.cardVariant}
                    className='h-full group overflow-hidden cursor-pointer flex flex-col'
                    onClick={() => {
                      setSelectedProject(project.key);
                    }}
                  >
                    {/* Preview */}
                    <div className='relative aspect-video overflow-hidden border-b border-white/10'>
                      {images.length > 0 ? (
                        <Image
                          src={images[0]}
                          alt={t(`items.${project.key}.title`)}
                          fill
                          sizes='(max-width: 768px) 100vw, 768px'
                          className='object-cover transition-transform duration-500 group-hover:scale-[1.02]'
                          unoptimized
                        />
                      ) : (
                        <div className='h-full w-full gradient-bg opacity-20' />
                      )}

                      <div className='absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent' />

                      <div className='absolute bottom-4 left-5 inline-flex items-center rounded-full bg-black/35 px-3 py-1 text-xs text-white/90 backdrop-blur-sm'>
                        {t(`items.${project.key}.period`)}
                      </div>
                    </div>

                    <CardHeader>
                      <div className='flex items-start justify-between gap-4'>
                        <div>
                          <CardTitle className='text-xl leading-snug group-hover:text-primary transition-colors'>
                            {t(`items.${project.key}.title`)}
                          </CardTitle>

                          <p className='text-sm text-muted-foreground mt-1'>
                            {t(`items.${project.key}.role`)}
                          </p>
                        </div>

                        <ArrowUpRight className='h-5 w-5 shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all' />
                      </div>
                    </CardHeader>

                    <CardContent className='space-y-5 pb-6'>
                      <p className='text-sm text-muted-foreground leading-relaxed'>
                        {t(`items.${project.key}.description`)}
                      </p>

                      {/* Tech Stack */}
                      <div className='flex flex-wrap gap-2'>
                        {(t.raw(`items.${project.key}.tech`) as string[]).map(
                          (tech: string, techIndex: number) => (
                            <Badge
                              key={tech}
                              variant={
                                techIndex === 0
                                  ? 'accent'
                                  : techIndex < 3
                                    ? 'flat'
                                    : 'outline'
                              }
                              className='text-xs'
                            >
                              {tech}
                            </Badge>
                          )
                        )}
                      </div>

                      {/* Features */}
                      <ul className='space-y-2 border-l border-border/70 pl-3'>
                        {(t.raw(`items.${project.key}.features`) as string[])
                          .slice(0, 2)
                          .map((feature: string, i: number) => (
                            <li
                              key={i}
                              className='flex items-start gap-2 text-sm text-muted-foreground leading-relaxed'
                            >
                              <span className='mt-2 w-1.5 h-1.5 rounded-full bg-point shrink-0' />
                              <span>{feature}</span>
                            </li>
                          ))}
                      </ul>
                    </CardContent>
                  </Card>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      <PersonalProjectModal
        projectKey={selectedProject}
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      />
    </section>
  );
}
