'use client'

import { User } from "lucide-react"
import { cn } from "@/lib/utils"

interface AvatarPlaceholderProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function AvatarPlaceholderComponent({ size = 'md', className }: AvatarPlaceholderProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  return (
    <div 
      className={cn(
        "rounded-full bg-muted flex items-center justify-center",
        sizeClasses[size],
        className
      )}
    >
      <User 
        className={cn(
          "text-muted-foreground",
          size === 'sm' && "w-4 h-4",
          size === 'md' && "w-6 h-6",
          size === 'lg' && "w-8 h-8"
        )} 
      />
    </div>
  )
}