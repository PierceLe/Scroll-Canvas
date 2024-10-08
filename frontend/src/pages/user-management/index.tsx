import React from 'react';

import { classnames } from '@frontend/tailwindcss-classnames';
import { UserController } from '@frontend/handlers/user';
import { useReduxDispatch, useReduxSelector } from '@frontend/redux/hooks';

const HomePage = () => {
  const userController = UserController.getInstance();
  const { userState } = useReduxSelector(['userState']);
  const dispatch = useReduxDispatch();

  React.useEffect(() => {
    dispatch(userController.getUsers());
  }, []);

  React.useEffect(() => {
    console.log('user', userState);
  }, [userState]);

  return <div className={classnames()}>
    <div>List Users</div>


  </div>;
};

export default HomePage;
