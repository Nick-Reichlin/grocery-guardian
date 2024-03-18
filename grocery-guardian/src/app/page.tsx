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

            
GroceryGuardian's mission is inspired by the alarming facts surrounding food waste. Did you know that roughly one-third of the food produced in the world for human consumption every year—approximately 1.3 billion tons—gets lost or wasted? This not only impacts food security and the economy but also contributes significantly to environmental degradation. <br/><br/>
According to the Food and Agriculture Organization of the United Nations (FAO), food waste is a major contributor to greenhouse gas emissions, with wasted food generating about 8% of global greenhouse gas emissions. Additionally, wasted food occupies about 1.4 billion hectares of land—28% of the world's agricultural area.<br/><br/>
At GroceryGuardian, we aim to address these issues by helping individuals manage their groceries more efficiently, reduce waste, and contribute to a more sustainable future. <span className="text-green-600">Join us in our mission to make a positive impact on our planet—one grocery list at a time.</span>
          </p>
        </div>
      </div>
    </main>
  );
}
