import { EventContainer } from './styles'
import './styles.css'

export function EventTypeDisplay(barbie) {
    return (
        <EventContainer colorText="#ccc">
            <img src={barbie.photo} />
            <p>{barbie.name}</p>
        </EventContainer>
)
}