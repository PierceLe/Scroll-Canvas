import { useState, useEffect } from 'react';
import classnames, {
  display,
  gap,
  grid,
  spacing,
  typography,
  cursor,
} from '@frontend/tailwindcss-classnames';
import { ScrollingCard } from './scrollingCard';
import { ScrollingPreview } from './scrollingPreview';
import { ScrollingController } from '@frontend/handlers/scrolling';
import { useReduxDispatch } from '@frontend/redux/hooks';
import { FilterBlock } from './filterBlock';

export const ScrollingCanvas = () => {
  const [isShowPreview, setIsShowPreview] = useState<boolean>(false);
  const [id, setId] = useState<number>();
  const [title, setTitle] = useState<string>();
  const [createdBy, setCreatedBy] = useState<string>();
  const [date, setDate] = useState<string>();
  const [url, setUrl] = useState<string>();
  const styles = useStyles();

  const scrollingController = ScrollingController.getInstance();
  const dispatch = useReduxDispatch();

  useEffect(() => {
    dispatch(scrollingController.getScrollings({}));
  }, []);

  const scrolls = [
    {
      title:
        'Scroll',
      createdBy: 'Nelson',
      date: '2017-04-04',
      url: '/pdf_test.pdf'
    },
    { title: 'Scroll', createdBy: 'Binh Minh Tran', date: '2017-04-04' },
    { title: 'Scroll', createdBy: 'Binh Minh Tran', date: '2017-04-04' },
    { title: 'Scroll', createdBy: 'Binh Minh Tran', date: '2017-04-04' },
    { title: 'Scroll', createdBy: 'Binh Minh Tran', date: '2017-04-04' },
    { title: 'Scroll', createdBy: 'Binh Minh Tran', date: '2017-04-04' },
    { title: 'Scroll', createdBy: 'Binh Minh Tran', date: '2017-04-04' },
    { title: 'Scroll', createdBy: 'Binh Minh Tran', date: '2017-04-04' },
    { title: 'Scroll', createdBy: 'Binh Minh Tran', date: '2017-04-04' },
    { title: 'Scroll', createdBy: 'Binh Minh Tran', date: '2017-04-04' },
    { title: 'Scroll', createdBy: 'Binh Minh Tran', date: '2017-04-04' },
    { title: 'Scroll', createdBy: 'Binh Minh Tran', date: '2017-04-04' },
    { title: 'Scroll', createdBy: 'Binh Minh Tran', date: '2017-04-04' },
    { title: 'Scroll', createdBy: 'Binh Minh Tran', date: '2017-04-04' },
    { title: 'Scroll', createdBy: 'Binh Minh Tran', date: '2017-04-04' },
  ];

  const handleShowPreview = (scrolling: any) => {
    const { id, title, createdBy, date, url } = scrolling;
    setId(id);
    setTitle(title);
    setCreatedBy(createdBy);
    setDate(date);
    setUrl(url)
    setIsShowPreview(true);
  };

  return (
    <div className={classnames(styles.root)}>
      <div className={classnames(styles.title)}>List scrolling cards</div>
      
      <FilterBlock/>
      
      <div className={classnames(styles.scrollWrap)}>
        {scrolls.map(scroll => {
          return (
            <div
              className={classnames(styles.scrollCard)}
              onClick={() => handleShowPreview(scroll)}
            >
              <ScrollingCard
                title={scroll.title}
                createdBy={scroll.createdBy}
                date={scroll.date}
              />
            </div>
          );
        })}
      </div>
      <ScrollingPreview
        isShowModal={isShowPreview}
        onClose={() => setIsShowPreview(false)}
        id={id}
        title={title}
        createdBy={createdBy}
        url={url}
        date={date}
      />
    </div>
  );
};

const useStyles = () => {
  return {
    root: classnames(spacing('px-16', 'pb-16')),
    title: classnames(typography('text-tx22', 'font-bold'), spacing('mb-4')),
    scrollWrap: classnames(
      display('grid'),
      grid('grid-cols-1', 'md:grid-cols-2'),
      gap('gap-4'),
    ),
    scrollCard: classnames(cursor('cursor-pointer')),
  };
};
