'use client'

type AttributeGroup = {
  name: string
  values: string[]
}

type Selected = Record<string, string>

type Props = {
  attributes: AttributeGroup[]
  selected: Selected
  onChange: React.Dispatch<React.SetStateAction<Selected>>
}

export default function VariantSelector({ attributes, selected, onChange }: Props) {
  return (
    <div className="flex flex-col gap-6 mt-6">

      {attributes.map((attr) => (
        <div key={attr.name} className="flex flex-col gap-3 border-t border-neutral-800 pt-4">

          {/* LABEL */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-neutral-400">{attr.name}</span>

            <span className="text-sm text-white">
              {selected[attr.name] || "—"}
            </span>
          </div>

          {/* OPTIONS */}
          <div
            className={`
              grid gap-2
              ${attr.values.length <= 2 ? "grid-cols-2" : ""}
              ${attr.values.length === 3 ? "grid-cols-3" : ""}
              ${attr.values.length >= 4 ? "grid-cols-2 lg:grid-cols-3" : ""}
            `}
          >
            {attr.values.map((value) => {
              const isSelected = selected[attr.name] === value

              return (
                <button
                  key={value}
                  onClick={() =>
                    onChange(prev => ({
                      ...prev,
                      [attr.name]: value
                    }))
                  }
                  className={`
                    px-4 py-2 rounded-md text-sm border transition
                    ${isSelected
                      ? "border-red-500 bg-red-500/10 text-white"
                      : "border-neutral-700 text-neutral-300 hover:border-neutral-400"
                    }
                  `}
                >
                  {value}
                </button>
              )
            })}
          </div>

        </div>
      ))}

    </div>
  )
}