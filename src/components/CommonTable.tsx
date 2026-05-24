import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';

interface CommonTableProps<T> extends Omit<TableProps<T>, 'dataSource'> {
  data: T[];
  columns: any[];
  rowKey?: string | ((record: T) => string);
  pageSize?: number;
  emptyText?: string;
  totalText?: string;
}

function CommonTable<T extends object>({ 
  data, 
  columns, 
  rowKey = 'id', 
  pageSize = 10, 
  emptyText = 'No data found',
  totalText = 'items',
  size = 'middle',
  ...restProps
}: CommonTableProps<T>) {

  // Custom pagination configuration for a more modern, consistent UI
  const getPaginationConfig = () => ({
    pageSize,
    showSizeChanger: true,
    showTotal: (total: number, range: [number, number]) => (
      <span style={{ 
        fontSize: '12px', 
        color: '#94a3b8',
        fontWeight: 500 
      }}>
        {range[0]}-{range[1]} of {total} {totalText}
      </span>
    ),
    pageSizeOptions: ['10', '20', '50', '100'],
    itemRender: (_: any, type: string, originalElement: React.ReactNode) => {
      if (type === 'prev' || type === 'next') {
        return (
          <a style={{ 
            color: '#3b82f6',
            fontWeight: 500,
            padding: '6px 12px',
            borderRadius: 8,
            transition: 'all 0.2s'
          }}>
            {type === 'prev' ? '← Prev' : 'Next →'}
          </a>
        );
      }
      if (type === 'jump_prev' || type === 'jump_next') {
        return <span style={{ color: '#94a3b8' }}>...</span>;
      }
      return originalElement;
    },
  });

  return (
    <Table
      size={size}
      dataSource={data}
      columns={columns}
      rowKey={rowKey}
      pagination={getPaginationConfig()}
      scroll={{ x: 800 }}
      locale={{ emptyText: <span style={{ color: '#3e3e3eff' }}>{emptyText}</span> }}
      {...restProps}
    />
  );
}

export default CommonTable;
