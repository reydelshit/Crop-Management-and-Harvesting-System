export default function CropsDetailsConditional({
  cropDetailsName,
  title,
  style,
}: {
  cropDetailsName: string
  title: string
  style: string
}) {
  return (
    <>
      <p className={style}>
        {title}: {cropDetailsName ? cropDetailsName : ' N/A'}
      </p>
    </>
  )
}
