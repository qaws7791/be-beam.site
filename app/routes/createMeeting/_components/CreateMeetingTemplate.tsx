export default function CreateMeetingTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[980px] pt-18 pb-16 md:pt-41">
      {children}
    </div>
  );
}
