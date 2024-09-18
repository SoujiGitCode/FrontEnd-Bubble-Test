import './App.css'
import { TagInput } from './components'
import Bubble from '@/assets/bubble.svg'
import Logo from '@/assets/logo.svg'

function App() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Company Logo */}
      <img
        src={Logo}
        alt="Bubble Logo"
        className="w-32 sm:w-32 max-w-full mb-8"
      />

      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#333]">Custom Input for Bubble</h1>
        <p className="text-lg text-gray-600 mt-2">This is a custom tag input component as part of the Bubble test</p>
      </header>

      {/* TagInput Container */}
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 z-10 relative">
        <TagInput />
      </div>

      {/* Animated Bubble*/}
      <img
        src={Bubble}
        alt="Animated Bubble"
        className="common_bubbleImg__Y_kaq"
      />
    </div>
  );
}

export default App;
