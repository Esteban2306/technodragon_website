

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <body className="min-h-full flex flex-col overflow-x-hidden">{children}</body>
  );
}
