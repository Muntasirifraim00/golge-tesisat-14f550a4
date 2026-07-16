import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LanguageProvider";

const DISTRICTS: { name: string; pos: [number, number] }[] = [
  { name: "Kadıköy", pos: [40.9833, 29.0333] },
  { name: "Üsküdar", pos: [41.0226, 29.0150] },
  { name: "Şişli", pos: [41.0602, 28.9870] },
  { name: "Beşiktaş", pos: [41.0430, 29.0083] },
  { name: "Bakırköy", pos: [40.9819, 28.8772] },
  { name: "Maltepe", pos: [40.9350, 29.1300] },
  { name: "Ataşehir", pos: [40.9923, 29.1244] },
  { name: "Ümraniye", pos: [41.0166, 29.1244] },
  { name: "Kartal", pos: [40.8880, 29.1900] },
  { name: "Pendik", pos: [40.8775, 29.2580] },
  { name: "Beylikdüzü", pos: [41.0027, 28.6417] },
  { name: "Sarıyer", pos: [41.1669, 29.0566] },
  { name: "Beyoğlu", pos: [41.0369, 28.9778] },
  { name: "Fatih", pos: [41.0186, 28.9497] },
  { name: "Beykoz", pos: [41.1250, 29.1000] },
  { name: "Çekmeköy", pos: [41.0419, 29.1797] },
  { name: "Eyüpsultan", pos: [41.0478, 28.9344] },
  { name: "Zeytinburnu", pos: [41.0058, 28.9036] },
  { name: "Kağıthane", pos: [41.0850, 28.9714] },
  { name: "Esenler", pos: [41.0433, 28.8761] },
  { name: "Bayrampaşa", pos: [41.0353, 28.9061] },
  { name: "Güngören", pos: [41.0181, 28.8714] },
  { name: "Arnavutköy", pos: [41.1847, 28.7406] },
  { name: "Büyükçekmece", pos: [41.0203, 28.5750] },
  { name: "Çatalca", pos: [41.1436, 28.4614] },
  { name: "Silivri", pos: [41.0736, 28.2464] },
  { name: "Şile", pos: [41.1761, 29.6128] },
  { name: "Adalar", pos: [40.8736, 29.1233] },
];

type LeafletMods = {
  MapContainer: any;
  TileLayer: any;
  Marker: any;
  Popup: any;
  pinIcon: any;
};

export default function IstanbulServiceMap() {
  const { t } = useLang();
  const [mods, setMods] = useState<LeafletMods | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [L, rl] = await Promise.all([
        import("leaflet"),
        import("react-leaflet"),
        import("leaflet/dist/leaflet.css"),
      ]);
      if (cancelled) return;
      const Ldefault = (L as any).default ?? L;
      const pinIcon = Ldefault.divIcon({
        className: "",
        html: `<div style="
          width:18px;height:18px;border-radius:9999px;
          background:#dc2626;
          border:3px solid #fff;
          box-shadow:0 2px 8px rgba(0,0,0,.5);
        "></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });
      setMods({
        MapContainer: rl.MapContainer,
        TileLayer: rl.TileLayer,
        Marker: rl.Marker,
        Popup: rl.Popup,
        pinIcon,
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!mods) {
    return <div className="mt-3 h-56 rounded-xl bg-surface-2 animate-pulse" />;
  }

  const { MapContainer, TileLayer, Marker, Popup, pinIcon } = mods;

  return (
    <div className="mt-3 h-56 overflow-hidden rounded-xl border border-border">
      <MapContainer
        center={[41.04, 29.0]}
        zoom={10}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {DISTRICTS.map((d) => (
          <Marker key={d.name} position={d.pos} icon={pinIcon}>
            <Popup>
              <div style={{ fontWeight: 700 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: "#555" }}>{t.whyUs.map.popup}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
