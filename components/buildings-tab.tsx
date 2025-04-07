"use client"

import type { Building as BuildingType, Resource } from "@/hooks/use-game-state"
import { Building } from "@/components/building"
import { Button } from "@/components/ui/button"
import { Coins, TreesIcon as Tree, BrickWallIcon as Brick, Wrench } from "lucide-react"
import Image from "next/image"

interface BuildingsTabProps {
  buildings: BuildingType[]
  resources: Resource
  onPurchase: (buildingId: string) => boolean
  onPlace: (buildingId: string) => boolean
}

export function BuildingsTab({ buildings, resources, onPurchase, onPlace }: BuildingsTabProps) {
  // Check if player can afford building
  const canAfford = (cost: Resource): boolean => {
    return (
      resources.coins >= cost.coins &&
      resources.wood >= cost.wood &&
      resources.bricks >= cost.bricks &&
      resources.steel >= cost.steel
    )
  }

  // Handle purchase and place
  const handlePurchaseAndPlace = (buildingId: string) => {
    const building = buildings.find((b) => b.id === buildingId)
    if (!building) return

    if (building.level === 0) {
      // Purchase first
      if (onPurchase(buildingId)) {
        // Then place
        onPlace(buildingId)
      }
    } else {
      // Already purchased, just place
      onPlace(buildingId)
    }
  }

  return (
    <div className="p-4 max-h-60 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-3 dark:text-white">Buildings</h2>
      <div className="grid grid-cols-1 gap-3">
        {buildings.map((building) => (
          <div
            key={building.id}
            className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
          >
            <div className="flex items-center">
              <div className="w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-600 rounded-md shadow-sm">
                {building.image ? (
                  <div className="relative w-12 h-12">
                    <Image
                      src={building.image || "/placeholder.svg"}
                      alt={building.name}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <Building building={building} />
                )}
              </div>
              <div className="ml-3">
                <h3 className="font-medium dark:text-white">{building.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-300">{building.description}</p>
                <div className="flex items-center mt-1 text-xs dark:text-gray-300">
                  <span className="mr-2">Produces:</span>
                  
                  {building.production.coins > 0 && (
                    <div className="flex items-center mr-2">
                      <Coins className="h-3 w-3 text-yellow-500 mr-1" />
                      <span>{building.production.coins}/s</span>
                    </div>
                  )}
                  {building.production.wood > 0 && (
                    <div className="flex items-center mr-2">
                      <Tree className="h-3 w-3 text-green-600 mr-1" />
                      <span>{building.production.wood}/s</span>
                    </div>
                  )}
                  {building.production.bricks > 0 && (
                    <div className="flex items-center mr-2">
                      <Brick className="h-3 w-3 text-red-500 mr-1" />
                      <span>{building.production.bricks}/s</span>
                    </div>
                  )}
                  {building.production.steel > 0 && (
                    <div className="flex items-center mr-2">
                      <Wrench className="h-3 w-3 text-gray-600 dark:text-gray-300 mr-1" />
                      <span>{building.production.steel}/s</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              {building.level === 0 ? (
                <div className="text-right">
                  <div className="flex flex-col items-end mb-2">
                    {building.cost.coins > 0 && (
                      <div className="flex items-center text-xs dark:text-gray-300">
                        <span>{building.cost.coins}</span>
                        <Coins className="h-3 w-3 text-yellow-500 ml-1" />
                      </div>
                    )}
                    {building.cost.wood > 0 && (
                      <div className="flex items-center text-xs dark:text-gray-300">
                        <span>{building.cost.wood}</span>
                        <Tree className="h-3 w-3 text-green-600 ml-1" />
                      </div>
                    )}
                    {building.cost.bricks > 0 && (
                      <div className="flex items-center text-xs dark:text-gray-300">
                        <span>{building.cost.bricks}</span>
                        <Brick className="h-3 w-3 text-red-500 ml-1" />
                      </div>
                    )}
                    {building.cost.steel > 0 && (
                      <div className="flex items-center text-xs dark:text-gray-300">
                        <span>{building.cost.steel}</span>
                        <Wrench className="h-3 w-3 text-gray-600 dark:text-gray-300 ml-1" />
                      </div>
                    )}
                  </div>
                  <Button
                    size="sm"
                    disabled={!canAfford(building.cost)}
                    onClick={() => handlePurchaseAndPlace(building.id)}
                  >
                    Buy
                  </Button>
                </div>
              ) : (
                <Button size="sm" onClick={() => handlePurchaseAndPlace(building.id)}>
                  Place
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

