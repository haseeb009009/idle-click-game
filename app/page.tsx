"use client"

import { useState, useEffect } from "react"
import { Building } from "@/components/building"
import { ResourceBar } from "@/components/resource-bar"
import { TabNavigation } from "@/components/tab-navigation"
import { BuildingsTab } from "@/components/buildings-tab"
import { UpgradesTab } from "@/components/upgrades-tab"
import { ShopTab } from "@/components/shop-tab"
import { OfflineEarningsModal } from "@/components/offline-earnings-modal"
import { useGameState } from "@/hooks/use-game-state"
import Image from "next/image"

export default function IdleGame() {
  const [activeTab, setActiveTab] = useState("buildings")
  const [showOfflineModal, setShowOfflineModal] = useState(false)
  const [offlineEarnings, setOfflineEarnings] = useState({ coins: 0, wood: 0, bricks: 0, steel: 0 })

  const {
    resources,
    buildings,
    upgrades,
    addResources,
    purchaseBuilding,
    purchaseUpgrade,
    exchangeResources,
    placeBuildingOnSurface,
    calculateOfflineEarnings,
  } = useGameState()

  // Handle tap to earn coins
  const handleTap = () => {
    const tapValue = 1 + (upgrades.find((u) => u.id === "tap-bonus")?.level || 0)
    addResources({ coins: tapValue })
  }

  // Check for offline earnings when the game loads
  useEffect(() => {
    const earnings = calculateOfflineEarnings()
    if (earnings.coins > 0 || earnings.wood > 0 || earnings.bricks > 0 || earnings.steel > 0) {
      setOfflineEarnings(earnings)
      setShowOfflineModal(true)
    }
  }, [])

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-sky-200 to-sky-100 dark:from-gray-900 dark:to-gray-800 touch-none">
      {/* Resource Bar */}
      <ResourceBar resources={resources} />

      {/* Main Game Area */}
      <div className="flex-1 relative" onClick={handleTap}>
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/background/game-background.png"
            alt="Game Background"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Sky with clouds */}
        <div className="absolute inset-0 h-1/2 overflow-hidden">
          <div className="cloud absolute w-20 h-10 bg-white dark:bg-gray-300 rounded-full left-10 top-20 opacity-80 animate-cloud-1"></div>
          <div className="cloud absolute w-32 h-16 bg-white dark:bg-gray-300 rounded-full left-40 top-40 opacity-70 animate-cloud-2"></div>
          <div className="cloud absolute w-24 h-12 bg-white dark:bg-gray-300 rounded-full right-20 top-30 opacity-75 animate-cloud-3"></div>
        </div>

        {/* Ground/Surface */}
        <div className="absolute bottom-0 w-full h-1/2">
          {/* Buildings placed on surface */}
          <div className="flex justify-around items-end h-full pb-4 scene-area">
            {buildings
              .filter((building) => building.placed)
              .map((building) => (
                <Building key={building.id} building={building} />
              ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 rounded-t-xl shadow-lg">
        {activeTab === "buildings" && (
          <BuildingsTab
            buildings={buildings.filter((b) => !b.placed)}
            resources={resources}
            onPurchase={purchaseBuilding}
            onPlace={placeBuildingOnSurface}
          />
        )}

        {activeTab === "upgrades" && (
          <UpgradesTab upgrades={upgrades} resources={resources} onPurchase={purchaseUpgrade} />
        )}

        {activeTab === "shop" && <ShopTab resources={resources} onExchange={exchangeResources} />}
      </div>

      {/* Tab Navigation */}
      <TabNavigation activeTab={activeTab} onChange={setActiveTab} />

      {/* Offline Earnings Modal */}
      {showOfflineModal && (
        <OfflineEarningsModal earnings={offlineEarnings} onClose={() => setShowOfflineModal(false)} />
      )}
    </div>
  )
}

