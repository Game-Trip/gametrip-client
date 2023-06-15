import { css } from "@emotion/css";
import { StarSvg } from "./StarSvg";


export const StarLikeComponent = () => {


    return (
        <>
            <div className={styles.starRating}>
                <input type="radio" id="Rate1" name="RateStart" value="1" />
                <input type="radio" id="Rate2" name="RateStart" value="2" />
                <input type="radio" id="Rate3" name="RateStart" value="3" />
                <input type="radio" id="Rate4" name="RateStart" value="4" />
                <input type="radio" id="Rate5" name="RateStart" value="5" />
                <label className="RatingLabel" htmlFor="Rate1">
                    <StarSvg />
                    <span className="RatingLabelText">1 Star it's Terrible</span>
                </label>
                <label className="RatingLabel" htmlFor="Rate2">
                    <StarSvg />
                    <span className="RatingLabelText">2 Star it's Bad</span>
                </label>
                <label className="RatingLabel" htmlFor="Rate3">
                    <StarSvg />
                    <span className="RatingLabelText">3 Star it's Ok</span>
                </label>
                <label className="RatingLabel" htmlFor="Rate4">
                    <StarSvg />
                    <span className="RatingLabelText">4 Star it's Good</span>
                </label>
                <label className="RatingLabel" htmlFor="Rate5">
                    <StarSvg />
                    <span className="RatingLabelText">5 Star it's Excellent</span>
                </label>
                <p className="RatingText" data-rating="1" hidden>Terrible</p>
                <p className="RatingText" data-rating="2" hidden>Bad</p>
                <p className="RatingText" data-rating="3" hidden>OK</p>
                <p className="RatingText" data-rating="4" hidden>Good</p>
                <p className="RatingText" data-rating="5" hidden>Excellent</p>
            </div>
        </>
    );
};

const styles = {
    starRating: css`
    display: flex;
  padding-bottom: 0.375em;
  position: relative;
  margin: auto;
  `,
};
