const SideBar = () => {
  return (
    <div className="w-64 bg-white">
      {/* IMAGE */}
      <div className="px-8 py-6">
        <h1 className="font-bold text-2xl">
          stockly 
        </h1>
      </div>
      { /* MENU */}
      <div className="flex flex-col gap-2 p-2">
        <button className="px-6 py-3">Dashboard</button>
        <button className="px-6 py-3">Produtos</button>
        <button className="px-6 py-3">vendas</button>
      </div>
    </div>
  );
}

export default SideBar;