import { Navigate } from 'react-router-dom'

export default function LayoutQA({ children }: { children: React.ReactNode }) {
  const cmhsLoginToken = localStorage.getItem('cmhs_token')
  const accountType = localStorage.getItem('cmhs_account_type')

  if (accountType === 'qa' && cmhsLoginToken) {
    return <div>{children}</div>
  }

  if (accountType === 'farmer' && cmhsLoginToken) {
    return <Navigate to="/" replace={true} />
  }

  if (!accountType || !cmhsLoginToken) {
    return <Navigate to="/login" replace={true} />
  }
}
