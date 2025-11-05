export default function HomeTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col items-center pt-23 pb-10 lg:pt-41 lg:pb-16">
      {children}
    </div>
  );
}
