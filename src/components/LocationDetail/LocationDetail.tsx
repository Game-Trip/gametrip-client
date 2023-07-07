import { css } from '@emotion/css';
import { Location } from '@game-trip/ts-api-client'

type Props = {
    locationDto?: Location;
}

export default function LocationDetail({ locationDto }: Props) {
    console.log(locationDto);
    return (
        <>
            <div className={styles.flex}>
                {
                    (locationDto!.pictures!.length > 0) ?
                        (<img className={styles.image} src={
                            // @ts-ignore
                            "data:image/png;base64," + locationDto?.pictures![0].picture.fileContents ?? ""
                        } />)
                        :
                        (
                            <div className={styles.image} >No images available</div>
                        )
                }
                <img className={styles.image} src="https://www.1jour1actu.com/wp-content/uploads/2021/10/VIDEO_histoire_tour_Eiffel.jpeg" />
            </div>
            {/* show others images */}
            <div className={styles.imageList}>
                {
                    (locationDto!.pictures!.length > 1) && (
                        locationDto!.pictures!.map((picture) => (
                            <img className={styles.imageSmall} src={
                                // @ts-ignore
                                "data:image/png;base64," + picture.picture.fileContents ?? ""
                            } />
                        ))
                    )

                }
            </div>
            Related games
            <div className={styles.tagList}>
                {locationDto?.games?.map((game) => {
                    return (
                        <div className={styles.tag}>{game.name}</div>
                    )
                })}
            </div>
        </>
    )
}

const styles = {
    imageList: css`
        display: flex;
        flex-direction: row;
        gap: 10px;
        margin-bottom: 10px;
    `,
    flex: css`
        display: flex;
        flex-direction: row;
        /* center */
        justify-content: center;
        align-items: center;
        gap: 50px;
        margin-top: 50px;
        margin-bottom: 10px;
    `,
    image: css`
        width: 40%;
        height: 400px;
        /* center content */
        object-fit: cover;
        object-position: center;
        border-radius: 8px;
        /* center text insite */
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 40px;
    `,
    imageSmall: css`
        height: 100px;
    `,
    tagList: css`
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom:10px;
  `,
    tag: css`
    background: #85d8ac;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 5px;
    border-radius: 8px;
    `,
}