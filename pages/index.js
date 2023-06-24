import EventList from '@/components/allEvents/eventList/EventList'
import NewsletterRegistration from '@/components/inputData/newsletterRegistration/NewsletterRegistration';
import { getSelectedEvents } from '@/helpers/api-util'
import Head from 'next/head'

function Home(props) {
  return (
    <div>
      <Head>
        <title>NextJS chosen events</title>
        <meta name="description" content="Here, you can only find events that you have chosen yourself" />
      </Head>

      <NewsletterRegistration />

      <EventList events={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const selectedEvents = await getSelectedEvents()

  return {
    props: {
      events: selectedEvents
    },
    revalidate: 600
  }
}

export default Home;  
