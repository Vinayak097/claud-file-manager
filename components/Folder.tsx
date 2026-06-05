import React from 'react'
import { Card, CardContent } from './ui/card'
import { Folder } from 'lucide-react'

const Folders = ({name}:{name:string}) => {
  return (
  <Card className="cursor-pointer transition-colors bg-zinc-900 border-white/10 border-0 border-solid p-4 gap-0">
                <CardContent className="flex p-0 items-center gap-3">
                  <div className="size-10 rounded-lg bg-[#155dfc]/15 flex justify-center items-center">
                    <Folder className="size-5 text-[#155dfc]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm leading-5">
                      {name}
                    </span>
                    <span className="text-[#9f9fa9] text-xs leading-4">
                      12 files
                    </span>
                  </div>
                </CardContent>
              </Card>
  )
}

export default Folders
