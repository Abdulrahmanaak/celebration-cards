import heroImg from './assets/hero.svg'
import './App.css'
import CardEditor from './components/CardEditor.jsx'
import CardViewer from './components/CardViewer.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'


function App() {
  const pathname = window.location.pathname
  if (pathname.startsWith('/editor')) {
    return <CardEditor />
  }
  if (window.location.pathname.startsWith('/view')) {
    return <CardViewer />
  }
  if (window.location.pathname.startsWith('/admin')) {
    return <AdminDashboard />
  }
  return (
    <div className="text-center mt-10">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Celebration Cards</h1>
      </header>
      <img src={heroImg} alt="Hero" className="mx-auto w-1/2 mb-8" />
      <a
        href="/editor"
        className="inline-block bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
      >
        Create Your Card
      </a>
    </div>
  )
}

export default App
