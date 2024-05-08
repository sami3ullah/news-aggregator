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
import InputFilter from '../filters/InputFilter'
import usePostStore from '@/store/posts'
import Multiselect from '../multiselect/MultiSelect'

const UserSettings = () => {
  const preferencePostCategories = usePostStore(
    (state) => state.preferencePostCategories
  )
  const preferencePostAuthors = usePostStore(
    (state) => state.preferencePostAuthors
  )
  const preferencePostSources = usePostStore(
    (state) => state.preferencePostSources
  )

  console.log(preferencePostSources)
  const {
    setPreferencePostCategories,
    setPreferencePostAuthors,
    setPreferencePostSources,
  } = usePostStore()

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <Sheet>
            <SheetTrigger asChild>
              <TooltipTrigger className="lola" asChild>
                <Button variant="rounded" size="icon">
                  <Settings />
                </Button>
              </TooltipTrigger>
            </SheetTrigger>
            <SheetContent className="w-full md:w-[400px] overflow-y-auto">
              <SheetHeader className="gap-10">
                <SheetTitle className="text-left text-[1.5rem]">
                  User Preferences
                </SheetTitle>
                <SheetDescription>
                  Personalize your news feed by using the options below. This
                  will add more diversity to your search.
                </SheetDescription>
                <div className="mt-[40px] flex flex-col gap-8">
                  <InputFilter
                    value={preferencePostCategories}
                    setValue={setPreferencePostCategories}
                    name="Categories"
                    placeholder="sports,technology"
                  />
                  <InputFilter
                    value={preferencePostAuthors}
                    setValue={setPreferencePostAuthors}
                    name="Authors"
                    placeholder="bbc,guardian"
                  />
                  <Multiselect
                    name="Sources"
                    values={preferencePostSources}
                    setValue={setPreferencePostSources}
                  />
                  <Button type="submit">Set Preferences</Button>
                </div>
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
