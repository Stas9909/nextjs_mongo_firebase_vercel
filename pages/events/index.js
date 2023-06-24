import EventList from "@/components/allEvents/eventList/EventList"
import FilteredEvents from "@/components/allEvents/filteredEvents/FilteredEvents"
import { getAllEvents } from "@/helpers/api-util"
import Head from "next/head"
import { useRouter } from "next/router"

const allEventsPage = (props) => {
    const router = useRouter()
    // const eventsObj = getAllEvents()
    const { eventsObj } = props

    const filterEventsHandler = (year, month) => {
        const fullPath = `/events/${year}/${month}`
        router.push(fullPath)
    }

    return (
        <>
            <Head>
                <title>All available events</title>
                <meta name="description" content="Here, you can only find events all listed events" />
            </Head>
            <FilteredEvents onFilter={filterEventsHandler} />
            <EventList events={eventsObj} />
        </>
    )
}

export async function getStaticProps() {
    const allEvents = await getAllEvents()

    return {
        props: {
            eventsObj: allEvents
        },
        revalidate: 60
    }
}

export default allEventsPage