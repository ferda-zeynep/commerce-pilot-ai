import './globals.css';

export const metadata = {
  title: 'CommercePilot AI - Presales Enablement Platform',
  description: 'Instantly generate high-performance personalized commerce demo environments',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen relative overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}