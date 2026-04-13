"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const DropdownMenuContext = React.createContext<{
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

export const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block text-left" ref={menuRef}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  )
}

export const DropdownMenuTrigger = ({ 
  children, 
  asChild 
}: { 
  children: React.ReactNode
  asChild?: boolean 
}) => {
  const context = React.useContext(DropdownMenuContext)
  if (!context) throw new Error("DropdownMenuTrigger must be used within DropdownMenu")

  const handleClick = () => context.setOpen(!context.open)

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: (e: React.MouseEvent) => {
        children.props.onClick?.(e)
        handleClick()
      }
    })
  }

  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  )
}

export const DropdownMenuContent = ({ 
  children, 
  align = "right",
  className 
}: { 
  children: React.ReactNode
  align?: "left" | "right" | "end"
  className?: string
}) => {
  const context = React.useContext(DropdownMenuContext)
  if (!context) throw new Error("DropdownMenuContent must be used within DropdownMenu")

  if (!context.open) return null

  const alignmentClasses = {
    left: "left-0",
    right: "right-0",
    end: "right-0"
  }

  return (
    <div 
      className={cn(
        "absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 text-slate-950 shadow-md animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2",
        alignmentClasses[align as keyof typeof alignmentClasses] || "right-0",
        className
      )}
    >
      {children}
    </div>
  )
}

export const DropdownMenuLabel = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode 
  className?: string
}) => (
  <div className={cn("px-2 py-1.5 text-sm font-semibold", className)}>
    {children}
  </div>
)

export const DropdownMenuItem = ({ 
  children, 
  className,
  onClick
}: { 
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) => {
  const context = React.useContext(DropdownMenuContext)
  
  const handleClick = () => {
    onClick?.()
    context?.setOpen(false)
  }

  return (
    <div
      role="menuitem"
      onClick={handleClick}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
    >
      {children}
    </div>
  )
}

export const DropdownMenuSeparator = () => (
  <div className="-mx-1 my-1 h-px bg-slate-100" />
)
