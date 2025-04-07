"use client"
import { Home, Factory, Warehouse, Building2 } from "lucide-react"
import type { Building as BuildingType } from "@/hooks/use-game-state"
import Image from "next/image"

interface BuildingProps {
  building: BuildingType
  onClick?: () => void
}

export function Building({ building, onClick }: BuildingProps) {
  // Get icon based on building type
  const getIcon = () => {
    switch (building.id) {
      case "coin-generator":
        return <Home className="h-6 w-6 text-yellow-500" />
      case "lumber-yard":
        return <Warehouse className="h-6 w-6 text-green-600" />
      case "brick-kiln":
        return <Factory className="h-6 w-6 text-red-500" />
      case "steel-mill":
        return <Building2 className="h-6 w-6 text-gray-600" />
      default:
        return <Home className="h-6 w-6" />
    }
  }

  return (
    <div
      className="flex flex-col items-center justify-center p-2 bg-white dark:bg-gray-700 rounded-md shadow-md"
      style={{
        width: "80px",
        height: "80px",
        position: "relative",
      }}
      onClick={onClick}
    >
      <div className="mb-1">
        {building.image ? (
          <div className="relative w-6 h-6">
            <Image
              src={building.image || "/placeholder.svg"}
              alt={building.name}
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
        ) : (
          getIcon()
        )}
      </div>
      <div className="text-xs text-center font-medium dark:text-white">{building.name}</div>
      {building.level > 1 && <div className="text-xs text-gray-500 dark:text-gray-300">Lvl {building.level}</div>}
    </div>
  )
}

