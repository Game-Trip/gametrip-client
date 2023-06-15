import { css } from "@emotion/css"

export const StarSvg = () => {
    return (
        <>
            <svg className={styles.RatingStar} width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
                <g transform="translate(16,16)">
                    <circle className={styles.RatingStar_Ring} fill="none" stroke="#000" stroke-width="16" r="8" transform="scale(0)" />
                </g>
                <g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <g transform="translate(16,16) rotate(180)">
                        <polygon className={styles.RatingStar_Stoke} points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="none" />
                        <polygon className={styles.RatingStar_Fill} points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="#000" />
                    </g>
                    <g transform="translate(16,16)" stroke-dasharray="12 12" stroke-dashoffset="12">
                        <polyline className={styles.RatingStar_Line} transform="rotate(0)" points="0 4,0 16" />
                        <polyline className={styles.RatingStar_Line} transform="rotate(72)" points="0 4,0 16" />
                        <polyline className={styles.RatingStar_Line} transform="rotate(144)" points="0 4,0 16" />
                        <polyline className={styles.RatingStar_Line} transform="rotate(216)" points="0 4,0 16" />
                        <polyline className={styles.RatingStar_Line} transform="rotate(288)" points="0 4,0 16" />
                    </g>
                </g>
            </svg>
        </>
    )
}

const styles = {
    RatingStar: css`
    display: block;
    overflow: visible;
    pointer-events: none;
    width: 2em;
    height: 2em;
`,
    RatingStar_Ring: css`
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
    stroke: #f4a825;
`,
    RatingStar_Fill: css`
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
    stroke: #f4a825;
    fill: #f4a825;
    transform: scale(0);
    transition: fill 0.3s cubic-bezier(0.42, 0, 0.58, 1), transform 0.3s cubic-bezier(0.42, 0, 0.58, 1);
`,
    RatingStar_Line: css`
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
    stroke: #f4a825;
`,
    RatingStar_Stoke: css`
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
    stroke: #c7cad1;
    transition: stroke 0.3s;
`,

}