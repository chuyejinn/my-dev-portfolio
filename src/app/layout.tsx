import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://my-dev-portfolio-one-omega.vercel.app'),
  title: {
    default: '추예진 | Backend Developer',
    template: '%s | 추예진',
  },
  description:
    '서비스의 전체 흐름을 이해하고, 문제의 원인을 찾아 개선하는 백엔드 개발자 추예진의 포트폴리오입니다.',
  keywords: [
    '백엔드',
    '백엔드 개발자',
    'Backend Developer',
    'Java',
    'Spring Boot',
    'JPA',
    'MySQL',
    'AWS',
    '포트폴리오',
    '추예진',
  ],
  authors: [{ name: '추예진' }],
  creator: '추예진',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '추예진 Portfolio',
    title: '추예진 | Backend Developer',
    description:
      '서비스의 전체 흐름을 이해하고, 문제의 원인을 찾아 개선하는 백엔드 개발자 추예진의 포트폴리오입니다.',
  },
  twitter: {
    card: 'summary_large_image',
    title: '추예진 | Backend Developer',
    description: '백엔드 개발자 추예진의 포트폴리오',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}