"use client"

import type { Resource } from "@/hooks/use-game-state"
import { Button } from "@/components/ui/button"
import { Coins, TreesIcon as Tree, BrickWallIcon as Brick, Wrench } from "lucide-react"

interface OfflineEarningsModalProps {
  earnings: Resource
  onClose: () => void
}

export function OfflineEarningsModal({ earnings, onClose }: OfflineEarningsModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Welcome Back!</h2>
        <p className="mb-4 dark:text-gray-300">While you were away, your empire earned:</p>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
          <div className="grid grid-cols-2 gap-2">
            {earnings.coins > 0 && (
              <div className="flex items-center">
                <Coins className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="dark:text-white">{Math.floor(earnings.coins)} coins</span>
              </div>
            )}
            {earnings.wood > 0 && (
              <div className="flex items-center">
                <Tree className="h-5 w-5 text-green-600 mr-2" />
                <span className="dark:text-white">{Math.floor(earnings.wood)} wood</span>
              </div>
            )}
            {earnings.bricks > 0 && (
              <div className="flex items-center">
                <Brick className="h-5 w-5 text-red-500 mr-2" />
                <span className="dark:text-white">{Math.floor(earnings.bricks)} bricks</span>
              </div>
            )}
            {earnings.steel > 0 && (
              <div className="flex items-center">
                <Wrench className="h-5 w-5 text-gray-600 dark:text-gray-300 mr-2" />
                <span className="dark:text-white">{Math.floor(earnings.steel)} steel</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={onClose}>Claim Rewards</Button>
        </div>
      </div>
    </div>
  )
}

