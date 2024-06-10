import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs";

const CreateEvent = () => {
  const { sessionClaims } = auth();

  // Log the entire sessionClaims object for debugging purposes
  console.log('Session Claims:', sessionClaims);

  // Note the correct key is `userID` (case-sensitive)
  const userId = sessionClaims?.userID as string;

  // Log the userId to ensure it's correctly retrieved
  console.log('User ID:', userId);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Create Event</h3>
      </section>

      <div className="wrapper my-8">
        <EventForm userId={userId} type="Create" />
      </div>
    </>
  );
}

export default CreateEvent;
