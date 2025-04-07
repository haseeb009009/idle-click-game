"use client"

import type { Resource } from "@/hooks/use-game-state"
import { Button } from "@/components/ui/button"
import { Coins, TreesIcon as Tree, BrickWallIcon as Brick, Wrench } from "lucide-react"

interface ShopItem {
  id: string
  name: string
  cost: Resource
  reward: Resource
}

interface ShopTabProps {
  resources: Resource
  onExchange: (itemId: string) => boolean
}

export function ShopTab({ resources, onExchange }: ShopTabProps) {
  // Define shop items with consistent IDs that match the game state
  const shopItems: ShopItem[] = [
    {
      id: "buy-wood",
      name: "Buy Wood",
      cost: { coins: 100, wood: 0, bricks: 0, steel: 0 },
      reward: { coins: 0, wood: 10, bricks: 0, steel: 0 },
    },
    {
      id: "buy-bricks",
      name: "Buy Bricks",
      cost: { coins: 100, wood: 0, bricks: 0, steel: 0 },
      reward: { coins: 0, wood: 0, bricks: 5, steel: 0 },
    },
    {
      id: "buy-steel",
      name: "Buy Steel",
      cost: { coins: 200, wood: 0, bricks: 0, steel: 0 },
      reward: { coins: 0, wood: 0, bricks: 0, steel: 2 },
    },
    {
      id: "sell-wood",
      name: "Sell Wood",
      cost: { coins: 0, wood: 10, bricks: 0, steel: 0 },
      reward: { coins: 80, wood: 0, bricks: 0, steel: 0 },
    },
    {
      id: "sell-bricks",
      name: "Sell Bricks",
      cost: { coins: 0, wood: 0, bricks: 5, steel: 0 },
      reward: { coins: 80, wood: 0, bricks: 0, steel: 0 },
    },
    {
      id: "sell-steel",
      name: "Sell Steel",
      cost: { coins: 0, wood: 0, bricks: 0, steel: 2 },
      reward: { coins: 160, wood: 0, bricks: 0, steel: 0 },
    },
  ]

  // Check if player can afford item
  const canAfford = (cost: Resource): boolean => {
    return (
      resources.coins >= cost.coins &&
      resources.wood >= cost.wood &&
      resources.bricks >= cost.bricks &&
      resources.steel >= cost.steel
    )
  }

  // Handle exchange with proper error handling
  const handleExchange = (itemId: string) => {
    const success = onExchange(itemId)
    if (success) {
      console.log(`Successfully exchanged ${itemId}`)
    } else {
      console.log(`Failed to exchange ${itemId}`)
    }
  }

  return (
    <div className="p-4 max-h-60 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-3 dark:text-white">Shop</h2>
      <div className="grid grid-cols-1 gap-3">
        {shopItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <div>
              <h3 className="font-medium dark:text-white">{item.name}</h3>
              <div className="flex items-center mt-1">
                <div className="flex items-center mr-3">
                  <span className="text-xs mr-1 dark:text-gray-300">Cost:</span>
                  {item.cost.coins > 0 && (
                    <div className="flex items-center mr-1">
                      <span className="text-xs dark:text-gray-300">{item.cost.coins}</span>
                      <Coins className="h-3 w-3 text-yellow-500 ml-1" />
                    </div>
                  )}
                  {item.cost.wood > 0 && (
                    <div className="flex items-center mr-1">
                      <span className="text-xs dark:text-gray-300">{item.cost.wood}</span>
                      <Tree className="h-3 w-3 text-green-600 ml-1" />
                    </div>
                  )}
                  {item.cost.bricks > 0 && (
                    <div className="flex items-center mr-1">
                      <span className="text-xs dark:text-gray-300">{item.cost.bricks}</span>
                      <Brick className="h-3 w-3 text-red-500 ml-1" />
                    </div>
                  )}
                  {item.cost.steel > 0 && (
                    <div className="flex items-center mr-1">
                      <span className="text-xs dark:text-gray-300">{item.cost.steel}</span>
                      <Wrench className="h-3 w-3 text-gray-600 dark:text-gray-300 ml-1" />
                    </div>
                  )}
                </div>
                <div className="flex items-center">
                  <span className="text-xs mr-1 dark:text-gray-300">Reward:</span>
                  {item.reward.coins > 0 && (
                    <div className="flex items-center mr-1">
                      <span className="text-xs dark:text-gray-300">{item.reward.coins}</span>
                      <Coins className="h-3 w-3 text-yellow-500 ml-1" />
                    </div>
                  )}
                  {item.reward.wood > 0 && (
                    <div className="flex items-center mr-1">
                      <span className="text-xs dark:text-gray-300">{item.reward.wood}</span>
                      <Tree className="h-3 w-3 text-green-600 ml-1" />
                    </div>
                  )}
                  {item.reward.bricks > 0 && (
                    <div className="flex items-center mr-1">
                      <span className="text-xs dark:text-gray-300">{item.reward.bricks}</span>
                      <Brick className="h-3 w-3 text-red-500 ml-1" />
                    </div>
                  )}
                  {item.reward.steel > 0 && (
                    <div className="flex items-center mr-1">
                      <span className="text-xs dark:text-gray-300">{item.reward.steel}</span>
                      <Wrench className="h-3 w-3 text-gray-600 dark:text-gray-300 ml-1" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Button size="sm" disabled={!canAfford(item.cost)} onClick={() => handleExchange(item.id)}>
              Exchange
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

