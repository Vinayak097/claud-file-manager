import { Music, MoreVertical } from 'lucide-react'
interface FileParam{
  key:string,
  dateModified:string,
  size:string,
  type?:string
}
const File = (prop:FileParam) => {
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] transition-colors border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid px-6 py-4 items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-lg bg-[#fe9a00]/15 flex justify-center items-center">
                        <Music className="size-4 text-[#fe9a00]" />
                      </div>
                      <span className="font-medium text-sm leading-5">
                        {prop.key}
                      </span>
                    </div>
                    <span className="text-[#9f9fa9] text-sm leading-5">{prop.size}</span>
                    <span className="text-[#9f9fa9] text-sm leading-5">Audio</span>
                    <span className="text-[#9f9fa9] text-sm leading-5">
                      {prop.dateModified}
                    </span>
                    <button className="size-8 rounded-md text-[#9f9fa9] flex justify-center items-center">
                      <MoreVertical className="size-4" />
                    </button>
                  </div>
  )
}

export default File
