import { useState } from 'react';
import classnames, {
  alignItems,
  display,
  gap,
  sizing,
  spacing,
  typography,
} from '@frontend/tailwindcss-classnames';
import { Input } from '@frontend/components/input';
import { Button } from '@frontend/components/button';
import { useReduxDispatch } from '@frontend/redux/hooks';
import { CreateScrollModal } from './createScrollModal';
import { ScrollingController } from '@frontend/handlers/scrolling';

export const FilterBlock = () => {
  const scrollController = ScrollingController.getInstance();
  const dispatch = useReduxDispatch();

  const [title, setTitle] = useState<string>();
  const [createdBy, setCreatedBy] = useState<string>();
  const styles = useStyles();

  const handleInput = (type: string) => (e: any) => {
    const value: string = e.target.value;

    switch (type) {
      case 'title':
        setTitle(value);
        break;
      case 'createdBy':
        setCreatedBy(value);
        break;
    }
  };

  const handleSearch = () => {
    dispatch(
      scrollController.getScrollings({
        title,
        createdBy,
      }),
    );
  };

  return (
    <div className={classnames(styles.root)}>
      <div>
        <div className={classnames(styles.inputWrap)}>
          <div className={classnames(styles.inputLabel)}>Title</div>
          <Input
            size="md"
            placeholder="Enter title"
            type="email"
            classNames={classnames(styles.input)}
            onChange={handleInput('title')}
          />
        </div>
        <div className={classnames(styles.inputWrap)}>
          <div className={classnames(styles.inputLabel)}>Created By</div>
          <Input
            size="md"
            placeholder="Enter created by"
            classNames={classnames(styles.input)}
            onChange={handleInput('createdBy')}
          />
        </div>
      </div>
      <div className={classnames(styles.buttonWrap)}>
        <Button
          variant="contained"
          size="md"
          classNames={classnames(styles.buttonSearch)}
          onClick={handleSearch}
        >
          Search
        </Button>
        <CreateScrollModal />
      </div>
    </div>
  );
};

const useStyles = () => {
  return {
    root: classnames(spacing('mb-8'), display('flex'), gap('gap-14')),
    inputWrap: classnames(
      spacing('mb-2', 'last:!mb-0'),
      display('flex'),
      alignItems('items-center'),
    ),
    input: classnames(sizing('w-full')),
    inputLabel: classnames(
      spacing('mb-1'),
      typography('text-tx14', 'md:text-tx16'),
      sizing('w-1/2'),
    ),
    buttonWrap: classnames(display('flex'), gap('gap-2')),
    buttonSearch: classnames(),
  };
};
