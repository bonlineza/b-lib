import React, { useContext, Fragment } from 'react';
import Paginator from 'components/Paginator';
import SimpleListItem from './SimpleItem.js';
import { SimpleListContext } from '../index';
import ButtonOrDiv from './ButtonOrDiv';

const Body = () => {
  const {
    name,
    headings,
    changePage,
    changePageLimit,
    pageData: { lastPage, currentPage, perPage },
    data,
    isLoading,
    childrenRenderer,
    allowClick,
    onItemClick,
  } = useContext(SimpleListContext);
  return (
    <Fragment>
      <div className="simple-list__body">
        {typeof childrenRenderer === 'function'
          ? childrenRenderer(data)
          : data.map((v: Object, vk: number): React$Element<*> => (
              <ButtonOrDiv
                key={vk}
                allowClick={allowClick}
                index={vk}
                clickAct={onItemClick}
                item={v}
                identifier={`${name}-table-${vk}`}>
                {headings.map((col: Object, ck: number): React$Element<*> => (
                  <SimpleListItem
                    key={`${ck}`}
                    itemClass="simple-list__body__row__item"
                    flex={`${(1 / headings.length) * 100}%`}
                    column={col.name}
                    text={v[col.name]}
                    customFormatter={col.customFormatter || null}
                    align={col.align}
                  />
                ))}
              </ButtonOrDiv>
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

export default Body;
