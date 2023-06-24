import EventContent from "@/components/eventDetail/eventContent/EventContent";
import EventLogistics from "@/components/eventDetail/eventLogistics/EventLogistics";
import EventSummary from "@/components/eventDetail/eventSummary/EventSummary";
import Comments from "@/components/inputData/comments/Comments";
import { getEventById, getSelectedEvents, getAllEvents } from "@/helpers/api-util";
import Head from "next/head";

const EveryEventPage = (props) => {
  const event = props.selectedEventById;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content="Here, you can only find events all listed events" />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id}/>
    </>
  )
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      selectedEventById: event
    },
    revalidate: 30
  }
}

export async function getStaticPaths() {
  const allEvents = await getSelectedEvents();
  const paths = allEvents.map(event => ({ params: { eventId: event.id } }))

  return {
    paths: paths,
    // fallback: false
    fallback: true
  }
}

export default EveryEventPage