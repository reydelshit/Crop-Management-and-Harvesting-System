import App from './App'
import Login from './components/Login'

export default function Root() {
  const cmhsLoginToken = localStorage.getItem('cmhs_token')
  const accountType = localStorage.getItem('cmhs_account_type')

  if (cmhsLoginToken && accountType === 'farmer') return <App />

  if (cmhsLoginToken && accountType === 'qa') return <App />

  return <Login />
}
