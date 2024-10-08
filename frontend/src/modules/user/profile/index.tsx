import { useState, useEffect } from 'react';

import { Button } from '@frontend/components/button';
import { Input } from '@frontend/components/input';
import classnames, {
  backgroundColor,
  display,
  sizing,
  spacing,
  borderRadius,
  borders,
  typography,
  alignItems,
  justifyContent,
} from '@frontend/tailwindcss-classnames';
import { useReduxDispatch, useReduxSelector } from '@frontend/redux/hooks';
import { AuthController } from '@frontend/handlers/auth';
import { ChangeUsernameModal } from './changeUsernameModal';
import { ChangePasswordModal } from './changePasswordModal';

export const Profile = () => {
  const { userState } = useReduxSelector(['userState']);
  const { currentUser } = userState;
  const dispatch = useReduxDispatch();
  const authController = AuthController.getInstance();

  const styles = useStyles();
  const [isChange, setIsChange] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();

  useEffect(() => {
    const { email, firstName, lastName, username, phone } =
      currentUser?.data ?? {
        firstName: 'nam',
        lastName: 'nam',
        username: 'test2',
        phone: '123',
        email: '1234@gmail.com',
      };

    setEmail(email);
    setFirstName(firstName);
    setLastName(lastName);
    setUsername(username);
    setPhoneNumber(phone);
  }, [currentUser]);

  const handleInput = (type: string) => (e: any) => {
    const value: string = e.target.value;

    switch (type) {
      case 'email':
        setEmail(value);
        break;
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'username':
        setUsername(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
    }

    console.log({ isChange });
    if (!isChange) {
      setIsChange(true);
    }
  };

  const handleSignUp = () => {
    console.log({
      email: email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      username: username,
    });
    dispatch(
      authController.register({
        email,
        firstName,
        lastName,
        phone: phoneNumber,
        username,
      }),
    );
  };
  console.log({ isChange });

  return (
    <div className={classnames(styles.root)}>
      <div className={classnames(styles.title)}>Your profile</div>
      <div className={classnames(styles.form)}>
        <div className={classnames(styles.inputWrap)}>
          <div className={classnames(styles.inputLabel)}>First Name</div>
          <Input
            size="lg"
            placeholder="Enter your first name"
            classNames={classnames(styles.input)}
            onChange={handleInput('firstName')}
            value={firstName}
          />
        </div>
        <div className={classnames(styles.inputWrap)}>
          <div className={classnames(styles.inputLabel)}>Last Name</div>
          <Input
            size="lg"
            placeholder="Enter your last name"
            classNames={classnames(styles.input)}
            onChange={handleInput('lastName')}
            value={lastName}
          />
        </div>
        <div className={classnames(styles.inputWrap)}>
          <div className={classnames(styles.inputLabel)}>Email</div>
          <Input
            size="lg"
            placeholder="Enter your email"
            type="email"
            classNames={classnames(styles.input)}
            onChange={handleInput('email')}
            value={email}
          />
        </div>
        <div className={classnames(styles.inputWrap)}>
          <div className={classnames(styles.inputLabel)}>Phone Number</div>
          <Input
            size="lg"
            placeholder="Enter your phone number"
            classNames={classnames(styles.input)}
            onChange={handleInput('phoneNumber')}
            value={phoneNumber}
          />
        </div>
      </div>
      <div className={classnames(styles.changeSecureWrap)}>
        <ChangeUsernameModal />
        <ChangePasswordModal />
      </div>
      <Button
        variant="contained"
        size="lg"
        classNames={classnames(styles.buttonSignUp)}
        onClick={handleSignUp}
        disabled={!isChange}
        color="success"
      >
        Update Profile
      </Button>
    </div>
  );
};

const useStyles = () => {
  return {
    root: classnames(
      spacing(
        'mt-1/10-screen',
        'mx-10',
        'md:mx-44',
        'lg:mx-96',
        'px-10',
        'py-5',
      ),
      backgroundColor('bg-white'),
      borderRadius('rounded-2xl'),
      borders('border-2'),
    ),
    title: classnames(typography('text-tx22'), spacing('mb-4')),
    form: classnames(spacing('mb-4')),
    inputWrap: classnames(spacing('mb-2', 'last:!mb-0')),
    input: classnames(sizing('w-full')),
    inputLabel: classnames(spacing('mb-1'), typography('text-tx16')),

    buttonSignUp: classnames(sizing('w-full'), spacing('mb-2')),
    loginWrap: classnames(
      sizing('w-full'),
      display('flex'),
      alignItems('items-center'),
      justifyContent('justify-start'),
    ),
    changeSecureWrap: classnames(spacing('mb-2')),
  };
};
