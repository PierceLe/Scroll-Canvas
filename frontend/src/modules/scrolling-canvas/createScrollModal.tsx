/* eslint-disable @typescript-eslint/ban-ts-comment */
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
import { toast } from 'react-toastify';
// import { ScrollingController } from '@frontend/handlers/scrolling';
import { getCookie } from '@frontend/helpers/cookie';
import { createScrollSuccess } from '@frontend/handlers/scrolling';

export const CreateScrollModal = () => {
  const dispatch = useReduxDispatch();
  // const scrollController = ScrollingController.getInstance();
  const [title, setTitle] = useState<string>();
  const [file, setFile] = useState<any>();

  const styles = useStyles();

  const handleInput = (type: string) => (e: any) => {
    const value: string = e.target.value;

    switch (type) {
      case 'title':
        setTitle(value);
        break;
    }
  };

  const handleFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleCreateScroll = async (closeModal: any) => {
    const formData = new FormData();

    // Update the formData object
    formData.append('file', file);
    formData.append('title', title ?? '');

    // dispatch(scrollController.updateScrolling(formData));

    fetch(`${import.meta.env.VITE_SERVER_HOST}/api/v1/scroll/upload`, {
      method: 'post',
      body: formData,
      headers: {
        Authorization: 'Bearer ' + getCookie('Authentication'),
      },
    }).then(async response => {
      const res = await response.json();
      console.log(res);
      if (res.success) {
        toast.info('Create scroll successfully!');
        dispatch(createScrollSuccess(res.data));
        closeModal()
      }
    });
  };

  return (
    <div>
      <Popup
        key="createScrollModal"
        trigger={
          <button>
            <Button variant="contained" size="md" color="success">
              Create scroll
            </Button>
          </button>
        }
        modal={true}
        closeOnDocumentClick
      >
        {/** @ts-ignore */}
        {(close: any) => (
          <div className="modal">
            <div className={classnames(styles.title)}>Create new scroll</div>
            <div className={classnames(styles.form)}>
              <div className={classnames(styles.inputWrap)}>
                <div className={classnames(styles.inputLabel)}>Title</div>
                <Input
                  size="md"
                  placeholder="Enter title"
                  classNames={classnames(styles.input)}
                  onChange={handleInput('title')}
                />
              </div>
              <div className={classnames(styles.inputWrap)}>
                <div className={classnames(styles.inputLabel)}>File</div>
                <Input
                  size="md"
                  classNames={classnames(styles.input)}
                  onChange={handleFile}
                  type="file"
                />
              </div>
            </div>
            <div className={`actions ${classnames(styles.action)}`}>
              <Button
                variant="contained"
                size="md"
                color="success"
                onClick={() => handleCreateScroll(close)}
              >
                Create scroll
              </Button>
            </div>
          </div>
        )}
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
    icon: classnames(sizing('w-5', 'h-5')),
  };
};
