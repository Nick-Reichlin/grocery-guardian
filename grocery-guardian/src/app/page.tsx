import { getServerSession } from "next-auth"
import { authOptions } from './api/auth/[...nextauth]/route'
import { LoginButton, LogoutButton} from './auth'
import Navbar from '@/components/navbar'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main>
        <Navbar />
        
    </main>
  );
}
