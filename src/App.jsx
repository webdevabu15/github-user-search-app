import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [user,setUser] = useState('webdevabu15')
  const [userData, setUserData] = useState({})
  const [error, setError] = useState()

   async function getUser() {
      try{
        if(!user.trim()) return
        setError("")
         const response = await fetch(`https://api.github.com/users/${user}`) 
         if(!response.ok){
          throw new Error("User not found")
         }
         const data = await response.json()
         setUserData(data)
      }
      catch(error){
        setError(error.message)
      }
    }

  

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-5">
      <div className="w-full max-w-md bg-[#161b22] border border-[#30363d] rounded-3xl p-6 shadow-2xl">
        <h1 className="text-white text-3xl font-bold text-center mb-6">
          GitHub User Search
        </h1>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Search github username..."
            className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-2xl px-4 py-3 text-white outline-none focus:border-blue-500"
            onChange={(e) => setUser(e.target.value)}
          />

          <button 
           onClick={() => getUser()}
           className="bg-blue-600 hover:bg-blue-700 transition px-5 rounded-2xl text-white font-semibold"
          >
            Search
          </button>
        </div>
        <div className="bg-[#0d1117] border border-[#30363d] rounded-3xl p-6">

          <div className="flex justify-center mb-5">
            <img
              src={userData.avatar_url}
              alt=""
              className="w-28 h-28 rounded-full border-4 border-blue-500"
            />
          </div>

          <div className="text-center">
            <h2 className="text-white text-2xl font-bold">
              {userData.name || error}
            </h2>

            <p className="text-blue-400 mb-3">
              Login: {userData.login}
            </p>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {userData.bio}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">

            <div className="bg-[#161b22] rounded-2xl p-4 text-center">
              <h3 className="text-white text-xl font-bold">
                {userData.public_repos}
              </h3>
              <p className="text-gray-400 text-sm">
                Repos
              </p>
            </div>

            <div className="bg-[#161b22] rounded-2xl p-4 text-center">
              <h3 className="text-white text-xl font-bold">
                {userData.followers}
              </h3>
              <p className="text-gray-400 text-sm">
                Followers
              </p>
            </div>

            <div className="bg-[#161b22] rounded-2xl p-4 text-center">
              <h3 className="text-white text-xl font-bold">
                {userData.following}
              </h3>
              <p className="text-gray-400 text-sm">
                Following
              </p>
            </div>

          </div>

          <a 
            href={userData.html_url} 
            target="_blank"
            className="w-full mt-6 bg-white text-black py-3 rounded-2xl font-semibold hover:scale-[1.02] transition block text-center"
          >
            View GitHub Profile
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
