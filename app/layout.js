import './globals.css'
import LayoutWrapper from './components/LayoutWrapper'

export const metadata = {
  title: 'NextPlan - Government Jobs & Finance Tips',
  description: 'Latest updates on Government Jobs, Schemes, and Finance Tips',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}

