import { getServerSession } from "next-auth"
import { authOptions } from './api/auth/[...nextauth]/route'
import Navbar from '@/components/navbar'


export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      <Navbar />
      <div
        className="h-screen w-screen flex bg-no-repeat bg-cover bg-center items-center justify-center bg-green-500"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-photo/top-view-trash-cooking-concept_23-2149056477.jpg?t=st=1710772901~exp=1710776501~hmac=7d59725153df25ec8636e190eeb9508268eafd4bf64e2bddb731d624eb8ec147&w=1060')`
        }}      >
        <div className="max-w-4xl mx-auto p-6 bg-white bg-opacity-75 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-center text-green-500">
            Welcome {session?.user?.name}, to GroceryGuardian
          </h1>
          <p className="text-lg text-center mt-4 text-green-800">
            Your solution for managing grocery inventory and reducing food waste. <br /><br />

            GroceryGuardian's mission is to empower individuals to make more sustainable and mindful choices about their groceries, ultimately reducing food waste. We believe that by providing tools to easily manage grocery inventory, track expiration dates, and plan shopping lists efficiently, we can make a significant impact on reducing the amount of food that goes to waste. Our goal is to create a community of conscious consumers who are actively contributing to a more sustainable future for our planet.
          </p>
        </div>
      </div>
    </main>
  );
}
