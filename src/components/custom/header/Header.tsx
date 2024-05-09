import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui-library/avatar'
import UserSettings from '../user-settings/UserSettings'

const Header = () => {
  return (
    <header className="sticky top-0 flex h-16 items-center justify-between gap-4 bg-background px-4 md:px-12 z-30">
      <div>
        <img src="./logo.png" className="w-[240px] lg:w-[280px] " alt="logo" />
      </div>
      <div className="flex items-center gap-4">
        <Avatar className="w-10 h-10 md:w-12 md:h-12">
          <AvatarImage src="./avatar-image.png" alt="user profile image" />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
        <UserSettings />
      </div>
    </header>
  )
}

export default Header
