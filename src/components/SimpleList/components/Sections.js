import React, { useContext } from 'react';
import SimpleListItem from './SimpleItem.js';
import Paginator from '../../Paginator';
import { SimpleListContext } from '../index';

type PropsShape = {
  changePage: Function,
};

const Sections = ({ changePage }: PropsShape): React$Element<*> => {
  const {
    name,
    data,
    headings,
    onItemClick,
    pageData: { currentPage, lastPage },
    sectionData: { sectionTarget, sectionTitleKeys },
  } = useContext(SimpleListContext);
  return (
    <Paginator
      changePageCb={changePage}
      totalPages={lastPage}
      currentPage={currentPage}
      hasItems={!!data.length}>
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
                  {headings && headings.length > 0
                    ? headings.map((col: Object, ck: number): React$Element<
                        *,
                      > => (
                        <SimpleListItem
                          key={`${ck}`}
                          itemClass="simple-list__body__row__item"
                          flex={`${(1 / headings.length) * 100}%`}
                          column={col.name}
                          text={sectionItems[col.name]}
                        />
                      ))
                    : Object.keys(v[sectionTarget]).map(
                        (i: string, ik: number): React$Element<*> => (
                          <SimpleListItem
                            key={`${ik}`}
                            itemClass="simple-list__body__row__item"
                            flex={`${(1 / headings.length) * 100}%`}
                            column={i}
                            text={sectionItems[i]}
                          />
                        ),
                      )}
                </button>
              ),
            )}
          </div>
        ))}
      </div>
    </Paginator>
  );
};
Sections.defaultProps = {
  propOne: '',
  propTwo: '',
};

export default Sections;
