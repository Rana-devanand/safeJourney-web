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
  return (
    <Table
      size={size}
      dataSource={data}
      columns={columns}
      rowKey={rowKey}
      pagination={{ 
        pageSize, 
        showSizeChanger: true, 
        showTotal: (total) => `${total} ${totalText}` 
      }}
      scroll={{ x: 800 }}
      locale={{ emptyText: <span style={{ color: '#3e3e3eff' }}>{emptyText}</span> }}
      {...restProps}
    />
  );
}

export default CommonTable;
