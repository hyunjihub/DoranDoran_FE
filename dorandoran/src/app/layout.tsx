import './globals.css';

import type { Metadata, Viewport } from 'next';

import Footer from './_component/layout/Footer';
import Header from './_component/layout/header/Header';
import TabBar from './_component/layout/TabBar';

export const viewport: Viewport = {
  themeColor: 'black',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: '도란도란',
  description: '도란도란에서 다양한 사람들과 실시간 채팅',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="relative flex justify-center items-center min-h-screen bg-gray-100">
          <div
            style={{
              width: '430px',
              height: '100vh',
              overflow: 'hidden',
            }}
            className="relative z-10 flex justify-center items-center"
          >
            {/* 모바일 웹 UI - 여기에 실제 모바일 UI 콘텐츠를 추가 */}
            <div className="bg-white h-full w-full flex flex-col">
              <Header />
              <div className="h-full flex-glow overflow-auto scrollbar-hide">
                <div className="flex-grow w-full h-full">{children}</div>
                <Footer />
              </div>
              <TabBar />
            </div>
          </div>

          {/* 홍보 UI 영역 */}
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-yellow-300 p-4 z-0 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
              <h2 className="text-xl font-bold text-center">🎉 특별 할인 이벤트 🎉</h2>
              <p className="text-center">모바일 웹을 통해 50% 할인 혜택을 받으세요!</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
