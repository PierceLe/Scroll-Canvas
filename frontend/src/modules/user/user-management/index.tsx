import classnames, {
  backgroundColor,
  spacing,
  borderRadius,
  borders,
  typography,
} from '@frontend/tailwindcss-classnames';
import { useReduxSelector } from '@frontend/redux/hooks';
import { Table } from '@frontend/components/table';
import { createColumnHelper } from '@tanstack/react-table';

export const UserManagement = () => {
  const { userState } = useReduxSelector(['userState']);
  const { users } = userState;

  const styles = useStyles();

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor(
      row => {
        return row.firstName + ' ' + row.lastName;
      },
      {
        id: 'fullName',
        cell: info => info.getValue(),
        header: () => 'Full Name',
      },
    ),
    columnHelper.accessor('email', {
      cell: info => info.getValue(),
      header: 'Email',
    }),
    columnHelper.accessor('username', {
      cell: info => info.getValue(),
      header: 'Username',
    }),
    columnHelper.accessor('phone', {
      cell: info => info.getValue(),
      header: 'Phone',
    }),
  ];
  return (
    <div className={classnames(styles.root)}>
      <div className={classnames(styles.title)}>List users</div>

      <Table
        data={users ?? []}
        columns={columns}
        headerClassnames={classnames(
          typography('text-left'),
          borders('border'),
          backgroundColor('bg-gray-200'),
        )}
        rowClassnames={classnames(
          borders('border'),
          backgroundColor('hover:bg-gray-100'),
        )}
      />
    </div>
  );
};

const useStyles = () => {
  return {
    root: classnames(
      spacing('mt-1/10-screen', 'mx-10', 'md:mx-20', 'px-10', 'py-5'),
      backgroundColor('bg-white'),
      borderRadius('rounded-2xl'),
      borders('border-2'),
    ),
    title: classnames(typography('text-tx22'), spacing('mb-4')),
    
  };
};
