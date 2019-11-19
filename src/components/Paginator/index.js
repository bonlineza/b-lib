import React from 'react';
import './scss/Paginator.scss';

type PropsShape = {
  /** callback function triggered when page is changed */
  onChangePage: number => any,
  /** Used to determine whether the disabled props is true or not for the
   * `next page button` and `prev page button`
   * if props `currentPage` < `totalPages` `next page button` is not disabled
   * if props `currentPage > 1` `prev page button` is not disabled
   * */
  currentPage: number,
  /** Indicates the total number of pages: number */
  totalPages: number,
  /** If true it will show is `isLoadingContent` */
  isLoading?: boolean,
  /** Function that renderers jsx */
  isLoadingContent?: Function,
  isEmptyContent?: Function,
  /** css class for root div of this component */
  baseClass?: string,
  /** Renders jsx prevButton */
  prevBtnContent?: Function,
  /** Renders jsx nextButton */
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
  const allowPrev = currentPage > 1;
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
                `${!allowPrev ? `${baseClass}__item__btn--disabled` : ''}`
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
                `${!allowNext ? `${baseClass}__item__btn--disabled` : ''}`
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
