
import Collection from '@/components/shared/Collection';
import { Button } from '@/components/ui/button';
import { getEventsByUser } from '@/lib/actions/event.actions';
import { getOrdersByUser } from '@/lib/actions/order.actions';
import { IOrder } from '@/lib/database/models/order.model';
import { SearchParamProps } from '@/types';
import { auth } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage });
  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
  const organizedEvents = await getEventsByUser({ userId, page: eventsPage });

  return (
    <>
      {/* My Tickets Section with Vibrant Cyan-Blue Gradient Background */}
      <section className="bg-gradient-to-r from-cyan-600 to-blue-800 py-12 shadow-md">
        <div className="container mx-auto px-6">
          <h2 className='text-3xl font-bold text-white mb-8'>My Tickets</h2>
          <Collection 
            data={orderedEvents}
            emptyTitle="No tickets purchased yet"
            emptyStateSubtext="Discover new opportunities and events to attend!"
            collectionType="My_Tickets"
            limit={3}
            page={ordersPage}
            urlParamName="ordersPage"
            totalPages={orders?.totalPages}
          />
          <Link href="/#events" passHref>
            <Button className="mt-6 bg-blue-900 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition duration-300">
              Explore More Events
            </Button>
          </Link>
        </div>
      </section>

      {/* Events Organized Section with Vibrant Cyan-Blue Gradient Background */}
      <section className="bg-gradient-to-r from-cyan-600 to-blue-800 py-12 shadow-md">
        <div className="container mx-auto px-6">
          <h2 className='text-3xl font-bold text-white mb-8'>Events Organized</h2>
          <Collection 
            data={organizedEvents?.data}
            emptyTitle="No events created yet"
            emptyStateSubtext="Start organizing your first event today!"
            collectionType="Events_Organized"
            limit={3}
            page={eventsPage}
            urlParamName="eventsPage"
            totalPages={organizedEvents?.totalPages}
          />
          <Link href="/events/create" passHref>
          <Button className="mt-6 bg-blue-800 hover:bg-blue-900 text-white py-3 px-6 rounded-lg font-semibold transition duration-300">
              Create New Event
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}

export default ProfilePage;
