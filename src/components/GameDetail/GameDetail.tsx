import React from 'react'
import { LocationDto } from '../../utils/Models/Location/LocationDto';

type Props = {
  locationDto?: LocationDto;
}

export default function GameDetail({ locationDto }: Props) {
  return (
    <div>{locationDto?.name}</div>
  )
}