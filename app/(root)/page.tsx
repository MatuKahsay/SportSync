import CategoryFilter from '@/components/shared/CategoryFilter';
import Collection from '@/components/shared/Collection'
import Search from '@/components/shared/Search';
import { Button } from '@/components/ui/button'
import { getAllEvents } from '@/lib/actions/event.actions';
import { SearchParamProps } from '@/types';
import Image from 'next/image'
import Link from 'next/link'

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6
  })

  return (
    <>
      <section className="bg-gradient-to-r from-cyan-500 to-blue-500 py-10 md:py-14 text-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold shadow-lg">Unite, Play, Conquer at SportSync!</h1>
            <p className="text-lg font-light">Connect with UCR students for sports events, from pickup basketball to soccer matches. Your hub for organizing and enjoying sports together.</p>
            <Link href="#events" passHref>
              <Button className="bg-white text-blue-700 hover:bg-blue-700 hover:text-white py-4 px-8 rounded-full font-bold transition duration-300 ease-in-out shadow-lg">
                Explore Now
              </Button>
            </Link>
          </div>

          <Image 
            src="/assets/images/sport.jpg"
            alt="SportSync community in action"
            width={1000}
            height={1000}
            className="rounded-lg shadow-xl"
          />
        </div>
      </section>

      <section id="events" className="container mx-auto my-12 space-y-8">
        <h2 className="text-3xl font-bold text-gray-800">Join the Movement, Trusted by UCR Athletes</h2>
        
        <div className="flex flex-col md:flex-row gap-5 items-stretch">
          <Search />
          <CategoryFilter />
        </div>

        <Collection 
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Stay tuned for more events!"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  )
}
