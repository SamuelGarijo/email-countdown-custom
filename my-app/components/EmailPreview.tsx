export default function EmailPreview() {
  return (
    <div style={{ backgroundColor: '#fff', padding: '20px' }}>
      <table role="presentation" width="100%" cellSpacing="0" cellPadding="0" border={0}>
        <tbody>
          <tr>
            <td align="center" style={{ padding: '20px 0' }}>
              <table role="presentation" width="600" cellSpacing="0" cellPadding="0" border={0} style={{ backgroundColor: '#ffffff' }}>
                <tbody>
                  <tr>
                    <td align="center" style={{ padding: '20px 0' }}>
                      <div style={{ fontSize: 0, lineHeight: 0 }}>
                        <a href="https://countdownchristmasv2.vercel.app/" target="_blank" style={{ textDecoration: 'none' }}>
                          <img src="/api/countdown/days" 
                               alt="Days" 
                               width="100" height="100" 
                               style={{ display: 'inline-block', border: 0 }} />
                          <img src="/api/countdown/hours" 
                               alt="Hours" 
                               width="100" height="100" 
                               style={{ display: 'inline-block', border: 0 }} />
                          <img src="/api/countdown/minutes" 
                               alt="Minutes" 
                               width="100" height="100" 
                               style={{ display: 'inline-block', border: 0 }} />
                          <img src="/api/countdown/seconds" 
                               alt="Seconds" 
                               width="100" height="100" 
                               style={{ display: 'inline-block', border: 0 }} />
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

