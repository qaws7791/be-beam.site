export default function MyPageTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[1480px] items-start gap-6 pt-18 pb-24 md:pt-24 lg:gap-16 lg:pt-35">
      {children}
    </div>
  );
}
