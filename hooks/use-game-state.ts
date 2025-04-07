"use client"

import { useState, useEffect } from "react"

// Types
export interface Resource {
  coins: number
  wood: number
  bricks: number
  steel: number
}

export interface Building {
  id: string
  name: string
  description: string
  cost: Resource
  production: Resource
  level: number
  placed: boolean
  image: string
}

export interface Upgrade {
  id: string
  name: string
  description: string
  cost: Resource
  level: number
  maxLevel: number
  effect: string
}

export interface ShopItem {
  id: string
  name: string
  cost: Resource
  reward: Resource
}

// Initial game state
const initialBuildings: Building[] = [
  {
    id: "coin-generator",
    name: "Coin Generator",
    description: "Generates coins passively",
    cost: { coins: 50, wood: 0, bricks: 0, steel: 0 },
    production: { coins: 1, wood: 0, bricks: 0, steel: 0 },
    level: 0,
    placed: false,
    image: "/images/buildings/coin-generator.png",
  },
  {
    id: "lumber-yard",
    name: "Lumber Yard",
    description: "Produces wood over time",
    cost: { coins: 100, wood: 0, bricks: 0, steel: 0 },
    production: { coins: 0, wood: 1, bricks: 0, steel: 0 },
    level: 0,
    placed: false,
    image: "/images/buildings/lumber-yard.png",
  },
  {
    id: "brick-kiln",
    name: "Brick Kiln",
    description: "Produces bricks over time",
    cost: { coins: 150, wood: 10, bricks: 0, steel: 0 },
    production: { coins: 0, wood: 0, bricks: 1, steel: 0 },
    level: 0,
    placed: false,
    image: "/images/buildings/brick-kiln.png",
  },
  {
    id: "steel-mill",
    name: "Steel Mill",
    description: "Produces steel over time",
    cost: { coins: 200, wood: 0, bricks: 5, steel: 0 },
    production: { coins: 0, wood: 0, bricks: 0, steel: 1 },
    level: 0,
    placed: false,
    image: "/images/buildings/steel-mill.png",
  },
]

const initialUpgrades: Upgrade[] = [
  {
    id: "auto-click",
    name: "Auto Clicker",
    description: "Automatically generates coins",
    cost: { coins: 500, wood: 0, bricks: 0, steel: 0 },
    level: 0,
    maxLevel: 5,
    effect: "Generates 1 coin/sec per level",
  },
  {
    id: "tap-bonus",
    name: "Tap Bonus",
    description: "Increases coins per tap",
    cost: { coins: 300, wood: 0, bricks: 0, steel: 0 },
    level: 0,
    maxLevel: 10,
    effect: "+1 coin per tap per level",
  },
  {
    id: "lumber-boost",
    name: "Lumber Boost",
    description: "Increases wood production",
    cost: { coins: 0, wood: 5, bricks: 0, steel: 0 },
    level: 0,
    maxLevel: 5,
    effect: "+10% wood production per level",
  },
  {
    id: "brick-boost",
    name: "Brick Efficiency",
    description: "Increases brick production",
    cost: { coins: 0, wood: 0, bricks: 3, steel: 0 },
    level: 0,
    maxLevel: 5,
    effect: "+10% brick production per level",
  },
]

