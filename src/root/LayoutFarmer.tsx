import { Navigate } from 'react-router-dom'

export default function LayoutFarmer({
  children,
}: {
  children: React.ReactNode
}) {
  const cmhsLoginToken = localStorage.getItem('cmhs_token')
  const accountType = localStorage.getItem('cmhs_account_type')

  if (accountType === 'qa' && cmhsLoginToken) {
    return <Navigate to="/qa" replace={true} />
  }

  if (accountType === 'farmer' && cmhsLoginToken) {
    return <div>{children}</div>
  }

  if (!accountType || !cmhsLoginToken) {
    return <Navigate to="/login" replace={true} />
  }
}
