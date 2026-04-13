
import Link from 'next/link';
import { catalogCategories } from './catalog-categorie.data';

export function NavLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className={mobile ? "flex flex-col gap-4" : "flex items-center gap-2"}>

      <Link href="/">Inicio</Link>

      <div className="flex flex-col gap-2">
        <span className="font-medium">Catálogo</span>

        <div className={mobile ? "pl-2 flex flex-col gap-2" : ""}>
          {catalogCategories.map((category) => (
            <Link key={category.title} href={category.href}>
              <div className="flex flex-col">
                <span>{category.title}</span>
                {mobile && (
                  <span className="text-xs text-gray-400">
                    {category.description}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Link href="#">Servicios</Link>
      <Link href="#">Contacto</Link>

    </div>
  );
}