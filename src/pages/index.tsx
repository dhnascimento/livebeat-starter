import { Link } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { getEvents } from '@/lib/events';
import { getPreviewImageById } from '@/lib/storage';
import { LiveBeatEvent } from '@/types/events';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Container from '@/components/Container';
import EventCard from '@/components/EventCard';

function Home() {
  const { session } = useAuth();
  const [events, setEvents] = useState<Array<LiveBeatEvent> | undefined >();

  useEffect(() => {
    (async function run () {
      const { events } = await getEvents();
      setEvents(events);
    })();

  }, []);

  return (
    <Layout>
      {Array.isArray(events) && events.length > 0 && (
        <>
          <Container className="flex justify-between items-center mb-10">
            <h1 className="text-lg font-bold uppercase text-slate-600 dark:text-slate-200">
              Upcoming Events
            </h1>
            {session && (
              <p>
                <Link href="/events/new">
                  <a className="inline-block rounded bg-slate-600 py-1.5 px-4 text-xs font-bold uppercase text-white hover:bg-slate-500 hover:text-white">
                    Add Event
                  </a>
                </Link>
              </p>
            )}
          </Container>
          
          <Container>
            <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => {
                return (
                  <Link key={event.$id} href={`/event/${event.$id}`}>
                    <a>
                      <EventCard
                        date={event.date}
                        image={{
                          alt: '',
                          height: event?.imageHeight ?? 0,
                          url: (event?.imageFileId && getPreviewImageById(event.imageFileId)) ?? '',
                          width: event?.imageWidth ?? 0
                        }}
                        location={event.location}
                        name={event.name}
                      />
                    </a>
                  </Link>
                )
              })}
            </div>
          </Container>
        </>
      )}
      {Array.isArray(events) && events.length === 0 && (
        <Container>
          <p className="w-100 text-center mb-5">
            No events currently scheduled.
          </p>
          <p className="w-100 text-center">
            <Link href="/events/new">
              <a>
                Add an Event
              </a>
            </Link>
          </p>
        </Container>
      )}
    </Layout>
  )
}

export default Home;
