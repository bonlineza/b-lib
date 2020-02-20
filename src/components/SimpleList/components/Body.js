import React, { useContext, Fragment } from 'react';
import Paginator from '../../Paginator/index.js';
import SimpleListItem from './SimpleItem.js';
import SimpleListContext from '../context';
import ButtonOrDiv from './ButtonOrDiv';

const Body = ({
  SimpleItemComponent = SimpleListItem,
  PaginatorComponent = Paginator,
}) => {
  const {
    name,
    headings,
    changePage,
    changePageLimit,
    pageData: { lastPage, currentPage, perPage },
    data,
    initialLoad,
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
                  <SimpleItemComponent
                    key={`${ck}`}
                    rowIndex={vk}
                    row={v}
                    text={v[col.name]}
                    flex={`${col.flex || (1 / headings.length) * 100}%`}
                    align={col.align}
                    column={col.name}
                    itemClass="simple-list__body__row__item"
                    customFormatter={col.customFormatter || null}
                    customRenderer={col.customRenderer || null}
                  />
                ))}
              </ButtonOrDiv>
            ))}
      </div>

      <PaginatorComponent
        onChangePage={changePage}
        changePageLimitCb={changePageLimit}
        totalPages={lastPage}
        currentPage={currentPage}
        perPage={perPage}
        hasItems={!!data.length}
        isLoading={initialLoad}
      />
    </Fragment>
  );
};

export default Body;
