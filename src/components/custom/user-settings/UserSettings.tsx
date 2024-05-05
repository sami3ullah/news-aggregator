import { Button } from '@/components/ui-library/button'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui-library/sheet'
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui-library/tooltip'
import { Settings } from 'lucide-react'

const UserSettings = () => {
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <Sheet>
            <SheetTrigger>
              <TooltipTrigger>
                <Button variant="rounded" size="icon">
                  <Settings />
                </Button>
              </TooltipTrigger>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <TooltipContent>User Preferences</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default UserSettings
