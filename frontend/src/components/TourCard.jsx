import { AiFillStar, AiOutlineStar } from "react-icons/ai"


function TourCard({ tour }) {
  return (
    <div className="tour-card">
      <div className="tour-card__img-wrap">
        <img src={tour.img} alt={tour.name} className="tour-card__img" />
        <span className={`tour-card__badge tour-card__badge--${tour.badgeType}`}>
          {tour.badge}
        </span>
      </div>

      <div className="tour-card__body">
        <p className="tour-card__name">{tour.name}</p>

        <div className="tour-card__meta">
          <span>{tour.from}</span>
          <span className="tour-card__dot" />
          <span>{tour.duration}</span>
        </div>

        <div className="tour-card__stars">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} >
              {i < tour.stars
                ? <AiFillStar className="star--on" />    // sao đầy — vàng
                : <AiOutlineStar className="star--off" /> // sao rỗng — xám
              }
            </span>
          ))}
          <span className="tour-card__reviews">({tour.reviews} đánh giá)</span>
        </div>

        <div className="tour-card__footer">
          <div>
            <p className="tour-card__price-old">{tour.priceOld}</p>
            <p className="tour-card__price">{tour.price}</p>
          </div>
          <span className="tour-card__duration">{tour.duration}</span>
        </div>
      </div>
    </div>
  )
}
export default  TourCard
