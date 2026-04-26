export type AdminView = 'product' | 'create' | 'stock' | 'categories';

export type AdminSidebarProps = {
  active: AdminView;
  setActive: React.Dispatch<React.SetStateAction<AdminView>>;
  stockMode: boolean;
  setStockMode: React.Dispatch<React.SetStateAction<boolean>>;
};