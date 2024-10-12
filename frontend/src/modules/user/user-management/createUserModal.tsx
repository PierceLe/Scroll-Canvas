import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { Input } from '@frontend/components/input';
import {
  classnames,
  typography,
  sizing,
  spacing,
  display,
  justifyContent,
} from '@frontend/tailwindcss-classnames';
import { Button } from '@frontend/components/button';
import { useReduxDispatch } from '@frontend/redux/hooks';
import { AuthController } from '@frontend/handlers/auth';

export const CreateUserModal = () => {
  const dispatch = useReduxDispatch();
  const authController = AuthController.getInstance();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();

  const styles = useStyles();

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
      case 'password':
        setPassword(value);
        break;
    }
  };

  const handleCreateUser = async () => {
    await dispatch(
      authController.register({
        email,
        password,
        firstName,
        lastName,
        phone: phoneNumber,
        username,
      }),
    );
    window.location.reload();
  };

  return (
    <div>
      <Popup
        key="createUserModal"
        trigger={
          <button>
            <Button variant="contained" size="md" color="success">
              Create user
            </Button>
          </button>
        }
        modal={true}
        closeOnDocumentClick
      >
        <div className="modal">
          <div className={classnames(styles.title)}>Create new user</div>
          <div className={classnames(styles.form)}>
            <div className={classnames(styles.inputWrap)}>
              <div className={classnames(styles.inputLabel)}>First Name</div>
              <Input
                size="md"
                placeholder="Enter your first name"
                classNames={classnames(styles.input)}
                onChange={handleInput('firstName')}
              />
            </div>
            <div className={classnames(styles.inputWrap)}>
              <div className={classnames(styles.inputLabel)}>Last Name</div>
              <Input
                size="md"
                placeholder="Enter your last name"
                classNames={classnames(styles.input)}
                onChange={handleInput('lastName')}
              />
            </div>
            <div className={classnames(styles.inputWrap)}>
              <div className={classnames(styles.inputLabel)}>Email</div>
              <Input
                size="md"
                placeholder="Enter your email"
                type="email"
                classNames={classnames(styles.input)}
                onChange={handleInput('email')}
              />
            </div>
            <div className={classnames(styles.inputWrap)}>
              <div className={classnames(styles.inputLabel)}>Username</div>
              <Input
                size="md"
                placeholder="Enter your username"
                classNames={classnames(styles.input)}
                onChange={handleInput('username')}
              />
            </div>
            <div className={classnames(styles.inputWrap)}>
              <div className={classnames(styles.inputLabel)}>Phone Number</div>
              <Input
                size="md"
                placeholder="Enter your phone number"
                classNames={classnames(styles.input)}
                onChange={handleInput('phoneNumber')}
              />
            </div>
            <div className={classnames(styles.inputWrap)}>
              <div className={classnames(styles.inputLabel)}>Password</div>
              <Input
                size="md"
                placeholder="Enter your password"
                type="password"
                classNames={classnames(styles.input)}
                onChange={handleInput('password')}
              />
            </div>
          </div>
          <div className={`actions ${classnames(styles.action)}`}>
            <Button
              variant="contained"
              size="md"
              color="success"
              onClick={handleCreateUser}
            >
              Create user
            </Button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

const useStyles = () => {
  return {
    title: classnames(typography('text-tx22', 'font-bold'), spacing('mb-5')),
    form: classnames(spacing('mb-4')),
    inputWrap: classnames(spacing('mb-2', 'last:!mb-0')),
    input: classnames(sizing('w-full')),
    inputLabel: classnames(
      spacing('mb-1'),
      typography('text-tx14', 'md:text-tx16'),
    ),
    action: classnames(display('flex'), justifyContent('justify-center')),
  };
};
