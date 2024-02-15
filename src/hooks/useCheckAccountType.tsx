export default function useCheckAccountType() {
  const accountType = localStorage.getItem('cmhs_account_type')
  return accountType
}
