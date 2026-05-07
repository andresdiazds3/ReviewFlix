import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  value?: number;
  max?: number;
  onChange?: (val: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}

export function StarRating({ value = 0, max = 5, onChange, readonly = false, size = "md" }: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const sizes = { sm: 14, md: 18, lg: 24 };
  const px = sizes[size];

  const display = hovered ?? value;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => {
        const full = i + 1 <= display;
        const half = !full && i + 0.5 <= display;
        return (
          <span
            key={i}
            style={{ width: px, height: px, cursor: readonly ? "default" : "pointer" }}
            className="relative inline-flex items-center"
            onMouseEnter={() => !readonly && setHovered(i + 1)}
            onMouseLeave={() => !readonly && setHovered(null)}
            onClick={() => !readonly && onChange?.(i + 1)}
          >
            <Star
              size={px}
              className={full || half ? "text-[#e50914]" : "text-[#333]"}
              fill={full ? "#e50914" : "transparent"}
              strokeWidth={1.5}
            />
          </span>
        );
      })}
    </div>
  );
}
