interface TypographyRow {
  role: string
  family: string
  size: string
  weight: string
  lineHeight: string
}

interface TypographyScaleTableProps {
  rows: TypographyRow[]
}

/**
 * TypographyScaleTable displays extracted typography rules in a responsive table.
 * Columns: Role | Family | Size | Weight | Line Height.
 * Font family values are shown in monospace.
 *
 * @param {TypographyScaleTableProps} props - Array of typography scale rows.
 * @returns {JSX.Element} The typography scale table section.
 */
function TypographyScaleTable({ rows }: TypographyScaleTableProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h3
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 600,
          fontSize: '14px',
          color: '#0A0A0A',
          margin: 0,
        }}
      >
        Typography
      </h3>
      <div
        style={{
          height: '1px',
          background: 'rgba(10,10,10,0.08)',
          width: '100%',
        }}
      />
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '13px',
          }}
        >
          <thead>
            <tr style={{ background: '#F5F5F6' }}>
              {['Role', 'Family', 'Size', 'Weight', 'Line Height'].map(
                (header) => (
                  <th
                    key={header}
                    style={{
                      textAlign: 'left',
                      padding: '8px 10px',
                      fontFamily: 'DM Sans, sans-serif',
                      fontWeight: 500,
                      fontSize: '12px',
                      color: 'rgba(10,10,10,0.6)',
                      borderBottom: '1px solid rgba(10,10,10,0.08)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {header}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.role}
                style={{
                  background: i % 2 === 0 ? '#FFFFFF' : '#F5F5F6',
                }}
              >
                <td
                  style={{
                    padding: '8px 10px',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '13px',
                    color: '#0A0A0A',
                    borderBottom: '1px solid rgba(10,10,10,0.06)',
                  }}
                >
                  {row.role}
                </td>
                <td
                  style={{
                    padding: '8px 10px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '12px',
                    color: '#0A0A0A',
                    borderBottom: '1px solid rgba(10,10,10,0.06)',
                  }}
                >
                  {row.family}
                </td>
                <td
                  style={{
                    padding: '8px 10px',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '13px',
                    color: '#0A0A0A',
                    borderBottom: '1px solid rgba(10,10,10,0.06)',
                  }}
                >
                  {row.size}
                </td>
                <td
                  style={{
                    padding: '8px 10px',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '13px',
                    color: '#0A0A0A',
                    borderBottom: '1px solid rgba(10,10,10,0.06)',
                  }}
                >
                  {row.weight}
                </td>
                <td
                  style={{
                    padding: '8px 10px',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '13px',
                    color: '#0A0A0A',
                    borderBottom: '1px solid rgba(10,10,10,0.06)',
                  }}
                >
                  {row.lineHeight}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { TypographyScaleTable };
