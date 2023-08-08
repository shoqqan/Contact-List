import React from 'react';

export const FilterButtons = () => {
    const filters = [
        {title: 'Name'},
        {title: 'Mail'},
        {title: 'Number'},
        {title: 'Only males'},
        {title: 'Only females'}
    ]
    return (
        <div className={'flex gap-x-2 text-white'}>
            <div>Sort by:</div>
            <div className={'flex gap-x-2'}>
                {filters.map(el =>
                    <div className={'h-[30px] bg-[red]'}>{el.title}</div>
                )}
            </div>
        </div>
    );
};

