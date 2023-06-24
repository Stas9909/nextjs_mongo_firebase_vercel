import EventList from "@/components/allEvents/eventList/EventList";
import ResultsTitle from "@/components/allEvents/resultsTitle/ResultsTitle";
import Button from "@/components/ui/Button";
import ErrorAlert from "@/components/ui/ErrorAlert";
import { getFilteredEvents } from "@/helpers/api-util";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSWR } from "swr";
import axios from 'axios';
import Head from "next/head";

const nestedEventsPage = (props) => {
  const headDataPattern = (
    <Head>
      <title>Filtered events by id</title>
      <meta name="description" content={`All events are displayed according to ${props.date.year}/${props.date.month}`} />
    </Head>
  )

  if (props.hasError) {
    return (
      <>
        {headDataPattern}
        <ErrorAlert>
          <p>You entered invalid parameter</p>
        </ErrorAlert>
        <div className="center">
          <Button link='/events'>
            Show all events
          </Button>
        </div>
      </>
    );
  }

  const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {headDataPattern}
        <ErrorAlert>
          <p>You entered invalid parameter</p>
        </ErrorAlert>
        <div className="center">
          <Button link='/events'>
            Show all events
          </Button>
        </div>
      </>
    );
  }

  const date = new Date(props.date.numYear, props.date.numMonth - 1);

  return (
    <>
      {headDataPattern}
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context
  const filterData = params.slug;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
    return {
      props: { hasError: true }//если валидация не пройдена
    };
  }

  const filteredEvents = await getFilteredEvents({ year: numYear, month: numMonth })

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth
      }
    }
  }
}

export default nestedEventsPage