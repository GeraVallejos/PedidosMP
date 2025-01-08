import LoginForm from "../forms/LoginForm"
import AuthLayout from "../layout/AuthLayout"


const LoginPage = () => {
  return (
    <AuthLayout title={'Login'}>
    <><LoginForm /></>
    </AuthLayout>
  )
}

export default LoginPage