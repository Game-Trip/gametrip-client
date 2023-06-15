import { StarSvg } from "./StarSvg"
import './style.css';
interface Props {
  onChange: (rate: number) => void;
}

export const StarLikeComponent = ({ onChange }: Props) => {


  const updateRating = (e: any) => {
    onChange(e.target.value);
  }

  return (
    <>
      <form className="rating" onChange={updateRating}>
        <div className="rating__stars">
          <input type="radio" id="rating-1" name="RateStart" value="1" className="rating__input rating__input-1" />
          <input type="radio" id="rating-2" name="RateStart" value="2" className="rating__input rating__input-2" />
          <input type="radio" id="rating-3" name="RateStart" value="3" className="rating__input rating__input-3" />
          <input type="radio" id="rating-4" name="RateStart" value="4" className="rating__input rating__input-4" />
          <input type="radio" id="rating-5" name="RateStart" value="5" className="rating__input rating__input-5" />
          <label className="rating__label" htmlFor="rating-1">
            <StarSvg />
            <span className="rating__sr">1 Star it's Terrible</span>
          </label>
          <label className="rating__label" htmlFor="rating-2">
            <StarSvg />
            <span className="rating__sr">2 Star it's Bad</span>
          </label>
          <label className="rating__label" htmlFor="rating-3">
            <StarSvg />
            <span className="rating__sr">3 Star it's Ok</span>
          </label>
          <label className="rating__label" htmlFor="rating-4">
            <StarSvg />
            <span className="rating__sr">4 Star it's Good</span>
          </label>
          <label className="rating__label" htmlFor="rating-5">
            <StarSvg />
            <span className="rating__sr">5 Star it's Excellent</span>
          </label>
          <p className="rating__display" data-rating="1" hidden>Terrible</p>
          <p className="rating__display" data-rating="2" hidden>Bad</p>
          <p className="rating__display" data-rating="3" hidden>OK</p>
          <p className="rating__display" data-rating="4" hidden>Good</p>
          <p className="rating__display" data-rating="5" hidden>Excellent</p>
        </div>
      </form>
    </>
  );
};
