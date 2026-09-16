'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';
import { ProjectModal } from './project-modal';
import { SpotlightCard } from '@/components/common/spotlight-card';

  const projects = [
  {
    key: 'hospin',
    cardVariant: 'editorial' as const,
    spotlightColor: 'rgba(110, 140, 255, 0.16)',
  },
  {
    key: 'jobflow',
    cardVariant: 'glass' as const,
    spotlightColor: 'rgba(110, 205, 255, 0.14)',
  },
];

export function Projects() {
  const t = useTranslations('projects');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const [previewIndexes, setPreviewIndexes] = useState<Record<string, number>>({
    hospin: 0,
    jobflow: 0,
  });

  

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviewIndexes((prev) => {
        const next = { ...prev };

        projects.forEach((project) => {
          const images = t.raw(`items.${project.key}.images`) as string[];

          if (images.length > 1) {
            next[project.key] = ((prev[project.key] ?? 0) + 1) % images.length;
          }
        });

        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [t]);

  return (
    <section id='projects' className='py-20 md:py-32 scroll-mt-28'>
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
        </motion.div>

        {/* Projects Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto'>
          {projects.map((project, index) => {
            const images = t.raw(`items.${project.key}.images`) as string[];

            const currentImageIndex = previewIndexes[project.key] ?? 0;

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
                className={index === 0 || index === 3 ? 'md:col-span-1' : ''}
              >
                <SpotlightCard
                  className='h-full md:h-[560px]'
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
                    <div className='relative aspect-video overflow-hidden border-b border-white/10 bg-black/5'>
                      {' '}
                      {images.length > 0 ? (
                        <AnimatePresence mode='sync'>
                          <motion.div
                            key={`${project.key}-${currentImageIndex}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            className='absolute inset-0'
                          >
                            <Image
                              src={images[currentImageIndex]}
                              alt={`${t(
                                `items.${project.key}.title`
                              )} 프로젝트 화면 ${currentImageIndex + 1}`}
                              fill
                              sizes='(max-width: 768px) 100vw, 520px'
                              className='object-contain transition-transform duration-500 group-hover:scale-[1.02]'
                              unoptimized
                            />
                          </motion.div>
                        </AnimatePresence>
                      ) : (
                        <div className='h-full w-full gradient-bg opacity-30' />
                      )}
                      <div className='absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent pointer-events-none' />
                      <div className='absolute bottom-3 left-4 right-4 flex items-center justify-between'>
                        <div className='inline-flex items-center gap-2 rounded-full bg-black/35 px-2.5 py-1 text-[11px] text-white/90 backdrop-blur-sm'>
                          <span className='line-clamp-1'>
                            {t(`items.${project.key}.period`)}
                          </span>
                        </div>

                        {/* Slide Indicator */}
                        {images.length > 1 && (
                          <div className='flex items-center gap-1.5'>
                            {images.map((_, imageIndex) => (
                              <span
                                key={imageIndex}
                                className={`h-1.5 rounded-full transition-all duration-300 ${imageIndex === currentImageIndex
                                    ? 'w-4 bg-white'
                                    : 'w-1.5 bg-white/50'
                                  }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <CardHeader>
                      <div className='flex items-start justify-between'>
                        <div>
                          <CardTitle className='text-lg leading-snug group-hover:text-primary transition-colors'>
                            {t(`items.${project.key}.title`)}
                          </CardTitle>

                          <p className='text-sm text-muted-foreground mt-1'>
                            {t(`items.${project.key}.role`)}
                          </p>
                        </div>

                        <ArrowUpRight className='h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all' />
                      </div>
                    </CardHeader>

                    <CardContent className='flex-1 space-y-4'>
                      <p className='text-sm text-muted-foreground leading-relaxed line-clamp-2'>
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

                      {/* Achievements */}
                      <ul className='space-y-2 border-l border-border/70 pl-3'>
                        {(
                          t.raw(`items.${project.key}.achievements`) as string[]
                        )
                          .slice(0, 2)
                          .map((achievement: string, i: number) => (
                            <li
                              key={i}
                              className='flex items-start gap-2 text-xs text-muted-foreground leading-relaxed'
                            >
                              <span className='mt-1.5 w-1.5 h-1.5 rounded-full bg-point shrink-0' />
                              <span>{achievement}</span>
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
      <ProjectModal
        projectKey={selectedProject}
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      />
    </section>
  );
}
