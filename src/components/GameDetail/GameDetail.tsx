import { LocationDto } from '@game-trip/ts-api-client'
import React from 'react'

type Props = {
    locationDto?: LocationDto;
}

export default function GameDetail({ locationDto }: Props) {
    return (
        <div>{locationDto?.name}</div>
    )
}