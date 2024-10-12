import classnames, { cursor } from '@frontend/tailwindcss-classnames';
import { IconProps, IconType } from './types';
import {
  BellIcon,
  AngleDownIcon,
  UserIcon,
  WebsiteIcon,
  DeleteIcon,
  EditIcon,
  WarningIcon,
  EyeIcon,
  EyeSlashIcon,
} from './resources';

export const Icon = (props: IconProps) => {
  const { classNames, type, onClick } = props;
  const styles = useStyles();

  return (
    <div className={classnames(classNames, styles.icon)} onClick={onClick}>
      {getIconByType(type)}
    </div>
  );
};

const getIconByType = (type: IconType) => {
  switch (type) {
    case 'bell':
      return <BellIcon />;
    case 'angle-down':
      return <AngleDownIcon />;
    case 'user':
      return <UserIcon />;
    case 'website':
      return <WebsiteIcon />;
    case 'edit':
      return <EditIcon />;
    case 'delete':
      return <DeleteIcon />;
    case 'warning':
      return <WarningIcon />;
    case 'eye':
      return <EyeIcon />;
    case 'eye-slash':
      return <EyeSlashIcon />;
    default:
      return <></>;
  }
};

const useStyles = () => {
  return {
    icon: classnames(cursor('cursor-pointer')),
  };
};
