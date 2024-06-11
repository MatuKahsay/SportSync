import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs";

const CreateEvent = () => {
  const { sessionClaims } = auth();

  console.log('Session Claims:', sessionClaims);
  const userId = sessionClaims?.userID as string;
  console.log('User ID:', userId);

  return (
    <>
      <section className="bg-gradient-to-r from-cyan-500 to-blue-500 py-10 text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-bold">Create Event</h3>  {/* Increased font size */}
        </div>
      </section>

      <div className="container mx-auto my-8 px-4 md:px-0">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <EventForm userId={userId} type="Create" />
        </div>
      </div>
    </>
  );
}

export default CreateEvent;
