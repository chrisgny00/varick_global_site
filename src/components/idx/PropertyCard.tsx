import Link from "next/link";
import { Bed, Bath, Square, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatPrice, formatSqft } from "@/lib/format";
import type { Property } from "@/types";

export function PropertyCard({ property }: { property: Property }) {
  const isCommercial = property.transactionType === "commercial";
  return (
    <Link
      href={`/properties/${property.id}`}
      className="group block bg-vg-card border rounded-[4px] overflow-hidden transition-colors hover:border-vg-vivid/60"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div
        className="relative aspect-[4/3] overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #3a2e47 0%, #2f243a 50%, #3a2e47 100%)`,
        }}
      >
        <div className="diagonal-lines absolute inset-0 opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="font-display text-[64px] font-light text-white/[0.04] tracking-[8px]">
            VG
          </div>
        </div>
        {property.badge && (
          <div className="absolute top-4 left-4">
            <Badge variant={property.status === "Coming Soon" ? "gold" : "crimson"}>
              {property.badge}
            </Badge>
          </div>
        )}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <span className="font-accent text-[10px] font-bold uppercase tracking-[2px] text-white/70">
            {property.propertyType}
          </span>
          <span className="font-accent text-[10px] font-bold uppercase tracking-[2px] text-white/70">
            #{property.id.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="p-7">
        <div className="font-display text-2xl text-vg-vivid font-light">
          {formatPrice(property.price, property.transactionType)}
        </div>
        <h3 className="mt-2 display-h3 text-white">{property.title}</h3>

        <p className="mt-3 inline-flex items-center gap-2 text-[13px] text-vg-pewter">
          <MapPin className="h-3.5 w-3.5 text-vg-vivid" />
          {property.city}, {property.county}
        </p>

        {!isCommercial || property.beds > 0 ? (
          <div
            className="mt-5 pt-5 border-t flex items-center gap-5 text-[12px] text-vg-pewter"
            style={{ borderTopColor: "rgba(255,255,255,0.08)" }}
          >
            {property.beds > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <Bed className="h-3.5 w-3.5" /> {property.beds} bd
              </span>
            )}
            {property.baths > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <Bath className="h-3.5 w-3.5" /> {property.baths} ba
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Square className="h-3.5 w-3.5" /> {formatSqft(property.sqft)} sqft
            </span>
          </div>
        ) : (
          <div
            className="mt-5 pt-5 border-t text-[12px] text-vg-pewter"
            style={{ borderTopColor: "rgba(255,255,255,0.08)" }}
          >
            <span className="inline-flex items-center gap-1.5">
              <Square className="h-3.5 w-3.5" /> {formatSqft(property.sqft)} sqft
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
