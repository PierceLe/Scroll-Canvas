import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { Input } from '@frontend/components/input';
import {
  classnames,
  typography,
  sizing,
  spacing,
} from '@frontend/tailwindcss-classnames';
import { Button } from '@frontend/components/button';
import { UserController } from '@frontend/handlers/user';
import { useReduxDispatch, useReduxSelector } from '@frontend/redux/hooks';

export const ChangeUsernameModal = () => {
  const dispatch = useReduxDispatch();
  const userController = UserController.getInstance();
  const { userState } = useReduxSelector(['userState']);
  const { currentUser } = userState;
  const [username, setUsername] = useState<string>();
  const [isChange, setIsChange] = useState<boolean>(false);
  const styles = useStyles();

  const handleUsername = (e: any) => {
    setUsername(e.target.value);

    if (!isChange) {
      setIsChange(true);
    }
  };

  const handleUpdateUsername = () => {
    dispatch(
      userController.updateUsername({
        currentUsername: currentUser.data?.username,
        newUsername: username,
      }),
    );
  };

  return (
    <div>
      <Popup
        key="changeUsernameModal"
        trigger={
          <button className="text-primary-color">Change username</button>
        }
        modal={true}
        closeOnDocumentClick
      >
        <div className="modal">
          <div className={classnames(styles.title)}>Enter new username</div>
          <Input
            size="lg"
            placeholder="Enter your username"
            type="email"
            classNames={classnames(styles.input)}
            onChange={handleUsername}
            value={username}
          />
          <div className="actions">
            <Button
              variant="contained"
              size="md"
              color="success"
              onClick={handleUpdateUsername}
              disabled={!isChange}
            >
              Update
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
    input: classnames(sizing('w-full'), spacing('mb-5')),
  };
};
