import CheckoutButton from '@/components/shared/CheckoutButton';
import Collection from '@/components/shared/Collection';
import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.actions';
import { formatDateTime } from '@/lib/utils';
import { SearchParamProps } from '@/types';
import Image from 'next/image';

const EventDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
  const event = await getEventById(id);
  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  })

  return (
    <>
      <section className="flex justify-center bg-gradient-to-r from-cyan-600 to-blue-800 p-5 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl gap-8 p-5 rounded-xl bg-white border border-gray-200">
          <Image 
            src={event.imageUrl}
            alt="hero image"
            width={1000}
            height={1000}
            className="rounded-lg object-cover object-center shadow-md"
          />

          <div className="flex flex-col gap-6">
            <h2 className='text-4xl font-bold text-gray-900'>{event.title}</h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex gap-2">
                <p className="text-xl font-semibold rounded-full bg-green-200 px-6 py-3 text-green-800 shadow-sm hover:bg-green-300 transition duration-300">
                  {event.isFree ? 'FREE' : `$${event.price}`}
                </p>
                <p className="text-base font-medium rounded-full bg-gray-300 px-4 py-2 text-gray-700 shadow-sm">
                  {event.category.name}
                </p>
              </div>
              <p className="text-base font-medium text-gray-700">
                by <span className="text-blue-700">{event.organizer.firstName} {event.organizer.lastName}</span>
              </p>
            </div>
            <CheckoutButton event={event} />
            <div className="flex flex-col gap-3">
              <div className='flex items-center gap-2'>
                <Image src="/assets/icons/calendar.svg" alt="calendar" width={24} height={24} />
                <p className="text-base font-medium">
                  {formatDateTime(event.startDateTime).dateOnly} - {formatDateTime(event.startDateTime).timeOnly} to
                  {formatDateTime(event.endDateTime).dateOnly} - {formatDateTime(event.endDateTime).timeOnly}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/assets/icons/location.svg" alt="location" width={24} height={24} />
                <p className="text-base font-medium">{event.location}</p>
              </div>
            </div>
            <div className="text-gray-800">
              <p className="text-lg font-semibold">What You'll Learn:</p>
              <p className="text-base font-medium">{event.description}</p>
              <a href={event.url} className="text-blue-700 underline truncate hover:text-blue-800 transition duration-300">More Info</a>
            </div>
          </div>
        </div>
      </section>

      <section className="my-8 px-5 md:px-10">
        <h2 className="text-3xl font-bold text-gray-900">Related Events</h2>
        <Collection 
            data={relatedEvents?.data}
            emptyTitle="No Events Found"
            emptyStateSubtext="Come back later"
            collectionType="All_Events"
            limit={3}
            page={searchParams.page as string}
            totalPages={relatedEvents?.totalPages}
        />
      </section>
    </>
  )
}

export default EventDetails
