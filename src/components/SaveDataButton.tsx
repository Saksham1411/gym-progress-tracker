
const SaveDataButton = () => {
    function getData(){
       const data = localStorage.getItem('gym-tracker')
       console.log(data)
    }
  return (
    <button onClick={getData} className=" m-auto border-black px-4 py-2 bg-black text-white">save existing data</button>
  )
}

export default SaveDataButton