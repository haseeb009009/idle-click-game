"use client"

import type { Resource } from "@/hooks/use-game-state"
import { Coins, TreesIcon as Tree, BrickWallIcon as Brick, Wrench } from "lucide-react"

interface ResourceBarProps {
  resources: Resource
}

export function ResourceBar({ resources }: ResourceBarProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-2 shadow-md flex justify-around items-center">
      <div className="flex items-center gap-1">
        <Coins className="h-4 w-4 text-yellow-500" />
        <span className="text-sm font-medium dark:text-white">{Math.floor(resources.coins)}</span>
      </div>
      <div className="flex items-center gap-1">
        <Tree className="h-4 w-4 text-green-600" />
        <span className="text-sm font-medium dark:text-white">{Math.floor(resources.wood)}</span>
      </div>
      <div className="flex items-center gap-1">
        <Brick className="h-4 w-4 text-red-500" />
        <span className="text-sm font-medium dark:text-white">{Math.floor(resources.bricks)}</span>
      </div>
      <div className="flex items-center gap-1">
        <Wrench className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        <span className="text-sm font-medium dark:text-white">{Math.floor(resources.steel)}</span>
      </div>
    </div>
  )
}

