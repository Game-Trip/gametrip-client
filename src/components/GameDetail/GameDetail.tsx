import { Location } from '@game-trip/ts-api-client'
import React from 'react'

type Props = {
    locationDto?: Location;
}

export default function GameDetail({ locationDto }: Props) {
    return (
        <>
            <div>{locationDto?.name}</div>
            <div>{locationDto?.games?.map((game) => {
                return (<div>
                    <div>{game.name}</div>
                </div>)
            })}</div>
        </>
    )
}