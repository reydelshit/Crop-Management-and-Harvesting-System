export default function Layout({ children }: { children: React.ReactNode }) {
  const cmhsLoginToken = localStorage.getItem('cmhs_token')
  const accountType = localStorage.getItem('cmhs_account_type')

  if (accountType === 'qa' && cmhsLoginToken) {
    return (window.location.href = '/qa')
  }

  if (accountType === 'farmer' && cmhsLoginToken) {
    return <div>{children}</div>
  }

  if (!accountType || !cmhsLoginToken) {
    return (window.location.href = '/login')
  }
}
