import { Login } from '@frontend/modules/auth/login';
import { withAuthRoute } from '@frontend/react-routes/authRoute.hoc';
import { classnames, typography } from '@frontend/tailwindcss-classnames';

const LoginPage = () => {
  return <div className={classnames(typography('font-bold'))}>
    <Login/>
  </div>;
};

// const EnhancedLogin = withAuthRoute(Login);
const EnhancedLogin = LoginPage;

export default EnhancedLogin;
