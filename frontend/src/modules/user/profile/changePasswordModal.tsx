import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useReduxDispatch, useReduxSelector } from '@frontend/redux/hooks';
import { UserController } from '@frontend/handlers/user';
import { PAGE_LINKS } from '@frontend/react-routes/permissionLink';

export const ChangePasswordModal = () => {
  const navigate = useNavigate();
  const dispatch = useReduxDispatch();
  const userController = UserController.getInstance();
  const { userState } = useReduxSelector(['userState']);
  const { currentUser } = userState;
  const [oldPassword, setOldPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>();
  const [isChange, setIsChange] = useState<boolean>(false);
  const styles = useStyles();

  const handleOldPassword = (e: any) => {
    setOldPassword(e.target.value);

    if (!isChange) {
      setIsChange(true);
    }
  };

  const handleNewPassword = (e: any) => {
    setNewPassword(e.target.value);

    if (!isChange) {
      setIsChange(true);
    }
  };

  const handleRepeatNewPassword = (e: any) => {
    setRepeatNewPassword(e.target.value);

    if (!isChange) {
      setIsChange(true);
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword !== repeatNewPassword) {
      alert("Repeat password dont match")
    }

    await dispatch(
      userController.updatePassword({
        id: currentUser.data?.id,
        oldPassword: oldPassword,
        newPassword: newPassword,
      }),
    );

    navigate(PAGE_LINKS.HOME.path);
    window.location.reload();
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
          <div className={classnames(styles.note)}>
            <span>*</span> After change
            password successfully, you will be redirected to home
          </div>
          <Input
            size="lg"
            placeholder="Enter your old password"
            type="password"
            classNames={classnames(styles.input)}
            onChange={handleOldPassword}
            value={oldPassword}
          />
          <Input
            size="lg"
            placeholder="Enter your new password"
            type="password"
            classNames={classnames(styles.input)}
            onChange={handleNewPassword}
            value={newPassword}
          />
          <Input
            size="lg"
            placeholder="Re enter your new password"
            type="password"
            classNames={classnames(styles.input)}
            onChange={handleRepeatNewPassword}
            value={repeatNewPassword}
          />
          <div className="actions">
            <Button
              variant="contained"
              size="md"
              color="success"
              onClick={handleUpdatePassword}
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
    note: classnames(spacing('mb-5'), typography('text-red-500')),
  };
};
