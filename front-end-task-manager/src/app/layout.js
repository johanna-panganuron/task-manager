// src/app/layout.js
import '../styles/globals.scss'

export const metadata = {
  title: 'Task Manager',
  description: 'A modern task management application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/icon.png" />
        <link rel="icon" type="image/png" href="/icon.png" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>{children}</body>
    </html>
  )
}