export default function CropsDetailsConditional({
  cropDetailsName,
  title,
}: {
  cropDetailsName: string
  title: string
}) {
  return (
    <>
      <p className="text-[1.5rem]">
        {title}: {cropDetailsName ? cropDetailsName : ' N/A'}
      </p>
    </>
  )
}
