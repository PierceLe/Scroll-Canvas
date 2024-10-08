import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@frontend/components/button';
import { Input } from '@frontend/components/input';
import classnames, {
  backgroundColor,
  display,
  grid,
  sizing,
  spacing,
  borderRadius,
  borders,
  typography,
} from '@frontend/tailwindcss-classnames';
import { PAGE_LINKS } from '@frontend/react-routes/permissionLink';

export const Login = () => {
  const navigate = useNavigate();
  const styles = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    console.log(email, password);
  };

  const handleSignUp = () => {
    navigate(PAGE_LINKS.REGISTER.path);
  };

  return (
    <div className={classnames(styles.root)}>
      <div className={classnames(styles.leftSide)}>
        <div className={classnames(styles.leftSideBody)}>
          <div className={classnames(styles.title)}>Login to your account</div>
          <div className={classnames(styles.form)}>
            <div className={classnames(styles.inputWrap)}>
              <div className={classnames(styles.inputLabel)}>Email</div>
              <Input
                size="md"
                placeholder="Enter your email"
                type="email"
                classNames={classnames(styles.input)}
                onChange={handleEmail}
              />
            </div>
            <div className={classnames(styles.inputWrap)}>
              <div className={classnames(styles.inputLabel)}>Password</div>
              <Input
                size="md"
                placeholder="Enter your password"
                type="password"
                classNames={classnames(styles.input)}
                onChange={handlePassword}
              />
            </div>
          </div>
          <div>
            <Button
              variant="contained"
              size="md"
              classNames={classnames(styles.buttonLogin)}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              size="md"
              classNames={classnames(styles.buttonSignUp)}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
      <div className={classnames(styles.rightSide)}></div>
    </div>
  );
};

const useStyles = () => {
  return {
    root: classnames(display('grid'), grid('grid-cols-2'), sizing('h-screen')),
    leftSide: classnames(),
    rightSide: classnames(backgroundColor('bg-primary-color')),
    leftSideBody: classnames(
      spacing('mt-1/5-screen', 'md:mx-10', 'p-10'),
      backgroundColor('bg-white'),
      borderRadius('rounded-2xl'),
      borders('border-2'),
    ),
    title: classnames(typography('text-tx22'), spacing('mb-4')),
    form: classnames(spacing('mb-4')),
    inputWrap: classnames(spacing('mb-4', 'last:!mb-0')),
    input: classnames(sizing('w-full')),
    inputLabel: classnames(spacing('mb-2')),

    buttonLogin: classnames(sizing('w-full'), spacing('mb-4')),
    buttonSignUp: classnames(sizing('w-full')),
  };
};
