import { useState } from "react";
import TourCard from '../components/TourCard'
const FILTERS = ["Tất cả", "Trong nước", "Quốc tế", "Nghỉ dưỡng", "Mạo hiểm", "Gia đình"]


const TOURS = [
  {
    id: 1,
    name: "Phú Quốc 3N2Đ — Thiên đường biển đảo",
    img: "/assets/phuquoc.jpg",
    badge: "Hot",
    badgeType: "hot",
    from: "Khởi hành HN",
    duration: "3N2Đ",
    stars: 5,
    reviews: "1.2k",
    priceOld: "5.200.000đ",
    price: "3.990.000đ",
    category: "Trong nước",
  },
  {
    id: 2,
    name: "Nhật Bản 6N5Đ — Tokyo · Osaka · Kyoto",
    img: "/assets/japan.jpg",
    badge: "-20%",
    badgeType: "sale",
    from: "Khởi hành HN",
    duration: "6N5Đ",
    stars: 5,
    reviews: "890",
    priceOld: "28.000.000đ",
    price: "22.500.000đ",
    category: "Quốc tế",
  },
  {
    id: 3,
    name: "Thái Lan 5N4Đ — Bangkok · Pattaya",
    img: "/assets/thailand.jpg",
    badge: "Mới",
    badgeType: "new",
    from: "Khởi hành HCM",
    duration: "5N4Đ",
    stars: 4,
    reviews: "650",
    priceOld: "12.000.000đ",
    price: "9.800.000đ",
    category: "Quốc tế",
  },
  {
    id: 4,
    name: "Đà Nẵng 4N3Đ — Hội An · Bà Nà Hills",
    img: "/assets/danang.jpg",
    badge: "Hot",
    badgeType: "hot",
    from: "Khởi hành HN",
    duration: "4N3Đ",
    stars: 5,
    reviews: "2.1k",
    priceOld: "6.500.000đ",
    price: "4.750.000đ",
    category: "Trong nước",
  },
]

function PopularTours() {
  const [activeFilter, setActiveFilter] = useState("Tất cả")

  const filtered = activeFilter === "Tất cả"
    ? TOURS
    : TOURS.filter((t) => t.category === activeFilter)

  return (
    <section className="popular-tours">

      <div className="popular-tours__header">
        <h2 className="popular-tours__title">Tour phổ biến nhiều người đi</h2>
        <a href="/tours" className="popular-tours__see-all">Xem tất cả ›</a>
      </div>

      <div className="popular-tours__filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-chip ${activeFilter === f ? "filter-chip--active" : ""}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="tour-grid">
        {filtered.length > 0
          ? filtered.map((tour) => <TourCard key={tour.id} tour={tour} />)
          : <p className="tour-grid__empty">Không có tour nào trong danh mục này.</p>
        }
      </div>

    </section>
  )
}

export default  PopularTours