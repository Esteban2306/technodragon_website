export type AdminView = 'product' | 'create' | 'catalog';

export interface AdminSidebarProps {
  active: AdminView;
  setActive: (view: AdminView) => void;
  stockMode: boolean;
  setStockMode: React.Dispatch<React.SetStateAction<boolean>>;
}
