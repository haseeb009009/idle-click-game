"use client"

import { Building, Sparkles, ShoppingCart, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

interface TabNavigationProps {
  activeTab: string
  onChange: (tab: string) => void
}

export function TabNavigation({ activeTab, onChange }: TabNavigationProps) {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-2 border-t border-gray-200 dark:border-gray-700 flex justify-between">
      <div className="flex justify-around flex-1">
        <button
          className={`flex flex-col items-center p-2 rounded-md ${
            activeTab === "buildings" ? "bg-gray-100 dark:bg-gray-700 text-primary" : "text-gray-500 dark:text-gray-400"
          }`}
          onClick={() => onChange("buildings")}
        >
          <Building className="h-5 w-5" />
          <span className="text-xs mt-1">Buildings</span>
        </button>
        <button
          className={`flex flex-col items-center p-2 rounded-md ${
            activeTab === "upgrades" ? "bg-gray-100 dark:bg-gray-700 text-primary" : "text-gray-500 dark:text-gray-400"
          }`}
          onClick={() => onChange("upgrades")}
        >
          <Sparkles className="h-5 w-5" />
          <span className="text-xs mt-1">Upgrades</span>
        </button>
        <button
          className={`flex flex-col items-center p-2 rounded-md ${
            activeTab === "shop" ? "bg-gray-100 dark:bg-gray-700 text-primary" : "text-gray-500 dark:text-gray-400"
          }`}
          onClick={() => onChange("shop")}
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="text-xs mt-1">Shop</span>
        </button>
      </div>
    </div>
  )
}

