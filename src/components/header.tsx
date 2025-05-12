import { Link } from 'react-router-dom'
import { ThemeToggle } from './theme/theme-toggle'

export function Header() {
  return (
    <header className="border-b-2">
      <div className="flex h-16 items-center gap-6 ">
        <nav className="space-x-4 lg:space-x-6">
          <Link
            to="/"
            className="flex items-center gap-2"
            aria-label="Dashboard"
          >
            <span className="font-bold">Jean Michel Biz</span>
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
