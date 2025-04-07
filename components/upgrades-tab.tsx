"use client"

import type { Upgrade, Resource } from "@/hooks/use-game-state"
import { Button } from "@/components/ui/button"
import { Coins, TreesIcon as Tree, BrickWallIcon as Brick, Wrench } from "lucide-react"

interface UpgradesTabProps {
  upgrades: Upgrade[]
  resources: Resource
  onPurchase: (upgradeId: string) => boolean
}

export function UpgradesTab({ upgrades, resources, onPurchase }: UpgradesTabProps) {
  // Check if player can afford upgrade
  const canAfford = (cost: Resource): boolean => {
    return (
      resources.coins >= cost.coins &&
      resources.wood >= cost.wood &&
      resources.bricks >= cost.bricks &&
      resources.steel >= cost.steel
    )
  }

  return (
    <div className="p-4 max-h-60 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-3 dark:text-white">Upgrades</h2>
      <div className="grid grid-cols-1 gap-3">
        {upgrades.map((upgrade) => (
          <div
            key={upgrade.id}
            className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
          >
            <div>
              <h3 className="font-medium dark:text-white">{upgrade.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-300">{upgrade.description}</p>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{upgrade.effect}</p>
              <div className="flex items-center mt-1">
                <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full w-24">
                  <div
                    className="h-2 bg-primary rounded-full"
                    style={{ width: `${(upgrade.level / upgrade.maxLevel) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs ml-2 dark:text-gray-300">
                  Level {upgrade.level}/{upgrade.maxLevel}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-right mb-2">
                {upgrade.cost.coins > 0 && (
                  <div className="flex items-center text-xs justify-end dark:text-gray-300">
                    <span>{Math.floor(upgrade.cost.coins)}</span>
                    <Coins className="h-3 w-3 text-yellow-500 ml-1" />
                  </div>
                )}
                {upgrade.cost.wood > 0 && (
                  <div className="flex items-center text-xs justify-end dark:text-gray-300">
                    <span>{Math.floor(upgrade.cost.wood)}</span>
                    <Tree className="h-3 w-3 text-green-600 ml-1" />
                  </div>
                )}
                {upgrade.cost.bricks > 0 && (
                  <div className="flex items-center text-xs justify-end dark:text-gray-300">
                    <span>{Math.floor(upgrade.cost.bricks)}</span>
                    <Brick className="h-3 w-3 text-red-500 ml-1" />
                  </div>
                )}
                {upgrade.cost.steel > 0 && (
                  <div className="flex items-center text-xs justify-end dark:text-gray-300">
                    <span>{Math.floor(upgrade.cost.steel)}</span>
                    <Wrench className="h-3 w-3 text-gray-600 dark:text-gray-300 ml-1" />
                  </div>
                )}
              </div>
              <Button
                size="sm"
                disabled={!canAfford(upgrade.cost) || upgrade.level >= upgrade.maxLevel}
                onClick={() => onPurchase(upgrade.id)}
              >
                {upgrade.level >= upgrade.maxLevel ? "Maxed" : "Upgrade"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

