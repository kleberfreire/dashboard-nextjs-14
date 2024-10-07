import { LayoutGridIcon, PackageIcon, ShoppingBasketIcon } from 'lucide-react'

import SideBarButton from './sidebar-button'

const SideBar = () => {
  return (
    <div className="w-64 bg-white">
      {/* IMAGE */}
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold">stockly</h1>
      </div>
      {/* MENU */}
      <div className="flex flex-col gap-2 p-2">
        <SideBarButton href="/">
          <LayoutGridIcon size={20} /> Dashboard
        </SideBarButton>
        <SideBarButton href="/products">
          <PackageIcon size={20} /> Produtos
        </SideBarButton>
        <SideBarButton href="/sales">
          <ShoppingBasketIcon size={20} /> vendas
        </SideBarButton>
      </div>
    </div>
  )
}

export default SideBar