const initialShopItems: ShopItem[] = [
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

// Game state hook
export function useGameState() {
  // Game state - start with only 10 coins
  const [resources, setResources] = useState<Resource>({ coins: 10, wood: 0, bricks: 0, steel: 0 })
  const [buildings, setBuildings] = useState<Building[]>(initialBuildings)
  const [upgrades, setUpgrades] = useState<Upgrade[]>(initialUpgrades)
  const [shopItems] = useState<ShopItem[]>(initialShopItems)
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(Date.now())

  // Load game state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("idleGameState")
    if (savedState) {
      try {
        const { resources, buildings, upgrades, lastUpdateTime } = JSON.parse(savedState)
        setResources(resources)
        setBuildings(buildings)
        setUpgrades(upgrades)
        setLastUpdateTime(lastUpdateTime)
      } catch (error) {
        console.error("Error loading saved game state:", error)
      }
    }
  }, [])

  // Save game state to localStorage
  useEffect(() => {
    const gameState = {
      resources,
      buildings,
      upgrades,
      lastUpdateTime: Date.now(),
    }
    localStorage.setItem("idleGameState", JSON.stringify(gameState))
  }, [resources, buildings, upgrades])

  // Production tick
  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate production from buildings
      const production: Resource = { coins: 0, wood: 0, bricks: 0, steel: 0 }

      // Add building production
      buildings.forEach((building) => {
        if (building.placed && building.level > 0) {
          production.coins += building.production.coins
          production.wood += building.production.wood
          production.bricks += building.production.bricks
          production.steel += building.production.steel
        }
      })

      // Apply upgrades
      const autoClickLevel = upgrades.find((u) => u.id === "auto-click")?.level || 0
      production.coins += autoClickLevel

      const lumberBoostLevel = upgrades.find((u) => u.id === "lumber-boost")?.level || 0
      production.wood *= 1 + lumberBoostLevel * 0.1

      const brickBoostLevel = upgrades.find((u) => u.id === "brick-boost")?.level || 0
      production.bricks *= 1 + brickBoostLevel * 0.1

      // Add resources
      addResources(production)

      // Update last update time
      setLastUpdateTime(Date.now())
    }, 1000)

    return () => clearInterval(interval)
  }, [buildings, upgrades])

  // Add resources
  const addResources = (amount: Partial<Resource>) => {
    setResources((prev) => ({
      coins: prev.coins + (amount.coins || 0),
      wood: prev.wood + (amount.wood || 0),
      bricks: prev.bricks + (amount.bricks || 0),
      steel: prev.steel + (amount.steel || 0),
    }))
  }

  // Check if player has enough resources
  const hasEnoughResources = (cost: Resource): boolean => {
    return (
      resources.coins >= cost.coins &&
      resources.wood >= cost.wood &&
      resources.bricks >= cost.bricks &&
      resources.steel >= cost.steel
    )
  }

  // Deduct resources
  const deductResources = (cost: Resource) => {
    setResources((prev) => ({
      coins: prev.coins - cost.coins,
      wood: prev.wood - cost.wood,
      bricks: prev.bricks - cost.bricks,
      steel: prev.steel - cost.steel,
    }))
  }

  // Purchase building
  const purchaseBuilding = (buildingId: string): boolean => {
    const buildingIndex = buildings.findIndex((b) => b.id === buildingId)
    if (buildingIndex === -1) return false

    const building = buildings[buildingIndex]
    if (!hasEnoughResources(building.cost)) return false

    deductResources(building.cost)

    setBuildings((prev) => {
      const updated = [...prev]
      updated[buildingIndex] = {
        ...building,
        level: building.level + 1,
      }
      return updated
    })

    return true
  }

  // Place building on surface
  const placeBuildingOnSurface = (buildingId: string): boolean => {
    const buildingIndex = buildings.findIndex((b) => b.id === buildingId)
    if (buildingIndex === -1) return false

    setBuildings((prev) => {
      const updated = [...prev]
      updated[buildingIndex] = {
        ...updated[buildingIndex],
        placed: true,
      }
      return updated
    })

    return true
  }

  // Purchase upgrade
  const purchaseUpgrade = (upgradeId: string): boolean => {
    const upgradeIndex = upgrades.findIndex((u) => u.id === upgradeId)
    if (upgradeIndex === -1) return false

    const upgrade = upgrades[upgradeIndex]
    if (upgrade.level >= upgrade.maxLevel) return false
    if (!hasEnoughResources(upgrade.cost)) return false

    deductResources(upgrade.cost)

    setUpgrades((prev) => {
      const updated = [...prev]
      updated[upgradeIndex] = {
        ...upgrade,
        level: upgrade.level + 1,
        cost: {
          coins: Math.ceil(upgrade.cost.coins * 1.5),
          wood: Math.ceil(upgrade.cost.wood * 1.5),
          bricks: Math.ceil(upgrade.cost.bricks * 1.5),
          steel: Math.ceil(upgrade.cost.steel * 1.5),
        },
      }
      return updated
    })

    return true
  }

  // Exchange resources in shop
  const exchangeResources = (itemId: string): boolean => {
    // Find the shop item by ID
    const item = shopItems.find((i) => i.id === itemId)
    if (!item) {
      console.error(`Shop item with ID ${itemId} not found`)
      return false
    }

    // Check if player has enough resources
    if (!hasEnoughResources(item.cost)) {
      console.log(`Not enough resources for ${item.id}`)
      return false
    }

    // Deduct cost and add reward
    deductResources(item.cost)
    addResources(item.reward)

    console.log(`Exchanged ${itemId}: Cost:`, item.cost, "Reward:", item.reward)
    return true
  }

  // Calculate offline earnings
  const calculateOfflineEarnings = (): Resource => {
    const now = Date.now()
    const timeDiff = (now - lastUpdateTime) / 1000 // in seconds

    if (timeDiff < 60) return { coins: 0, wood: 0, bricks: 0, steel: 0 } // Less than a minute, no earnings

    // Calculate production per second
    const production: Resource = { coins: 0, wood: 0, bricks: 0, steel: 0 }

    // Add building production
    buildings.forEach((building) => {
      if (building.placed && building.level > 0) {
        production.coins += building.production.coins
        production.wood += building.production.wood
        production.bricks += building.production.bricks
        production.steel += building.production.steel
      }
    })

    // Apply upgrades
    const autoClickLevel = upgrades.find((u) => u.id === "auto-click")?.level || 0
    production.coins += autoClickLevel

    const lumberBoostLevel = upgrades.find((u) => u.id === "lumber-boost")?.level || 0
    production.wood *= 1 + lumberBoostLevel * 0.1

    const brickBoostLevel = upgrades.find((u) => u.id === "brick-boost")?.level || 0
    production.bricks *= 1 + brickBoostLevel * 0.1

    // Calculate total earnings (cap at 8 hours)
    const cappedTimeDiff = Math.min(timeDiff, 8 * 60 * 60)
    const earnings: Resource = {
      coins: Math.floor(production.coins * cappedTimeDiff),
      wood: Math.floor(production.wood * cappedTimeDiff),
      bricks: Math.floor(production.bricks * cappedTimeDiff),
      steel: Math.floor(production.steel * cappedTimeDiff),
    }

    // Add earnings to resources
    addResources(earnings)

    return earnings
  }

  return {
    resources,
    buildings,
    upgrades,
    shopItems,
    addResources,
    purchaseBuilding,
    purchaseUpgrade,
    exchangeResources,
    placeBuildingOnSurface,
    calculateOfflineEarnings,
  }
}

