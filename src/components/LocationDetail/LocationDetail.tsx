import { css } from '@emotion/css';
import { Location } from '@game-trip/ts-api-client'

type Props = {
    locationDto?: Location;
}

export default function LocationDetail({ locationDto }: Props) {
    return (
        <>
            <div>{locationDto?.name}</div>
            <div className={styles.flex}>
                <img className={styles.image} src="https://i.ytimg.com/vi/xeHkYv04zbQ/maxresdefault.jpg" />
                <img className={styles.image} src="https://www.1jour1actu.com/wp-content/uploads/2021/10/VIDEO_histoire_tour_Eiffel.jpeg" />
            </div>
            <div>{locationDto?.games?.map((game) => {
                return (<div>
                    <div>{game.name}</div>
                </div>)
            })}</div>
        </>
    )
}

const styles = {
    flex: css`
        display: flex;
        flex-direction: row;
    `,
    image: css`
        width: 40%;
    `,
}