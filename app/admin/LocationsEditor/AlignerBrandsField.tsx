import { ICON_REGISTRY } from "@/lib/icons";
import { ADMIN_TRANSLATIONS } from "../shared/translations";
import type { AlignerBrand } from "../shared/adminTypes";

type AlignerBrandsFieldProps = {
  brands: AlignerBrand[];
  onChange: (brands: AlignerBrand[]) => void;
  locale: "sv" | "en";
};

export function AlignerBrandsField({
  brands,
  onChange,
  locale,
}: AlignerBrandsFieldProps) {
  const t = ADMIN_TRANSLATIONS[locale];

  const handleMoveUp = (index: number) => {
    const newBrands = [...brands];
    [newBrands[index], newBrands[index - 1]] = [
      newBrands[index - 1],
      newBrands[index],
    ];
    onChange(newBrands);
  };

  const handleMoveDown = (index: number) => {
    const newBrands = [...brands];
    [newBrands[index], newBrands[index + 1]] = [
      newBrands[index + 1],
      newBrands[index],
    ];
    onChange(newBrands);
  };

  const handleRemove = (brand: AlignerBrand) => {
    onChange(brands.filter((b) => b !== brand));
  };

  const handleAdd = (brand: AlignerBrand) => {
    onChange([...brands, brand]);
  };

  const availableBrands: AlignerBrand[] = ["clearcorrect", "invisalign"].filter(
    (brand) => !brands.includes(brand as AlignerBrand)
  ) as AlignerBrand[];

  return (
    <div className="space-y-2">
      {/* Selected brands as reorderable chips */}
      {brands.length > 0 ? (
        <div className="space-y-1">
          {brands.map((brand, idx) => {
            const icon = ICON_REGISTRY[brand];
            return (
              <div
                key={brand}
                className="flex items-center gap-2 bg-primary-light rounded-lg px-3 py-2 border border-primary/20"
              >
                <div className="flex items-center gap-2 flex-1">
                  {icon && (
                    <svg
                      className="w-4 h-4 text-primary shrink-0"
                      fill={icon.filled ? "currentColor" : "none"}
                      stroke={icon.filled ? "none" : "currentColor"}
                      viewBox="0 0 24 24"
                    >
                      {icon.paths.map((d, i) => (
                        <path
                          key={i}
                          strokeLinecap={icon.filled ? undefined : "round"}
                          strokeLinejoin={icon.filled ? undefined : "round"}
                          strokeWidth={icon.filled ? undefined : 1.5}
                          fillOpacity={icon.opacity}
                          d={d}
                        />
                      ))}
                    </svg>
                  )}
                  <span className="text-sm font-medium text-foreground">
                    {brand === "invisalign" ? "Invisalign" : "ClearCorrect"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {brands.length > 1 && (
                    <>
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMoveUp(idx)}
                        className="w-7 h-7 flex items-center justify-center rounded hover:bg-primary/20 disabled:opacity-30 transition-colors"
                        title="Flytta upp"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        disabled={idx === brands.length - 1}
                        onClick={() => handleMoveDown(idx)}
                        className="w-7 h-7 flex items-center justify-center rounded hover:bg-primary/20 disabled:opacity-30 transition-colors"
                        title="Flytta ner"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemove(brand)}
                    className="w-7 h-7 flex items-center justify-center rounded hover:bg-red-100 text-red-600 transition-colors"
                    title={t.remove}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-xs text-muted-dark italic">
          {t.noBrandsSelected}
        </p>
      )}

      {/* Available brands to add */}
      {availableBrands.length > 0 && (
        <div className="flex gap-2 pt-2">
          {availableBrands.map((brand) => {
            const icon = ICON_REGISTRY[brand];
            return (
              <button
                key={brand}
                type="button"
                onClick={() => handleAdd(brand)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-dashed border-border text-sm font-medium text-muted-dark hover:border-primary hover:text-primary hover:bg-primary-light transition-colors"
              >
                <span>+</span>
                {icon && (
                  <svg
                    className="w-3.5 h-3.5"
                    fill={icon.filled ? "currentColor" : "none"}
                    stroke={icon.filled ? "none" : "currentColor"}
                    viewBox="0 0 24 24"
                  >
                    {icon.paths.map((d, i) => (
                      <path
                        key={i}
                        strokeLinecap={icon.filled ? undefined : "round"}
                        strokeLinejoin={icon.filled ? undefined : "round"}
                        strokeWidth={icon.filled ? undefined : 1.5}
                        fillOpacity={icon.opacity}
                        d={d}
                      />
                    ))}
                  </svg>
                )}
                {brand === "invisalign" ? "Invisalign" : "ClearCorrect"}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
