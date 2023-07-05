import { Location, LocationDto } from '@game-trip/ts-api-client'
import React from 'react'
import { LocationDto } from '../../utils/Models/Location/LocationDto';

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