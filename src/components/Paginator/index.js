import React from 'react';
import './scss/Paginator.scss';

type PropsShape = {
  onChangePage: number => any,
  currentPage: number,
  totalPages: number,
  isLoading?: boolean,
  isLoadingContent?: Function,
  isEmptyContent?: Function,
  baseClass?: string,
  prevBtnContent?: Function,
  nextBtnContent?: Function,
};

const Paginator = ({
  onChangePage,
  currentPage,
  totalPages,
  hasItems,
  isLoading,
  isLoadingContent,
  isEmptyContent,
  baseClass,
  prevBtnContent,
  nextBtnContent,
}: PropsShape): React$Element<*> => {
  const allowNext = currentPage < totalPages;
  const allowPrev = currentPage > 0;
  return (
    <div className={`${baseClass}-container`}>
      {totalPages > 1 ? (
        <ul className={baseClass}>
          <li className={`${baseClass}__item`}>
            <button
              type="button"
              disabled={!allowPrev}
              onClick={() => onChangePage(currentPage - 1)}
              className={
                `${baseClass}__item__btn ` +
                `${allowPrev ? `${baseClass}__item__btn--disabled` : ''}`
              }>
              {prevBtnContent()}
            </button>
          </li>
          <li className={`${baseClass}__item`}>
            <button
              type="button"
              disabled={!allowNext}
              onClick={() => onChangePage(currentPage + 1)}
              className={
                `${baseClass}__item__btn ` +
                `${allowNext ? `${baseClass}__item__btn--disabled` : ''}`
              }>
              {nextBtnContent()}
            </button>
          </li>
        </ul>
      ) : (
        <div className="align--center">
          {!isLoading && !hasItems ? isEmptyContent() : null}
          {isLoading ? isLoadingContent() : null}
        </div>
      )}
    </div>
  );
};

Paginator.defaultProps = {
  baseClass: 'paginator',
  isLoading: false,
  isLoadingContent: () => 'loading',
  isEmptyContent: () => 'empty',
  prevBtnContent: () => '&lt;',
  nextBtnContent: () => '&gt;',
};

export default Paginator;
