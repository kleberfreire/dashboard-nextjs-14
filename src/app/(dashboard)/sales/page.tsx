import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import Header, {
  HeaderLeft,
  HeaderRight,
  HeaderSubtitle,
  HeaderTitle,
} from '../_components/header'

import { Button } from '@/components/ui/button'
import UpsertSheetContent from './_components/upsert-sheet-content'
import { getProducts } from '@/data-acess/product/get-products'
import type { ComboboxOption } from '@/components/ui/combobox'

const SalesPage = async () => {
  const products = await getProducts()

  const productOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }))

  return (
    <div className="m-8 w-full space-y-8 overflow-auto rounded-lg bg-white p-8">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Gestão de Vendas</HeaderSubtitle>
          <HeaderTitle>Produtos</HeaderTitle>
        </HeaderLeft>
        <HeaderRight>
          <Sheet>
            <SheetTrigger asChild>
              <Button>Nova Venda</Button>
            </SheetTrigger>
            <UpsertSheetContent
              productOptions={productOptions}
              products={products}
            />
          </Sheet>
        </HeaderRight>
      </Header>
    </div>
  )
}

export default SalesPage
