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

export const ChangePasswordModal = () => {
  const [oldPassword, setOldPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>();
  const styles = useStyles();

  const handleOldPassword = (e: any) => {
    setOldPassword(e.target.value);
  };

  const handleNewPassword = (e: any) => {
    setNewPassword(e.target.value);
  };

  const handleRepeatNewPassword = (e: any) => {
    setRepeatNewPassword(e.target.value);
  };

  return (
    <div>
      <Popup
        key="changePasswordModal"
        trigger={
          <button className="text-primary-color">Change password</button>
        }
        modal={true}
        closeOnDocumentClick
      >
        <div className="modal">
          <div className={classnames(styles.title)}>Enter new password</div>
          <Input
            size="lg"
            placeholder="Enter your old password"
            type="email"
            classNames={classnames(styles.input)}
            onChange={handleOldPassword}
            value={oldPassword}
          />
          <Input
            size="lg"
            placeholder="Enter your new password"
            type="email"
            classNames={classnames(styles.input)}
            onChange={handleNewPassword}
            value={newPassword}
          />
          <Input
            size="lg"
            placeholder="Re enter your new password"
            type="email"
            classNames={classnames(styles.input)}
            onChange={handleRepeatNewPassword}
            value={repeatNewPassword}
          />
          <div className="actions">
            <Button variant="contained" size="md" color="success">
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
