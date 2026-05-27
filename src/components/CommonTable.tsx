import React, { useState } from 'react';

interface Column<T> {
  title: React.ReactNode;
  dataIndex?: string;
  key?: string;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
  render?: (text: any, record: T, index: number) => React.ReactNode;
}

interface CommonTableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowKey?: string | ((record: T) => string);
  pageSize?: number;
  emptyText?: string;
  totalText?: string;
  totalCount?: number;
  currentPage?: number;
  onPageChange?: (page: number, pageSize: number) => void;
  size?: 'small' | 'middle' | 'large';
  loading?: boolean;
}

function CommonTable<T extends object>({ 
  data, 
  columns, 
  rowKey = 'id', 
  pageSize = 10, 
  emptyText = 'No data found',
  totalText = 'items',
  size = 'middle',
  totalCount,
  currentPage,
  onPageChange,
  loading = false,
}: CommonTableProps<T>) {

  // Local state fallbacks if pagination is client-side / unmanaged by parent
  const [localPage, setLocalPage] = useState(1);

  const activePage = currentPage !== undefined ? currentPage : localPage;
  const totalItems = totalCount !== undefined ? totalCount : data.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    if (onPageChange) {
      onPageChange(page, pageSize);
    } else {
      setLocalPage(page);
    }
  };

  // Slices data for local pagination if parent is not handling page changes
  const displayData = onPageChange 
    ? data 
    : data.slice((activePage - 1) * pageSize, activePage * pageSize);

  const getRecordKey = (record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    const val = (record as any)[rowKey];
    return val !== undefined ? String(val) : String(index);
  };

  // Generate numbered page pills array with ellipses
  const getPagesRange = () => {
    const range: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      if (activePage <= 4) {
        range.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (activePage >= totalPages - 3) {
        range.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        range.push(1, '...', activePage - 1, activePage, activePage + 1, '...', totalPages);
      }
    }
    return range;
  };

  const startRange = totalItems === 0 ? 0 : (activePage - 1) * pageSize + 1;
  const endRange = Math.min(activePage * pageSize, totalItems);

  // Responsive padding based on "size" prop
  const paddingStyle = size === 'small' ? '10px 12px' : size === 'large' ? '20px 24px' : '16px 20px';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '16px' }}>
      {/* Self-contained CSS for table row hovering and active page actions */}
      <style>{`
        .custom-table-row {
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          transition: background-color 0.2s ease;
        }
        .custom-table-row:hover {
          background-color: rgba(255, 255, 255, 0.02) !important;
        }
        .custom-page-button {
          transition: all 0.2s;
        }
        .custom-page-button:hover:not(:disabled) {
          border-color: #3b82f6 !important;
          color: #ffffff !important;
        }
        .custom-nav-button {
          transition: all 0.2s;
        }
        .custom-nav-button:hover:not(:disabled) {
          background-color: rgba(255, 255, 255, 0.05) !important;
          color: #ffffff !important;
        }
        @keyframes skeleton-pulse {
          0%, 100% {
            opacity: 0.65;
          }
          50% {
            opacity: 0.3;
          }
        }
        .skeleton-bar {
          animation: skeleton-pulse 1.6s infinite ease-in-out;
        }
      `}</style>

      {/* Scrollable Responsive Table Wrapper */}
      <div style={{ 
        overflowX: 'auto', 
        width: '100%', 
        borderRadius: '16px', 
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backgroundColor: 'rgba(255, 255, 255, 0.01)',
      }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse', 
          textAlign: 'left',
          minWidth: '600px',
        }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
              {columns.map((col, idx) => (
                <th 
                  key={col.key || (col.dataIndex ? String(col.dataIndex) : '') || idx}
                  style={{
                    padding: paddingStyle,
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '14px',
                    textAlign: col.align || 'left',
                    width: col.width || 'auto',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: Math.min(pageSize, 8) }).map((_, rIdx) => (
                <tr 
                  key={`skeleton-row-${rIdx}`} 
                  style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}
                >
                  {columns.map((col, cIdx) => (
                    <td 
                      key={col.key || (col.dataIndex ? String(col.dataIndex) : '') || cIdx}
                      style={{
                        padding: paddingStyle,
                        textAlign: col.align || 'left',
                      }}
                    >
                      <div 
                        className="skeleton-bar"
                        style={{
                          height: '16px',
                          borderRadius: '6px',
                          width: col.width ? (typeof col.width === 'number' ? `${col.width}px` : col.width) : '85%',
                          maxWidth: '100%',
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        }}
                      />
                    </td>
                  ))}
                </tr>
              ))
            ) : displayData.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length} 
                  style={{ 
                    padding: '48px 0', 
                    textAlign: 'center', 
                    color: '#94a3b8',
                    fontSize: '14px',
                  }}
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              displayData.map((record, rIdx) => (
                <tr 
                  key={getRecordKey(record, rIdx)}
                  className="custom-table-row"
                >
                  {columns.map((col, cIdx) => {
                    const text = col.dataIndex ? (record as any)[col.dataIndex] : undefined;
                    const content = col.render ? col.render(text, record, (activePage - 1) * pageSize + rIdx) : text;
                    return (
                      <td 
                        key={col.key || (col.dataIndex ? String(col.dataIndex) : '') || cIdx}
                        style={{
                          padding: paddingStyle,
                          color: '#cbd5e1',
                          fontSize: '14px',
                          textAlign: col.align || 'left',
                        }}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modern Glassmorphic Custom Pagination Controls */}
      {totalPages > 0 && (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '8px 4px',
          width: '100%',
        }}>
          {/* Sizing & Range info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>
              {startRange}-{endRange} of {totalItems} {totalText}
            </span>
            
            {onPageChange && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <select
                  value={pageSize}
                  onChange={(e) => onPageChange(1, Number(e.target.value))}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    borderRadius: '8px',
                    padding: '4px 10px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  {[10, 20, 50, 100].map(sizeOpt => (
                    <option key={sizeOpt} value={sizeOpt} style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>
                      {sizeOpt} / page
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Page Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Prev Button */}
            <button
              onClick={() => handlePageChange(activePage - 1)}
              disabled={activePage === 1}
              className="custom-nav-button"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: activePage === 1 ? '#475569' : '#60a5fa',
                cursor: activePage === 1 ? 'default' : 'pointer',
                fontSize: '13px',
                fontWeight: 700,
                padding: '6px 12px',
                borderRadius: '8px',
                opacity: activePage === 1 ? 0.5 : 1,
                outline: 'none',
              }}
            >
              ← Prev
            </button>

            {/* Page Numbers */}
            {getPagesRange().map((page, idx) => {
              if (page === '...') {
                return (
                  <span 
                    key={`ellipsis-${idx}`} 
                    style={{ 
                      color: '#64748b', 
                      padding: '0 8px', 
                      fontSize: '14px',
                      fontWeight: 500
                    }}
                  >
                    ...
                  </span>
                );
              }

              const isSelected = page === activePage;
              return (
                <button
                  key={`page-${page}`}
                  onClick={() => handlePageChange(Number(page))}
                  className="custom-page-button"
                  style={{
                    minWidth: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: isSelected ? '#ffffff' : '#cbd5e1',
                    background: isSelected 
                      ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' 
                      : 'rgba(255, 255, 255, 0.03)',
                    boxShadow: isSelected ? '0 4px 12px rgba(37, 99, 235, 0.3)' : 'none',
                    outline: 'none',
                  }}
                >
                  {page}
                </button>
              );
            })}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(activePage + 1)}
              disabled={activePage === totalPages}
              className="custom-nav-button"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: activePage === totalPages ? '#475569' : '#60a5fa',
                cursor: activePage === totalPages ? 'default' : 'pointer',
                fontSize: '13px',
                fontWeight: 700,
                padding: '6px 12px',
                borderRadius: '8px',
                opacity: activePage === totalPages ? 0.5 : 1,
                outline: 'none',
              }}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommonTable;
