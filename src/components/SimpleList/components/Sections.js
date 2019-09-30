import React, { useContext, Fragment } from 'react';
import SimpleListItem from './SimpleItem.js';
import Paginator from '../../Paginator';
import { SimpleListContext } from '../index';

const Sections = (): React$Element<*> => {
  const {
    name,
    data,
    headings,
    isLoading,
    changePage,
    changePageLimit,
    onItemClick,
    pageData: { currentPage, lastPage, perPage },
    sectionData: { sectionTarget, sectionTitleKeys },
  } = useContext(SimpleListContext);
  return (
    <Fragment>
      <div className="simple-list__body--sectioned">
        {data.map((v: Object, vk: number): React$Element<*> => (
          <div
            className="simple-list__body__section"
            key={`${vk}`}
            data-qe-id={`${name}-table-${vk}`}>
            <div className="simple-list__body__section__title">
              {sectionTitleKeys.map(
                (title: string, tkey: number): React$Element<*> => (
                  <span
                    className="simple-list__body__section__title__item"
                    key={tkey}>
                    {`${v[title]} ${tkey === 1 ? ' - ' : ' '}`}
                  </span>
                ),
              )}
            </div>
            {v[sectionTarget].map(
              (sectionItems: Object, sectionKey: number): React$Element<*> => (
                <button
                  type="button"
                  key={sectionKey}
                  className={`simple-list__body__row${
                    sectionKey % 2 ? '--bgc-alt' : ''
                  }`}
                  onClick={e => {
                    e.preventDefault();
                    onItemClick(v, sectionKey);
                  }}
                  data-qe-id={`${name}-table-${vk}-${sectionKey}`}>
                  {headings.map((col: Object, ck: number): React$Element<*> => (
                    <SimpleListItem
                      key={`${ck}`}
                      itemClass="simple-list__body__row__item"
                      flex={`${(1 / headings.length) * 100}%`}
                      column={col.name}
                      text={sectionItems[col.name]}
                    />
                  ))}
                </button>
              ),
            )}
          </div>
        ))}
      </div>

      <Paginator
        onChangePage={changePage}
        changePageLimitCb={changePageLimit}
        totalPages={lastPage}
        currentPage={currentPage}
        perPage={perPage}
        hasItems={!!data.length}
        isLoading={isLoading}
      />
    </Fragment>
  );
};

export default Sections;
